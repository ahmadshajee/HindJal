"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getNavigationLabel(href: string, label: string) {
  if (href === "/") {
    return "Home";
  }

  if (href === "/contact") {
    return "Contact";
  }

  return label;
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" width="18" height="18">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" width="18" height="18">
      <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="site-container">
        <div className="glass-nav fade-up">
          <div className="nav-bar">
            <Link className="brand" href="/" onClick={() => setMenuOpen(false)}>
              <span className="brand-mark" aria-hidden="true" />
              <span>Hind Jal</span>
            </Link>

            <nav aria-label="Primary" className="nav-links">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="nav-link"
                  data-active={isActive(pathname, item.href) ? "true" : "false"}
                  href={item.href}
                >
                  {getNavigationLabel(item.href, item.label)}
                </Link>
              ))}
            </nav>

            <div className="nav-actions">
              <Link className="secondary-button" href="/products">
                Explore catalog
              </Link>
              <Link className="nav-cta" href="/contact">
                Start order
              </Link>
            </div>

            <button
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              className="menu-button"
              onClick={() => setMenuOpen((value) => !value)}
              type="button"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          <div className="menu-panel" data-open={menuOpen ? "true" : "false"}>
            <p className="menu-panel__copy">
              Built for mobile first, because the customer journey often starts in one hand and ends in trust.
            </p>
            <div className="menu-links">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  className="menu-link"
                  data-active={isActive(pathname, item.href) ? "true" : "false"}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {getNavigationLabel(item.href, item.label)}
                </Link>
              ))}
              <Link className="nav-cta" href="/contact" onClick={() => setMenuOpen(false)}>
                Open checkout
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div aria-label="Quick navigation" className="dock">
        {navigation.map((item) => (
          <Link
            key={item.href}
            className="dock-link"
            data-active={isActive(pathname, item.href) ? "true" : "false"}
            href={item.href}
          >
            {getNavigationLabel(item.href, item.label)}
          </Link>
        ))}
      </div>
    </header>
  );
}