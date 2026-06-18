import { NavigationLink } from "./navigation-context";

export function SiteFooter() {
  return (
    <footer className="footer-wrap">
      <div className="site-container">
        <div className="footer-glass glass-card fade-up">
          <div className="footer-grid">
            <div className="footer-brand">
              <strong>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-square.png" alt="Hind Jal Logo" className="brand-logo" width={56} height={56} />
                Hind Jal
              </strong>
              <p>
                We design hydration to feel calm, honest, and accessible, starting from a simple promise: no one
                should be priced out of relief.
              </p>
              <p className="footer-note">₹5 today, a thirst-free tomorrow.</p>
            </div>

            <div className="footer-links">
              <p className="eyebrow">Quick links</p>
              <NavigationLink href="/">Home</NavigationLink>
              <NavigationLink href="/products">Product catalog</NavigationLink>
              <NavigationLink href="/contact">Contact and orders</NavigationLink>
            </div>

            <div className="footer-links">
              <p className="eyebrow">Business contact</p>
              <p>Bulk and corporate requests are handled through the contact and order page for a faster response.</p>
              <a href="mailto:hindjalpatna@gmail.com">
                hindjalpatna@gmail.com
              </a>
              <p>Support hours: Mon-Sat, 9:00 AM to 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}