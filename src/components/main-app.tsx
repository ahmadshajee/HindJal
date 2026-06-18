"use client";

import React from "react";
import { NavigationProvider, useNavigation, NavigationLink } from "./navigation-context";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { TypewriterTitle } from "./typewriter-title";
import { ThoughtBubbles } from "./thought-bubbles";
import { ProductCard } from "./product-card";
import { OrderForm } from "./order-form";
import { valueCards } from "@/lib/site";
import { Product } from "@/lib/products";

type MainAppProps = {
  initialPath: string;
  products: Product[];
};

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

function HomeView() {
  return (
    <div>
      <section className="section">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Hind Jal</span>
            <TypewriterTitle />
            <p className="hero-lead">
              Hind Jal is built as a premium water brand with a simple conviction: hydration should feel trustworthy,
              accessible, and beautifully easy to buy on any screen.
            </p>

            <div className="hero-actions">
              <NavigationLink className="primary-button" href="/products">
                Explore products
              </NavigationLink>
              <NavigationLink className="secondary-button" href="/contact">
                Talk to us
              </NavigationLink>
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

          <div className="hero-side delay-1">
            <div className="hero-side__frame" />
            <ThoughtBubbles />
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="site-container split-grid">
          <div className="glass-panel">
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

          <div className="glass-card delay-1">
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
        <div className="site-container glass-panel">
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
                <NavigationLink className="primary-button" href="/products">
                  View products
                </NavigationLink>
                <NavigationLink className="earth-button" href="/contact">
                  Request supply
                </NavigationLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductsView({ products }: { products: Product[] }) {
  return (
    <div>
      <section className="section">
        <div className="site-container product-hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Our products</span>
            <h1 className="hero-title">
              Crafted to feel premium and priced to stay <span>human</span>.
            </h1>
            <p className="hero-lead">
              Choose a pouch for immediate relief, a bottle for everyday use, or a bulk program for events and
              recurring supply.
            </p>

            <div className="hero-actions">
              <NavigationLink className="primary-button" href="/contact">
                Start checkout
              </NavigationLink>
              <NavigationLink className="secondary-button" href="/">
                Read our story
              </NavigationLink>
            </div>

            <div className="mini-stats">
              <span>Starts at ₹5</span>
              <span>Bulk support available</span>
              <span>Mobile-first ordering</span>
            </div>
          </div>

          <div className="glass-panel delay-1">
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
        <div className="site-container glass-panel">
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
            <NavigationLink className="primary-button" href="/contact">
              Open checkout
            </NavigationLink>
            <NavigationLink className="earth-button" href="/">
              Back to about us
            </NavigationLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactView({ products, initialProductSlug }: { products: Product[]; initialProductSlug?: string }) {
  return (
    <div>
      <section className="section">
        <div className="site-container product-hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Secure checkout</span>
            <h1 className="hero-title">
              Checkout that feels calm, not <span>complicated</span>.
            </h1>
            <p className="hero-lead">
              Use this page for direct orders, bulk requests, and corporate supply. Every submission is stored in
              MongoDB so the business can track it cleanly behind the scenes.
            </p>

            <div className="hero-actions">
              <NavigationLink className="primary-button" href="/products">
                Choose a product
              </NavigationLink>
              <NavigationLink className="secondary-button" href="/">
                Return to story
              </NavigationLink>
            </div>

            <div className="mini-stats">
              <span>Secure order intake</span>
              <span>Custom quote support</span>
              <span>Founder-guided trust</span>
            </div>
          </div>

          <div className="glass-panel delay-1">
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
        <OrderForm initialProductSlug={initialProductSlug} products={products} />
      </section>

      <section className="section">
        <div className="site-container glass-panel">
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

function MainAppInner({ products }: { products: Product[] }) {
  const { currentPath } = useNavigation();

  let pathname = "/";
  let productParam = "";

  try {
    const url = new URL(currentPath, "http://localhost:3000");
    pathname = url.pathname;
    productParam = url.searchParams.get("product") || "";
  } catch (e) {
    pathname = currentPath.split("?")[0] || "/";
    const match = currentPath.match(/[?&]product=([^&]+)/);
    if (match) {
      productParam = decodeURIComponent(match[1]);
    }
  }

  return (
    <>
      <SiteHeader />
      <main>
        <div className="page-view" data-visible={pathname === "/" ? "true" : "false"}>
          <HomeView />
        </div>
        <div className="page-view" data-visible={pathname === "/products" ? "true" : "false"}>
          <ProductsView products={products} />
        </div>
        <div className="page-view" data-visible={pathname === "/contact" ? "true" : "false"}>
          <ContactView products={products} initialProductSlug={productParam} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export function MainApp({ initialPath, products }: MainAppProps) {
  return (
    <NavigationProvider initialPath={initialPath}>
      <MainAppInner products={products} />
    </NavigationProvider>
  );
}
