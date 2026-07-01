"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LiveClock from "./LiveClock";

const NAV = [
  { href: "/essays", label: "Essays" },
  { href: "/signals", label: "Signals" },
  { href: "/about", label: "About" },
];

const TICKER_ITEMS = [
  "The quiet theft of authorship",
  "Cognitive inequality is a structural problem",
  "Attention is not a free resource",
  "The algorithm optimizes for certainty, not truth",
  "Online grief happens in broadcast mode now",
  "Every platform was designed for an advertiser",
  "AI doesn't just change work — it changes thinking",
  "The feed is not neutral infrastructure",
  "We are inside a transition we cannot see clearly",
  "The interiority of thought is changing in real time",
  "Platforms monetize the distance between feeling and thinking",
  "We built the surveillance state one 'I agree' at a time",
];

export default function Header() {
  const pathname = usePathname();

  // Double for seamless loop
  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
    <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
      <span className="ticker-item">{item}</span>
      <span className="ticker-sep">·</span>
    </span>
  ));

  return (
    <header className="status-bar">
      <div className="status-bar-inner">
        {/* Wordmark + live indicator */}
        <Link href="/" className="wordmark" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          A·S
          <span className="live-dot" title="Live" />
        </Link>

        {/* Ticker */}
        <div className="ticker-rail">
          <div className="ticker-track">{tickerContent}</div>
        </div>

        {/* Clock + nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
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
