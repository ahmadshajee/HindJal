export type NavigationItem = {
  href: string;
  label: string;
};

export type ThoughtBubble = {
  eyebrow: string;
  copy: string;
};

export type ValueCard = {
  title: string;
  copy: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  specs: string[];
  accent: "blue" | "earth" | "mist";
  badge?: string;
  featured?: boolean;
  quoteOnly?: boolean;
  ctaLabel?: string;
};

export const navigation: NavigationItem[] = [
  { href: "/", label: "About us" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Checkout" },
];

export const thoughtBubbles: ThoughtBubble[] = [
  {
    eyebrow: "Thought",
    copy: "A world without thirst shouldn’t be expensive.",
  },
  {
    eyebrow: "Promise",
    copy: "Just ₹5 can turn thirst into relief.",
  },
  {
    eyebrow: "Mindset",
    copy: "Hydration is a right, not a luxury.",
  },
  {
    eyebrow: "Belief",
    copy: "Small pouch. Big change.",
  },
  {
    eyebrow: "Truth",
    copy: "No one should be thirsty when help costs just ₹5.",
  },
  {
    eyebrow: "Impact",
    copy: "₹5 today, a thirst-free tomorrow.",
  },
  {
    eyebrow: "Vision",
    copy: "One pouch. One life refreshed.",
  },
  {
    eyebrow: "Mission",
    copy: "Because survival shouldn’t come with a price tag.",
  },
];

export const valueCards: ValueCard[] = [
  {
    title: "Founder-led trust",
    copy:
      "The brand starts with a personal promise: no unnecessary noise, no confusion, just a calm path from need to relief.",
  },
  {
    title: "Transparent pricing",
    copy:
      "The entry pouch stays at ₹5 so hydration can feel accessible, honest, and emotionally easy to choose.",
  },
  {
    title: "Discipline in every batch",
    copy:
      "Every order is designed to feel steady and reliable, from the first tap of the form to the final handoff.",
  },
  {
    title: "Mobile-first care",
    copy:
      "The full experience is thumb-friendly, quick to scan, and built to work beautifully on a phone in one hand.",
  },
];

export const products: Product[] = [
  {
    slug: "relief-pouch",
    name: "Hind Jal Relief Pouch",
    category: "Everyday relief",
    description:
      "The entry point to the brand. A fast, affordable pouch for immediate hydration when the moment matters most.",
    price: 5,
    unit: "per pouch",
    specs: ["250 ml", "Pocket-friendly", "Retail-ready"],
    accent: "blue",
    badge: "Best value",
    featured: true,
    ctaLabel: "Order pouch",
  },
  {
    slug: "family-bottle",
    name: "Hind Jal Family Bottle",
    category: "Home use",
    description:
      "A calm, premium bottle for homes and small teams that want consistent hydration without the heavy feel.",
    price: 18,
    unit: "per bottle",
    specs: ["500 ml", "Easy grip", "Daily use"],
    accent: "mist",
    ctaLabel: "Add to order",
  },
  {
    slug: "premium-bottle",
    name: "Hind Jal Premium Bottle",
    category: "On the move",
    description:
      "A taller bottle built to feel polished on desks, in travel bags, and across client-facing spaces.",
    price: 29,
    unit: "per bottle",
    specs: ["750 ml", "Refined finish", "Lunch-to-evening"],
    accent: "blue",
    ctaLabel: "Reserve bottle",
  },
  {
    slug: "office-refill-pack",
    name: "Office Refill Pack",
    category: "Workplaces",
    description:
      "A recurring supply option for teams that need steady hydration across desks, meeting rooms, and reception areas.",
    price: 149,
    unit: "per pack",
    specs: ["12 L", "Scheduled supply", "Corporate friendly"],
    accent: "earth",
    ctaLabel: "Plan supply",
  },
  {
    slug: "event-water-case",
    name: "Event Water Case",
    category: "Events",
    description:
      "Fast-moving hydration for weddings, gatherings, and public events where reliability has to feel effortless.",
    price: 249,
    unit: "per case",
    specs: ["20 L", "Dispatch support", "Large gatherings"],
    accent: "mist",
    ctaLabel: "Book event supply",
  },
  {
    slug: "custom-bulk-program",
    name: "Custom Bulk Program",
    category: "Special orders",
    description:
      "Tailored institutional supply for schools, charities, offices, and long-term partners with recurring demand.",
    price: 0,
    unit: "custom quote",
    specs: ["Volume pricing", "Dedicated support", "Flexible terms"],
    accent: "earth",
    quoteOnly: true,
    ctaLabel: "Request quote",
  },
];

export function formatRupees(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}