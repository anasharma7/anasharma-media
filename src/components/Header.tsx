"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LiveClock from "./LiveClock";

const NAV = [
  { href: "/essays", label: "Essays" },
  { href: "/signals", label: "Signals" },
  { href: "/about", label: "About" },
];

// Ticker items — two copies for seamless loop
const TICKER_ITEMS = [
  "The quiet theft of authorship",
  "Cognitive inequality is a structural problem",
  "Attention is not a free resource",
  "The algorithm optimizes for certainty, not truth",
  "Online grief happens in broadcast mode now",
  "Every platform was built for an advertiser",
  "AI doesn't just change work — it changes thinking",
  "The feed is not neutral infrastructure",
  "We are inside a transition we cannot see clearly",
  "The interiority of thought is changing",
];

export default function Header() {
  const pathname = usePathname();

  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "3rem" }}>
      <span className="ticker-item">{item}</span>
      <span className="ticker-sep">—</span>
    </span>
  ));

  return (
    <header className="status-bar">
      <div className="status-bar-inner">
        {/* Wordmark */}
        <Link href="/" className="wordmark">
          A·S
        </Link>

        {/* Ticker */}
        <div className="ticker-rail">
          <div className="ticker-track">{tickerContent}</div>
        </div>

        {/* Right: clock + nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.75rem",
          }}
        >
          <LiveClock />
          <nav className="status-nav">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`status-nav-link${pathname.startsWith(href) ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
