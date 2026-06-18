"use client";

import { useState } from "react";
import { navigation } from "@/lib/site";
import { useNavigation, NavigationLink } from "./navigation-context";

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
  const { currentPath } = useNavigation();
  const pathname = currentPath.split("?")[0] || "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="site-container">
        <div className="glass-nav fade-up">
          <div className="nav-bar">
            <NavigationLink className="brand" href="/" onClick={() => setMenuOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-square.png" alt="Hind Jal Logo" className="brand-logo" width={56} height={56} />
              <span>Hind Jal</span>
            </NavigationLink>

            <nav aria-label="Primary" className="nav-links">
              {navigation.map((item) => (
                <NavigationLink
                  key={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="nav-link"
                  data-active={isActive(pathname, item.href) ? "true" : "false"}
                  href={item.href}
                >
                  {getNavigationLabel(item.href, item.label)}
                </NavigationLink>
              ))}
            </nav>

            <div className="nav-actions">
              <NavigationLink className="secondary-button" href="/products">
                Explore catalog
              </NavigationLink>
              <NavigationLink className="nav-cta" href="/contact">
                Start order
              </NavigationLink>
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
                <NavigationLink
                  key={item.href}
                  className="menu-link"
                  data-active={isActive(pathname, item.href) ? "true" : "false"}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {getNavigationLabel(item.href, item.label)}
                </NavigationLink>
              ))}
              <NavigationLink className="nav-cta" href="/contact" onClick={() => setMenuOpen(false)}>
                Open checkout
              </NavigationLink>
            </div>
          </div>
        </div>
      </div>

      <div aria-label="Quick navigation" className="dock">
        {navigation.map((item) => (
          <NavigationLink
            key={item.href}
            className="dock-link"
            data-active={isActive(pathname, item.href) ? "true" : "false"}
            href={item.href}
          >
            {getNavigationLabel(item.href, item.label)}
          </NavigationLink>
        ))}
      </div>
    </header>
  );
}