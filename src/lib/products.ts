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

type ProductRecord = Omit<Product, "id"> & {
  createdAt: Date;
  updatedAt: Date;
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

export const defaultProductSeed: ProductRecord[] = [
  {
    slug: "relief-pouch",
    name: "Hind Jal Relief Pouch",
    category: "Everyday relief",
    description: "The entry point to the brand. A fast, affordable pouch for immediate hydration when the moment matters most.",
    price: 5,
    unit: "per pouch",
    tags: ["250 ml", "Pocket-friendly", "Retail-ready"],
    accent: "blue",
    badge: "Best value",
    featured: true,
    quoteOnly: false,
    ctaLabel: "Order pouch",
    imageUrl:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80",
    sortOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: "family-bottle",
    name: "Hind Jal Family Bottle",
    category: "Home use",
    description: "A calm, premium bottle for homes and small teams that want consistent hydration without the heavy feel.",
    price: 18,
    unit: "per bottle",
    tags: ["500 ml", "Easy grip", "Daily use"],
    accent: "mist",
    badge: "",
    featured: false,
    quoteOnly: false,
    ctaLabel: "Add to order",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    sortOrder: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: "premium-bottle",
    name: "Hind Jal Premium Bottle",
    category: "On the move",
    description: "A taller bottle built to feel polished on desks, in travel bags, and across client-facing spaces.",
    price: 29,
    unit: "per bottle",
    tags: ["750 ml", "Refined finish", "Lunch-to-evening"],
    accent: "blue",
    badge: "",
    featured: false,
    quoteOnly: false,
    ctaLabel: "Reserve bottle",
    imageUrl:
      "https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&w=900&q=80",
    sortOrder: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: "office-refill-pack",
    name: "Office Refill Pack",
    category: "Workplaces",
    description: "A recurring supply option for teams that need steady hydration across desks, meeting rooms, and reception areas.",
    price: 149,
    unit: "per pack",
    tags: ["12 L", "Scheduled supply", "Corporate friendly"],
    accent: "earth",
    badge: "",
    featured: false,
    quoteOnly: false,
    ctaLabel: "Plan supply",
    imageUrl:
      "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=900&q=80",
    sortOrder: 4,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: "event-water-case",
    name: "Event Water Case",
    category: "Events",
    description: "Fast-moving hydration for weddings, gatherings, and public events where reliability has to feel effortless.",
    price: 249,
    unit: "per case",
    tags: ["20 L", "Dispatch support", "Large gatherings"],
    accent: "mist",
    badge: "",
    featured: false,
    quoteOnly: false,
    ctaLabel: "Book event supply",
    imageUrl:
      "https://images.unsplash.com/photo-1564419320408-38e24e0385c1?auto=format&fit=crop&w=900&q=80",
    sortOrder: 5,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: "custom-bulk-program",
    name: "Custom Bulk Program",
    category: "Special orders",
    description: "Tailored institutional supply for schools, charities, offices, and long-term partners with recurring demand.",
    price: 0,
    unit: "custom quote",
    tags: ["Volume pricing", "Dedicated support", "Flexible terms"],
    accent: "earth",
    badge: "",
    featured: false,
    quoteOnly: true,
    ctaLabel: "Request quote",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    sortOrder: 6,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function ensureSeedData() {
  const db = await getDatabase();
  const collection = db.collection(PRODUCT_COLLECTION);

  const count = await collection.countDocuments();
  if (count > 0) {
    return;
  }

  await collection.insertMany(defaultProductSeed);
}

let cachedProducts: Product[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

export async function getProducts(): Promise<Product[]> {
  const now = Date.now();
  if (cachedProducts && (now - cacheTimestamp < CACHE_TTL_MS)) {
    return cachedProducts;
  }

  try {
    await ensureSeedData();
    const db = await getDatabase();
    const collection = db.collection(PRODUCT_COLLECTION);

    const docs = await collection
      .find({ isActive: { $ne: false } })
      .sort({ sortOrder: 1, createdAt: 1 })
      .toArray();

    const products = docs.map((doc) => toPublicProduct(doc as Record<string, unknown>));
    cachedProducts = products;
    cacheTimestamp = now;
    return products;
  } catch (error) {
    console.error("Failed to load products from MongoDB", error);

    return defaultProductSeed
      .slice()
      .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0))
      .map((seed, index) => ({
        id: `seed-${index + 1}`,
        ...seed,
      }));
  }
}
