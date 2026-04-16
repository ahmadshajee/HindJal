"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { formatRupees, products } from "@/lib/site";

type OrderFormProps = {
  initialProductSlug?: string;
};

type OrderStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; orderId: string; message: string }
  | { type: "error"; message: string };

type PaymentMethod = "upi" | "card" | "cod";
type ServiceType = "retail" | "bulk" | "corporate";

type FormState = {
  customerName: string;
  mobileNumber: string;
  email: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
  quantity: number;
  paymentMethod: PaymentMethod;
  serviceType: ServiceType;
};

const initialState: FormState = {
  customerName: "",
  mobileNumber: "",
  email: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
  quantity: 1,
  paymentMethod: "upi",
  serviceType: "retail",
};

const serviceOptions: Array<{
  value: ServiceType;
  title: string;
  copy: string;
}> = [
  {
    value: "retail",
    title: "Retail order",
    copy: "For home delivery or quick replenishment.",
  },
  {
    value: "bulk",
    title: "Bulk or event",
    copy: "For meetings, weddings, and public gatherings.",
  },
  {
    value: "corporate",
    title: "Corporate supply",
    copy: "For recurring workplace or institutional demand.",
  },
];

const paymentOptions: Array<{
  value: PaymentMethod;
  title: string;
  copy: string;
}> = [
  {
    value: "upi",
    title: "UPI",
    copy: "Fast for mobile-first customers.",
  },
  {
    value: "card",
    title: "Card",
    copy: "Best for prepaid confirmations.",
  },
  {
    value: "cod",
    title: "Cash on delivery",
    copy: "Helpful for direct doorstep handoff.",
  },
];

