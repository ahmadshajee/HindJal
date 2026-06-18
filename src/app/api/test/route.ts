import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDatabase();
    const collections = await db.listCollections().toArray();
    
    // Count products
    const productsCount = await db.collection("products").countDocuments({});
    
    return NextResponse.json({
      ok: true,
      hasUri: !!process.env.MONGODB_URI,
      collections: collections.map((c) => c.name),
      productsCount
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({
      ok: false,
      hasUri: !!process.env.MONGODB_URI,
      error: err.message,
      stack: err.stack
    }, { status: 500 });
  }
}
