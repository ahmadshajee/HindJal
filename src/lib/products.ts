import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

export type ProductAccent = "blue" | "earth" | "mist";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  tags: string[];
  accent: ProductAccent;
  badge?: string;
  featured?: boolean;
  quoteOnly?: boolean;
  ctaLabel?: string;
  imageUrl?: string;
  sortOrder?: number;
  isActive?: boolean;
};

const PRODUCT_COLLECTION = "products";

function isProductAccent(value: unknown): value is ProductAccent {
  return value === "blue" || value === "earth" || value === "mist";
}

function normalizeString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function normalizeBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeNumber(value: unknown, fallback = 0) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeTags(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
    .filter(Boolean)
    .slice(0, 12);
}

function toPublicProduct(doc: Record<string, unknown>): Product {
  const idValue = doc._id;
  const generatedId = `fallback-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const id = idValue instanceof ObjectId ? idValue.toString() : normalizeString(idValue, generatedId);
  const name = normalizeString(doc.name, "Untitled product");

  const tags = normalizeTags(doc.tags);
  const accent = isProductAccent(doc.accent) ? doc.accent : "blue";
  const price = Math.max(0, normalizeNumber(doc.price, 0));

  return {
    id,
    slug: normalizeString(doc.slug, slugify(name) || `product-${id.slice(0, 6)}`),
    name,
    category: normalizeString(doc.category, "General"),
    description: normalizeString(doc.description, ""),
    price,
    unit: normalizeString(doc.unit, "per item"),
    tags: tags.length ? tags : ["Hydration"],
    accent,
    badge: normalizeString(doc.badge),
    featured: normalizeBoolean(doc.featured),
    quoteOnly: normalizeBoolean(doc.quoteOnly),
    ctaLabel: normalizeString(doc.ctaLabel),
    imageUrl: normalizeString(doc.imageUrl),
    sortOrder: normalizeNumber(doc.sortOrder, 0),
    isActive: typeof doc.isActive === "boolean" ? doc.isActive : true,
  };
}

/**
 * Fetches all active products directly from MongoDB.
 * The CMS is the single source of truth — no seeding or hardcoded fallback.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const db = await getDatabase();
    const collection = db.collection(PRODUCT_COLLECTION);

    const docs = await collection
      .find({ isActive: { $ne: false } })
      .sort({ sortOrder: 1, createdAt: 1 })
      .toArray();

    return docs.map((doc) => toPublicProduct(doc as Record<string, unknown>));
  } catch (error) {
    console.error("Failed to load products from MongoDB", error);
    return [];
  }
}