export function OrderForm({ initialProductSlug }: OrderFormProps) {
  const defaultProductSlug = products.find((product) => product.slug === initialProductSlug)?.slug ?? products[0].slug;
  const [selectedProductSlug, setSelectedProductSlug] = useState(defaultProductSlug);
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<OrderStatus>({ type: "idle" });

  useEffect(() => {
    setSelectedProductSlug(defaultProductSlug);
  }, [defaultProductSlug]);

  const selectedProduct = products.find((product) => product.slug === selectedProductSlug) ?? products[0];
  const totalAmount = selectedProduct.quoteOnly ? 0 : selectedProduct.price * formState.quantity;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "loading" });

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formState.customerName,
          mobileNumber: formState.mobileNumber,
          email: formState.email,
          address: {
            street: formState.street,
            city: formState.city,
            state: formState.state,
            pincode: formState.pincode,
          },
          items: [
            {
              productId: selectedProduct.slug,
              name: selectedProduct.name,
              quantity: formState.quantity,
              price: selectedProduct.price,
            },
          ],
          totalAmount,
          paymentMethod: formState.paymentMethod,
          serviceType: formState.serviceType,
          notes: formState.notes,
          status: "Pending",
        }),
      });

      const data = (await response.json()) as { orderId?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "We could not save the request right now.");
      }

      setStatus({
        type: "success",
        orderId: data.orderId ?? "Pending",
        message: "Your request has been saved and is ready for follow-up.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "An unexpected error occurred.",
      });
    }
  }

  return (
    <div className="site-container order-layout fade-up">
      <form className="order-panel" onSubmit={handleSubmit}>
        <div className="catalog-head">
          <span className="eyebrow">Secure checkout</span>
          <h2>One calm form for direct orders and special requests.</h2>
          <p className="order-panel__copy">
            Every submission is saved to MongoDB so your order request stays structured, traceable, and easy to
            follow up.
          </p>
        </div>

        <div className="status-actions">
          <span className="status-chip">MongoDB order intake</span>
          <span className="status-chip">Founder-led trust</span>
          <span className="status-chip">Mobile friendly</span>
        </div>

        <div className="field">
          <label htmlFor="serviceType">Request type</label>
          <div className="radio-grid">
            {serviceOptions.map((option) => (
              <label className="radio-card" key={option.value}>
                <input
                  checked={formState.serviceType === option.value}
                  name="serviceType"
                  onChange={() => updateField("serviceType", option.value)}
                  type="radio"
                  value={option.value}
                />
                <strong>{option.title}</strong>
                <span>{option.copy}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="product">Select product</label>
          <select id="product" value={selectedProductSlug} onChange={(event) => setSelectedProductSlug(event.target.value)}>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              min={1}
              onChange={(event) => updateField("quantity", Number(event.target.value) || 1)}
              type="number"
              value={formState.quantity}
            />
          </div>
          <div className="field">
            <label htmlFor="paymentMethod">Payment method</label>
            <select
              id="paymentMethod"
              value={formState.paymentMethod}
              onChange={(event) => updateField("paymentMethod", event.target.value as PaymentMethod)}
            >
              {paymentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="customerName">Full name</label>
            <input
              id="customerName"
              onChange={(event) => updateField("customerName", event.target.value)}
              placeholder="Your full name"
              type="text"
              value={formState.customerName}
            />
          </div>
          <div className="field">
            <label htmlFor="mobileNumber">Mobile number</label>
            <input
              id="mobileNumber"
              onChange={(event) => updateField("mobileNumber", event.target.value)}
              placeholder="+91 98765 43210"
              type="tel"
              value={formState.mobileNumber}
            />
          </div>
          <div className="field" data-span="2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="hello@company.com"
              type="email"
              value={formState.email}
            />
          </div>
          <div className="field" data-span="2">
            <label htmlFor="street">Street address</label>
            <input
              id="street"
              onChange={(event) => updateField("street", event.target.value)}
              placeholder="House number, street, landmark"
              type="text"
              value={formState.street}
            />
          </div>
          <div className="field">
            <label htmlFor="city">City</label>
            <input
              id="city"
              onChange={(event) => updateField("city", event.target.value)}
              placeholder="City"
              type="text"
              value={formState.city}
            />
          </div>
          <div className="field">
            <label htmlFor="state">State</label>
            <input
              id="state"
              onChange={(event) => updateField("state", event.target.value)}
              placeholder="State"
              type="text"
              value={formState.state}
            />
          </div>
          <div className="field">
            <label htmlFor="pincode">Pincode</label>
            <input
              id="pincode"
              onChange={(event) => updateField("pincode", event.target.value)}
              placeholder="400001"
              type="text"
              value={formState.pincode}
            />
          </div>
          <div className="field" data-span="2">
            <label htmlFor="notes">Delivery notes</label>
            <textarea
              id="notes"
              onChange={(event) => updateField("notes", event.target.value)}
              placeholder="Landmark, delivery instructions, event details, or any special request."
              value={formState.notes}
            />
          </div>
        </div>

        {status.type !== "idle" ? (
          <div className={`status-banner status-banner--${status.type === "success" ? "success" : status.type === "error" ? "error" : ""}`}>
            {status.type === "loading" ? <strong>Saving your request...</strong> : null}
            {status.type === "success" ? (
              <>
                <strong>Order submitted</strong>
                <p>
                  {status.message} Your order ID is {status.orderId}.
                </p>
              </>
            ) : null}
            {status.type === "error" ? (
              <>
                <strong>Could not save request</strong>
                <p>{status.message}</p>
              </>
            ) : null}
          </div>
        ) : null}

        <button className="primary-button" type="submit">
          {status.type === "loading" ? "Saving to MongoDB..." : selectedProduct.quoteOnly ? "Request custom quote" : "Place secure order"}
        </button>
      </form>

      <aside className="summary-panel">
        <span className="eyebrow">Order summary</span>
        <h3>{selectedProduct.name}</h3>
        <p className="summary-card__lead">{selectedProduct.description}</p>

        <div className="summary-stack">
          <div className="summary-row">
            <span>Product price</span>
            <span>{selectedProduct.quoteOnly ? "Custom quote" : formatRupees(selectedProduct.price)}</span>
          </div>
          <div className="summary-row">
            <span>Quantity</span>
            <span>{formState.quantity}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Estimated total</span>
            <span>{selectedProduct.quoteOnly ? "Will be quoted" : formatRupees(totalAmount)}</span>
          </div>
          <div className="summary-row">
            <span>Payment</span>
            <span>{paymentOptions.find((option) => option.value === formState.paymentMethod)?.title}</span>
          </div>
          <div className="summary-row">
            <span>Request type</span>
            <span>{serviceOptions.find((option) => option.value === formState.serviceType)?.title}</span>
          </div>
        </div>

        <div className="glass-panel">
          <p className="summary-card__lead">
            Every request is stored in the orders collection so the business can grow with traceable, organized
            follow-up.
          </p>
        </div>

        <div className="mini-stats">
          <span>Founder-led trust</span>
          <span>Mobile first</span>
          <span>Glass UI</span>
        </div>

        <Link className="secondary-button" href="/products">
          Back to catalog
        </Link>
      </aside>
    </div>
  );
}