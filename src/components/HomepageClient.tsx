"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Article } from "@/types/content";
import { CATEGORY_LABELS } from "@/types/content";
import { formatDateShort } from "@/lib/utils";

/* ─── Content data ────────────────────────────────────────────────────── */

const CYCLING_WORDS = [
  "cognition",
  "attention",
  "identity",
  "power",
  "culture",
  "behavior",
  "memory",
  "language",
  "perception",
  "agency",
];

const SIGNALS = [
  { text: "People aren't losing jobs to AI. They're losing their sense of authorship — the quiet ownership of thought.", cat: "AI & COGNITION" },
  { text: "Every platform that rewarded outrage over accuracy spent years building the neural scaffolding for believing AI-generated content at face value.", cat: "INTERNET CULTURE" },
  { text: "The new cognitive divide isn't between those who use AI and those who don't. It's between those who know how to question it.", cat: "DIGITAL BEHAVIOR" },
  { text: "Online grief now happens in broadcast mode. We perform our pain publicly before we understand what that costs us.", cat: "IDENTITY" },
  { text: "Attention is now a resource extracted at scale. The next generation of monopolies will be built not on data, but on directed thought.", cat: "POWER" },
  { text: "The most dangerous thing about AI isn't that it will replace us. It's that it will validate us endlessly until we forget what challenge feels like.", cat: "AI & COGNITION" },
  { text: "The algorithm isn't radicalizing toward ideology. It's radicalizing toward certainty. That's the scarier trajectory.", cat: "INTERNET CULTURE" },
  { text: "Internet identity is now more stable than embodied identity for many people. This is not metaphor. It has legal and social consequences.", cat: "IDENTITY" },
  { text: "We built the surveillance state one 'I agree' at a time. We're building the compliance engine one 'This was helpful' at a time.", cat: "POWER" },
  { text: "AI companions exist because we built an internet that is extremely good at making people feel watched and extremely bad at making them feel seen.", cat: "AI & COGNITION" },
];

const DISPATCH = [
  { cat: "AI LABOR", title: "Goldman Sachs: 300 million jobs exposed to AI automation within a decade. White-collar roles lead the exposure.", source: "Goldman Sachs" },
  { cat: "INTERNET CULTURE", title: "TikTok's algorithm now identifies emotional vulnerability and adjusts content delivery accordingly, per internal documents.", source: "The Verge" },
  { cat: "COGNITION", title: "Researchers: Heavy screen reading is changing how we parse long-form text. Skimming is becoming the cognitive default.", source: "PNAS" },
  { cat: "AI POLICY", title: "EU's AI Act takes effect. Critics argue it regulates yesterday's problems while tomorrow's are already shipping.", source: "Politico" },
  { cat: "IDENTITY", title: "Growing subset of Gen Z report their online persona as more authentic than their offline one, Pew finds.", source: "Pew Research" },
  { cat: "POWER", title: "The five largest AI companies now control more compute than most nation-states. No one elected them to this position.", source: "Wired" },
];

const LINKS = [
  { title: "OpenAI's latest model scores higher than 99.9% of humans on IQ tests. Nobody agrees what this means.", source: "MIT Tech Review", href: "https://technologyreview.com", cat: "AI" },
  { title: "The attention economy has a new frontier: AI companions that remember everything you've ever shared.", source: "The Atlantic", href: "https://theatlantic.com", cat: "CULTURE" },
  { title: "Heavy social media use shows measurable changes in how people process ambiguity and hold uncertainty.", source: "Science", href: "https://science.org", cat: "BEHAVIOR" },
];

const FRAGMENTS = [
  "the feed is not neutral infrastructure",
  "validation loops compound faster than reasoning",
  "platforms monetize the distance between feeling and thinking",
  "every efficiency gain has a hidden cognitive cost",
  "we built the surveillance state one 'I agree' at a time",
  "the algorithm is a mirror that flatters",
  "attention without understanding is not engagement",
];

const STATS = [
  { n: 300, unit: "M", label: "Jobs at AI risk\nthis decade" },
  { n: 72, unit: "%", label: "Adults online\ndaily in the US" },
  { n: 8, unit: "hrs", label: "Average daily\nscreen exposure" },
];

