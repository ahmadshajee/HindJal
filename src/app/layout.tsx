import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hind Jal | Water with purpose",
  description:
    "A premium glass-ui website for Hind Jal, built to make hydration feel trustworthy, accessible, and beautifully simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${jakarta.variable}`}>
        <div className="site-shell">
          <div aria-hidden="true" className="shell-orb shell-orb--blue" />
          <div aria-hidden="true" className="shell-orb shell-orb--earth" />
          <div aria-hidden="true" className="shell-orb shell-orb--mist" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}