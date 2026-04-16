import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/site";

const shopNotes = [
  {
    title: "Fast selection",
    copy: "Every card is designed to be scanned quickly on mobile without losing the premium feel.",
  },
  {
    title: "Transparent pricing",
    copy: "The starting pouch stays visible at ₹5 so the promise stays rooted in accessibility.",
  },
  {
    title: "Bulk ready",
    copy: "Custom programs are included for events, offices, and institutions that need more than retail checkout.",
  },
];

export default function ProductsPage() {
  return (
    <div>
      <section className="section">
        <div className="site-container product-hero-grid">
          <div className="hero-copy fade-up">
            <span className="eyebrow">Our products</span>
            <h1 className="hero-title">
              Crafted to feel premium and priced to stay <span>human</span>.
            </h1>
            <p className="hero-lead">
              Choose a pouch for immediate relief, a bottle for everyday use, or a bulk program for events and
              recurring supply.
            </p>

            <div className="hero-actions">
              <Link className="primary-button" href="/contact">
                Start checkout
              </Link>
              <Link className="secondary-button" href="/">
                Read our story
              </Link>
            </div>

            <div className="mini-stats">
              <span>Starts at ₹5</span>
              <span>Bulk support available</span>
              <span>Mobile-first ordering</span>
            </div>
          </div>

          <div className="glass-panel fade-up delay-1">
            <span className="eyebrow">How the catalog works</span>
            <div className="feature-grid">
              {shopNotes.map((note) => (
                <div className="feature-card" key={note.title}>
                  <h3>{note.title}</h3>
                  <p>{note.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="site-container">
          <div className="catalog-head">
            <span className="eyebrow">Retail and special orders</span>
            <h2 className="section-title">A catalog designed like a gallery, but built for conversion.</h2>
            <p className="section-copy">
              The first card stays intentionally simple. The broader selection scales up for homes, teams, and larger
              supply needs without losing the glass UI look.
            </p>
          </div>

          <div className="product-grid" style={{ marginTop: "1.5rem" }}>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container glass-panel fade-up">
          <div className="product-hero-grid">
            <div>
              <span className="eyebrow">Need scale?</span>
              <h2 className="section-title">Special orders deserve the same calm, premium experience.</h2>
              <p className="section-copy">
                If you need recurring water supply, event distribution, or a corporate arrangement, the checkout page
                is built to collect the details cleanly in one place.
              </p>
            </div>

            <div className="support-grid">
              <div className="support-card">
                <h3>Events and gatherings</h3>
                <p>Fast supply planning for weddings, conferences, community events, and on-site hospitality.</p>
              </div>
              <div className="support-card">
                <h3>Workplaces and institutions</h3>
                <p>Recurring delivery options for offices, schools, clinics, and other structured environments.</p>
              </div>
              <div className="support-card">
                <h3>Founder-led response</h3>
                <p>Requests go through a simple form so each inquiry stays readable and easy to action quickly.</p>
              </div>
            </div>
          </div>

          <div className="footer-actions" style={{ marginTop: "1.35rem" }}>
            <Link className="primary-button" href="/contact">
              Open checkout
            </Link>
            <Link className="earth-button" href="/">
              Back to about us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}