/* ─── Hooks ────────────────────────────────────────────────────────────── */

function useCountUp(target: number, duration = 1800, delay = 0) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now() + delay;
          const step = (now: number) => {
            if (now < start) { requestAnimationFrame(step); return; }
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, delay]);

  return { value, ref };
}

function useCyclingIndex(items: unknown[], interval = 4000) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);
  return idx;
}

/* ─── Sub-components ───────────────────────────────────────────────────── */

function StatBlock({ n, unit, label, delay }: { n: number; unit: string; label: string; delay: number }) {
  const { value, ref } = useCountUp(n, 1600, delay);
  return (
    <div ref={ref} className="entry-stat">
      <span className="entry-stat-number">{value}{unit}</span>
      <span className="entry-stat-label" style={{ whiteSpace: "pre-line" }}>{label}</span>
    </div>
  );
}

function EssayBlock({ article, spanClass }: { article: Article; spanClass: string }) {
  return (
    <Link href={`/essays/${article.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div className={`block block-essay ${spanClass}`}>
        <span className={`block-cat ${article.featured ? "block-cat-live" : "block-cat-accent"}`}>
          {article.featured ? "★ FEATURED" : CATEGORY_LABELS[article.category]}
        </span>
        <div className="block-inner">
          <div>
            <p className="block-essay-title">{article.title}</p>
            <p className="block-essay-excerpt">{article.excerpt}</p>
          </div>
        </div>
        <span className="block-arrow">→</span>
      </div>
    </Link>
  );
}

function SignalBlock({ text, cat, spanClass }: { text: string; cat: string; spanClass: string }) {
  return (
    <div className={`block block-signal ${spanClass}`}>
      <span className="block-cat block-cat-signal">{cat}</span>
      <div className="block-inner">
        <p className="block-signal-text">{text}</p>
      </div>
    </div>
  );
}

function StatMosaicBlock({ n, unit, label }: { n: number; unit: string; label: string }) {
  const { value, ref } = useCountUp(n, 1400, 200);
  return (
    <div ref={ref} className="block block-stat block-3-2">
      <div className="block-inner">
        <span className="block-stat-number">{value}{unit}</span>
        <span className="block-stat-label" style={{ whiteSpace: "pre-line" }}>{label}</span>
      </div>
    </div>
  );
}

function FragmentBlock({ text, spanClass }: { text: string; spanClass: string }) {
  return (
    <div className={`block block-fragment ${spanClass}`}>
      <div className="block-inner">
        <p className="block-fragment-text">// {text}</p>
      </div>
    </div>
  );
}

function DispatchBlock({ cat, title, source, spanClass }: { cat: string; title: string; source: string; spanClass: string }) {
  return (
    <div className={`block block-dispatch ${spanClass}`}>
      <div className="block-inner">
        <div>
          <p className="block-dispatch-cat">{cat}</p>
          <p className="block-dispatch-title">{title}</p>
        </div>
        <p className="block-dispatch-source">{source}</p>
      </div>
    </div>
  );
}

function LinkBlock({ title, source, href, cat, spanClass }: { title: string; source: string; href: string; cat: string; spanClass: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div className={`block block-link ${spanClass}`}>
        <span className="block-cat block-cat-accent">{cat}</span>
        <div className="block-inner">
          <p className="block-link-title">{title}</p>
          <p className="block-link-source">↗ {source}</p>
        </div>
        <span className="block-arrow">↗</span>
      </div>
    </a>
  );
}

function AmbientBlock({ label, spanClass }: { label: string; spanClass: string }) {
  return (
    <div className={`block block-ambient ${spanClass}`}>
      <div className="block-inner">
        <span className="block-ambient-label">{label}</span>
      </div>
    </div>
  );
}

/* ─── Stream items (below mosaic) ─────────────────────────────────────── */

function StreamEssay({ article }: { article: Article }) {
  return (
    <Link href={`/essays/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div className="stream-essay">
        <div className="stream-essay-eyebrow">
          <span className={`tag ${article.featured ? "tag-featured" : "tag-essay"}`}>
            {CATEGORY_LABELS[article.category]}
          </span>
          <span className="stamp">{formatDateShort(article.date)}</span>
          <span className="stamp">{article.readingTime}</span>
        </div>
        <h3 className="stream-essay-title">{article.title}</h3>
        <p className="stream-essay-excerpt">{article.excerpt}</p>
        <span className="stream-essay-read">→ Read essay</span>
      </div>
    </Link>
  );
}

function StreamSignal({ text, cat }: { text: string; cat: string }) {
  return (
    <div className="stream-signal">
      <div className="stream-signal-bar" />
      <p className="stream-signal-text">{text}</p>
      <div className="stream-signal-meta">
        <span className="tag tag-signal">{cat}</span>
      </div>
    </div>
  );
}

function StreamFragment({ text }: { text: string }) {
  return (
    <div className="stream-fragment">
      <p className="stream-fragment-text">// {text}</p>
    </div>
  );
}

function StreamLink({ title, source, href }: { title: string; source: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      <div className="stream-link">
        <p className="stream-link-title">{title}</p>
        <span className="stream-link-source">{source}</span>
      </div>
    </a>
  );
}

/* ─── Main export ─────────────────────────────────────────────────────── */

export default function HomepageClient({ articles }: { articles: Article[] }) {
  const wordIdx = useCyclingIndex(CYCLING_WORDS, 3200);
  const [wordVisible, setWordVisible] = useState(true);

  // Crossfade the cycling word
  useEffect(() => {
    setWordVisible(false);
    const t = setTimeout(() => setWordVisible(true), 80);
    return () => clearTimeout(t);
  }, [wordIdx]);

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.slug !== featured?.slug);

  // Build woven stream below mosaic
  type StreamItem =
    | { kind: "essay"; article: Article }
    | { kind: "signal"; text: string; cat: string }
    | { kind: "fragment"; text: string }
    | { kind: "link"; title: string; source: string; href: string };

  const stream: StreamItem[] = [];
  rest.forEach((article, i) => {
    stream.push({ kind: "essay", article });
    if (SIGNALS[i + 2]) stream.push({ kind: "signal", text: SIGNALS[i + 2].text, cat: SIGNALS[i + 2].cat });
    if (FRAGMENTS[i + 1]) stream.push({ kind: "fragment", text: FRAGMENTS[i + 1] });
    if (LINKS[i]) stream.push({ kind: "link", ...LINKS[i] });
  });
  if (stream.length === 0) {
    SIGNALS.slice(0, 5).forEach((s) => stream.push({ kind: "signal", text: s.text, cat: s.cat }));
    FRAGMENTS.slice(0, 3).forEach((f) => stream.push({ kind: "fragment", text: f }));
  }

  return (
    <>
      {/* ═══ ENTRY ZONE ════════════════════════════════════════════════ */}
      <div className="entry-zone">
        <div className="entry-inner">
          <div>
            <h1 className="entry-headline">
              The AI<br />
              Transition<br />
              <span style={{ color: "#3a3830" }}>in Real Time</span>
            </h1>
            <p className="entry-headline-sub">
              A living archive of what it feels like to exist at the intersection of
              artificial intelligence, internet culture, and human psychology.
            </p>
            <div className="entry-cycling-text">
              <span style={{ color: "#1a1814" }}>TRACKING</span>
              <span
                className="cycling-word"
                style={{ opacity: wordVisible ? 1 : 0 }}
              >
                {CYCLING_WORDS[wordIdx]}
              </span>
              <span style={{ color: "#1a1814" }}>· POWER · IDENTITY · BEHAVIOR</span>
            </div>
          </div>

          {/* Count-up stats */}
          <div className="entry-stats">
            {STATS.map((s, i) => (
              <StatBlock key={i} n={s.n} unit={s.unit} label={s.label} delay={i * 200} />
            ))}
          </div>
        </div>
      </div>

      {/* ═══ MOSAIC GRID ═══════════════════════════════════════════════ */}
      <div className="mosaic-outer">
        <div className="mosaic-grid">
          {/* Row 1-3: Featured essay large + signal + stat */}
          {featured && <EssayBlock article={featured} spanClass="block-6-3" />}
          <SignalBlock text={SIGNALS[0].text} cat={SIGNALS[0].cat} spanClass="block-3-2" />
          <StatMosaicBlock n={300} unit="M" label={"Jobs at risk\nthis decade"} />
          <FragmentBlock text={FRAGMENTS[0]} spanClass="block-3-1" />

          {/* Row 4-5: dispatch + link + signal */}
          <DispatchBlock cat={DISPATCH[0].cat} title={DISPATCH[0].title} source={DISPATCH[0].source} spanClass="block-4-2" />
          <SignalBlock text={SIGNALS[1].text} cat={SIGNALS[1].cat} spanClass="block-4-2" />
          <LinkBlock title={LINKS[0].title} source={LINKS[0].source} href={LINKS[0].href} cat={LINKS[0].cat} spanClass="block-4-2" />

          {/* Row 6-7: second essay + dispatch items + ambient */}
          {rest[0] && <EssayBlock article={rest[0]} spanClass="block-6-2" />}
          <DispatchBlock cat={DISPATCH[1].cat} title={DISPATCH[1].title} source={DISPATCH[1].source} spanClass="block-3-2" />
          <AmbientBlock label="Visual media · Coming soon" spanClass="block-3-2" />

          {/* Row 8: fragment row + signal + link */}
          <FragmentBlock text={FRAGMENTS[1]} spanClass="block-4-2" />
          <SignalBlock text={SIGNALS[3].text} cat={SIGNALS[3].cat} spanClass="block-4-2" />
          <LinkBlock title={LINKS[1].title} source={LINKS[1].source} href={LINKS[1].href} cat={LINKS[1].cat} spanClass="block-4-2" />
        </div>
      </div>

      {/* ═══ TERMINAL BAND ═════════════════════════════════════════════ */}
      <div className="terminal-band">
        <div className="terminal-band-header">
          <span className="live-dot" style={{ width: 4, height: 4 }} />
          <span className="terminal-band-label">DISPATCH</span>
          <span
            style={{
              fontFamily: 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
              fontSize: "0.53rem",
              color: "#1a1814",
              letterSpacing: "0.1em",
            }}
          >
            · Signals from the broader field
          </span>
        </div>
        <div className="terminal-band-inner">
          {DISPATCH.map((d, i) => (
            <div key={i} className="terminal-item">
              <p className="terminal-item-cat">{d.cat}</p>
              <p className="terminal-item-title">{d.title}</p>
              <p className="terminal-item-source">{d.source}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ STREAM + SIDE COLUMN ══════════════════════════════════════ */}
      <div className="stream-outer">
        {/* Main stream */}
        <div className="stream-col">
          <div className="stream-section-label">
            <span className="live-dot" style={{ width: 4, height: 4 }} />
            <span>INTELLIGENCE STREAM</span>
          </div>

          {stream.map((item, i) => {
            if (item.kind === "essay") return <StreamEssay key={i} article={item.article} />;
            if (item.kind === "signal") return <StreamSignal key={i} text={item.text} cat={item.cat} />;
            if (item.kind === "fragment") return <StreamFragment key={i} text={item.text} />;
            if (item.kind === "link") return <StreamLink key={i} title={item.title} source={item.source} href={item.href} />;
            return null;
          })}

          <div
            style={{
              padding: "2.5rem 0",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.03)" }} />
            <span
              style={{
                fontFamily: 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
                fontSize: "0.53rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#1a1814",
              }}
            >
              Stream current to {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.03)" }} />
          </div>
        </div>

        {/* Side column */}
        <aside className="stream-side">
          <div className="side-header">
            <span className="live-dot" style={{ width: 4, height: 4 }} />
            <span className="side-header-label">SIGNALS</span>
          </div>

          {SIGNALS.slice(0, 8).map((s, i) => (
            <div key={i} className="side-item">
              <p className="side-item-text">{s.text}</p>
              <div className="side-item-meta">{s.cat}</div>
            </div>
          ))}

          <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
            <p
              style={{
                fontFamily: 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
                fontSize: "0.53rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1a1814",
                marginBottom: "0.65rem",
              }}
            >
              About this platform
            </p>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "0.76rem",
                color: "#1e1c18",
                lineHeight: 1.65,
              }}
            >
              Documenting the AI transition era — not from a corporate lens,
              but from a human one.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
