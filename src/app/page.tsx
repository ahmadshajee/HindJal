import Link from "next/link";
import { ThoughtBubbles } from "@/components/thought-bubbles";
import { valueCards } from "@/lib/site";

const promiseStats = [
  {
    value: "₹5",
    label: "Starting relief point",
  },
  {
    value: "3",
    label: "Core pages crafted for trust",
  },
  {
    value: "100%",
    label: "Mobile-first glass experience",
  },
];

const trustCards = [
  {
    title: "Purity metric",
    copy: "A visible commitment to clarity, consistency, and a calm customer experience.",
  },
  {
    title: "Community pricing",
    copy: "The smallest pouch is kept affordable so hydration can stay reachable for everyone.",
  },
  {
    title: "Founder accountability",
    copy: "The message is personal, the promise is public, and the tone stays honest from start to finish.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="section">
        <div className="site-container hero-grid">
          <div className="hero-copy fade-up">
            <span className="eyebrow">Hind Jal</span>
            <h1 className="hero-title">
              A world without thirst should not be <span>expensive</span>.
            </h1>
            <p className="hero-lead">
              Hind Jal is built as a premium water brand with a simple conviction: hydration should feel trustworthy,
              accessible, and beautifully easy to buy on any screen.
            </p>

            <div className="hero-actions">
              <Link className="primary-button" href="/products">
                Explore products
              </Link>
              <Link className="secondary-button" href="/contact">
                Talk to us
              </Link>
            </div>

            <div className="pill-row">
              <span className="pill">Hydration is a right, not a luxury</span>
              <span className="pill">₹5 can turn thirst into relief</span>
              <span className="pill">Glass UI for mobile-first trust</span>
            </div>

            <div className="stat-grid">
              {promiseStats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-side fade-up delay-1">
            <div className="hero-side__frame" />
            <ThoughtBubbles />
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="site-container split-grid">
          <div className="glass-panel fade-up">
            <span className="eyebrow">Founder&apos;s message</span>
            <h2 className="section-title">We are a trusting organisation.</h2>
            <p className="section-copy">
              I started Hind Jal with one simple refusal: no one should have to feel the weight of thirst and price at
              the same time. I want to end the thirst of everyone, one honest order at a time.
            </p>
            <div className="signature-card">
              <p>“I want to end the thirst of everyone.”</p>
              <span>Founder, Hind Jal</span>
            </div>
          </div>

          <div className="glass-card fade-up delay-1">
            <span className="eyebrow">Trust and transparency</span>
            <div className="feature-grid">
              {trustCards.map((card) => (
                <div className="feature-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tonal">
        <div className="site-container">
          <span className="eyebrow">Thoughts, not slogans</span>
          <h2 className="section-title">Built to feel calm, human, and credible.</h2>
          <p className="section-copy">
            The bubbles in this design echo the way a brand should speak: light enough to feel approachable, direct
            enough to feel sincere, and structured enough to feel dependable.
          </p>

          <div className="value-grid" style={{ marginTop: "1.5rem" }}>
            {valueCards.map((card) => (
              <div className="value-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container glass-panel fade-up">
          <div className="product-hero-grid">
            <div>
              <span className="eyebrow">End thirst, one sip at a time</span>
              <h2 className="section-title">Because survival should never come with a price tag.</h2>
              <p className="section-copy">
                Browse the catalog for individual pouches, everyday bottles, or bigger supply options for events and
                workplaces.
              </p>
            </div>

            <div className="catalog-note">
              <p className="catalog-note__title">Why it feels premium</p>
              <p>
                Glass surfaces, soft gradients, and a mobile-first layout create a site that feels as thoughtful as the
                mission behind it.
              </p>
              <div className="catalog-actions">
                <Link className="primary-button" href="/products">
                  View products
                </Link>
                <Link className="earth-button" href="/contact">
                  Request supply
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}