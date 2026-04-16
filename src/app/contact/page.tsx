import type { Metadata } from "next";
import Link from "next/link";
import { OrderForm } from "@/components/order-form";

type ContactPageProps = {
  searchParams?: {
    product?: string | string[];
  };
};

const supportCards = [
  {
    title: "Bulk orders",
    copy: "For recurring supply, offices, schools, and community support programs.",
  },
  {
    title: "Event delivery",
    copy: "For weddings, launches, and gatherings where trust has to feel effortless.",
  },
  {
    title: "Custom planning",
    copy: "For larger asks that need a human reply and a clean next step.",
  },
];

export const metadata: Metadata = {
  title: "Checkout | Hind Jal",
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const productParam = Array.isArray(searchParams?.product) ? searchParams?.product[0] : searchParams?.product;

  return (
    <div>
      <section className="section">
        <div className="site-container product-hero-grid">
          <div className="hero-copy fade-up">
            <span className="eyebrow">Secure checkout</span>
            <h1 className="hero-title">
              Checkout that feels calm, not <span>complicated</span>.
            </h1>
            <p className="hero-lead">
              Use this page for direct orders, bulk requests, and corporate supply. Every submission is stored in
              MongoDB so the business can track it cleanly behind the scenes.
            </p>

            <div className="hero-actions">
              <Link className="primary-button" href="/products">
                Choose a product
              </Link>
              <Link className="secondary-button" href="/">
                Return to story
              </Link>
            </div>

            <div className="mini-stats">
              <span>Secure order intake</span>
              <span>Custom quote support</span>
              <span>Founder-guided trust</span>
            </div>
          </div>

          <div className="glass-panel fade-up delay-1">
            <span className="eyebrow">How this page works</span>
            <div className="feature-grid">
              <div className="feature-card">
                <h3>Choose a product</h3>
                <p>Pick from the catalog or request a custom supply path.</p>
              </div>
              <div className="feature-card">
                <h3>Leave contact details</h3>
                <p>We keep the form compact, readable, and comfortable on mobile.</p>
              </div>
              <div className="feature-card">
                <h3>Submit the request</h3>
                <p>The order is saved to MongoDB and ready for follow-up.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <OrderForm initialProductSlug={productParam} />
      </section>

      <section className="section">
        <div className="site-container glass-panel fade-up">
          <div className="product-hero-grid">
            <div>
              <span className="eyebrow">Special order support</span>
              <h2 className="section-title">If the request is bigger than retail, we still keep it simple.</h2>
              <p className="section-copy">
                Bulk supply, recurring delivery, and event requests all go through the same calm contact path so the
                next step never feels confusing.
              </p>
            </div>

            <div className="support-grid">
              {supportCards.map((card) => (
                <div className="support-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}