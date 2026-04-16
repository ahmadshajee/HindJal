import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";

type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

type OrderBody = {
  customerName?: string;
  mobileNumber?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  items?: OrderItem[];
  totalAmount?: number;
  paymentMethod?: string;
  serviceType?: string;
  notes?: string;
  status?: string;
};

function createOrderId() {
  return `HJ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeOrderItem(item: Partial<OrderItem> | undefined) {
  if (!item || !isNonEmptyString(item.productId) || !isNonEmptyString(item.name)) {
    return null;
  }

  const quantity = Number(item.quantity);
  const price = Number(item.price);

  if (!Number.isFinite(quantity) || quantity < 1 || !Number.isFinite(price) || price < 0) {
    return null;
  }

  return {
    productId: item.productId.trim(),
    name: item.name.trim(),
    quantity,
    price,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderBody;

    const customerName = body.customerName?.trim() ?? "";
    const mobileNumber = body.mobileNumber?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const address = body.address ?? {};
    const street = address.street?.trim() ?? "";
    const city = address.city?.trim() ?? "";
    const state = address.state?.trim() ?? "";
    const pincode = address.pincode?.trim() ?? "";

    if (!customerName || !mobileNumber || !email || !street || !city || !state || !pincode) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    const items = (body.items ?? []).map((item) => normalizeOrderItem(item)).filter(Boolean) as OrderItem[];

    if (!items.length) {
      return NextResponse.json({ error: "At least one order item is required." }, { status: 400 });
    }

    const totalAmount = Number(body.totalAmount);

    if (!Number.isFinite(totalAmount) || totalAmount < 0) {
      return NextResponse.json({ error: "The total amount must be a valid number." }, { status: 400 });
    }

    const order = {
      orderId: createOrderId(),
      customerName,
      mobileNumber,
      email,
      address: {
        street,
        city,
        state,
        pincode,
      },
      items,
      totalAmount,
      paymentMethod: body.paymentMethod ?? "upi",
      serviceType: body.serviceType ?? "retail",
      notes: body.notes?.trim() ?? "",
      status: body.status ?? "Pending",
      createdAt: new Date(),
    };

    const db = await getDatabase();
    await db.collection("orders").insertOne(order);

    return NextResponse.json(
      {
        ok: true,
        orderId: order.orderId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Order submission failed", error);
    return NextResponse.json({ error: "Unable to save the order right now." }, { status: 500 });
  }
}