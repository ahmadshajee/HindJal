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

export function formatRupees(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}