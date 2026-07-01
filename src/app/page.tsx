import { getAllArticles, getFeaturedArticle } from "@/lib/content";
import MainLayout from "@/components/MainLayout";
import {
  FeedEssayFeatured,
  FeedEssay,
  FeedSignal,
  FeedFragment,
  FeedLink,
  StreamDivider,
  DispatchItem,
} from "@/components/FeedItem";

/* ─────────────────────────────────────────────────────────────────────────────
   CONTENT DATA — signals, fragments, links, dispatch items
   In future phases these will be CMS/API-driven. Hardcoded here for the
   foundation so the structure is established and scalable.
   ───────────────────────────────────────────────────────────────────────────── */

const MAIN_SIGNALS = [
  {
    id: "m1",
    text: "People aren't losing jobs to AI. They're losing their sense of authorship — the quiet ownership of thought. That's the subtler theft.",
    category: "AI & COGNITION",
  },
  {
    id: "m2",
    text: "Every platform that rewarded outrage over accuracy has spent years building the neural scaffolding for believing AI-generated content at face value.",
    category: "INTERNET CULTURE",
  },
  {
    id: "m3",
    text: "The new cognitive divide isn't between those who use AI and those who don't. It's between those who know how to question it and those who don't.",
    category: "DIGITAL BEHAVIOR",
  },
  {
    id: "m4",
    text: "Online grief now happens in broadcast mode. The internet taught us to perform our pain publicly long before we understood what that would cost us.",
    category: "IDENTITY",
  },
  {
    id: "m5",
    text: "Attention is now a resource extracted at scale. The next generation of monopolies will be built not on data, but on directed thought.",
    category: "POWER",
  },
];

const FRAGMENTS = [
  "the feed is not neutral infrastructure",
  "validation loops compound faster than reasoning",
  "platforms monetize the distance between feeling and thinking",
  "every efficiency gain has a hidden cognitive cost",
  "we built the surveillance state one 'I agree' at a time",
];

// External links — the connective tissue to the live internet
const LINKS = [
  {
    id: "l1",
    title: "OpenAI's latest model scores higher than 99.9% of humans on standard IQ tests. Nobody agrees on what that means.",
    source: "MIT Technology Review",
    href: "https://technologyreview.com",
    category: "AI",
  },
  {
    id: "l2",
    title: "The attention economy has a new frontier: AI companions that remember everything you've ever told them.",
    source: "The Atlantic",
    href: "https://theatlantic.com",
    category: "CULTURE",
  },
  {
    id: "l3",
    title: "A new study finds that heavy social media users show measurable changes in how they process ambiguity.",
    source: "Science",
    href: "https://science.org",
    category: "BEHAVIOR",
  },
];

// Dispatch band — dense, scannable, feels like a live wire
const DISPATCH = [
  {
    id: "d1",
    category: "AI LABOR",
    title: "Goldman Sachs: 300 million jobs exposed to AI automation within a decade. White-collar work leads.",
    source: "Goldman Sachs Research",
  },
  {
    id: "d2",
    category: "INTERNET CULTURE",
    title: "TikTok's algorithm now identifies emotional vulnerability and adjusts content accordingly, per internal docs.",
    source: "The Verge",
  },
  {
    id: "d3",
    category: "COGNITION",
    title: "Researchers: reading on screens is changing how we parse long-form text. Skimming is now the default mode.",
    source: "PNAS",
  },
  {
    id: "d4",
    category: "AI POLICY",
    title: "EU's AI Act takes effect. Critics say it regulates yesterday's problems while tomorrow's are already shipping.",
    source: "Politico",
  },
  {
    id: "d5",
    category: "IDENTITY",
    title: "A growing subset of Gen Z report their online persona as more authentic than their offline one.",
    source: "Pew Research",
  },
  {
    id: "d6",
    category: "POWER",
    title: "The five largest AI companies now control more compute than most nation states. Nobody elected them.",
    source: "Wired",
  },
];

const SIDEBAR_SIGNALS = [
  {
    id: "s1",
    text: "The most dangerous thing about AI isn't that it will replace us. It's that it will validate us — endlessly, uncritically — until we forget what it means to be challenged.",
    meta: "AI & COGNITION",
  },
  {
    id: "s2",
    text: "Nobody talks about the loneliness of watching your industry automate in real time while being expected to feel grateful for the efficiency gains.",
    meta: "DIGITAL BEHAVIOR",
  },
  {
    id: "s3",
    text: "Internet identity is now more stable than embodied identity for many people. This is not a metaphor. It has legal, psychological, and social consequences.",
    meta: "IDENTITY",
  },
  {
    id: "s4",
    text: "The algorithm isn't radicalizing people toward any ideology in particular. It's radicalizing them toward certainty. That's scarier.",
    meta: "INTERNET CULTURE",
  },
  {
    id: "s5",
    text: "We built the outrage machine because outrage is the most reliable engagement signal. We are now inside a society that has learned to think in outrage.",
    meta: "POWER",
  },
  {
    id: "s6",
    text: "AI companions exist because we built an internet that is extremely good at making people feel watched and extremely bad at making them feel seen.",
    meta: "AI & COGNITION",
  },
  {
    id: "s7",
    text: "The real filter bubble isn't political — it's epistemic. It determines not what you believe, but what kinds of evidence you're even capable of accepting.",
    meta: "DIGITAL BEHAVIOR",
  },
  {
    id: "s8",
    text: "Every platform that charges you nothing has decided that friction — the productive kind, the kind that makes you think — is a churn risk.",
    meta: "POWER",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const featured = getFeaturedArticle();
  const allArticles = getAllArticles();
  const rest = allArticles.filter((a) => a.slug !== featured?.slug);

  // Build the woven main stream
  type StreamItem =
    | { kind: "essay"; article: typeof rest[0] }
    | { kind: "signal"; signal: typeof MAIN_SIGNALS[0] }
    | { kind: "fragment"; text: string }
    | { kind: "link"; link: typeof LINKS[0] }
    | { kind: "divider"; label: string };

  const stream: StreamItem[] = [];

  if (rest.length > 0) {
    stream.push({ kind: "signal", signal: MAIN_SIGNALS[0] });
    stream.push({ kind: "essay", article: rest[0] });
    stream.push({ kind: "fragment", text: FRAGMENTS[0] });
    stream.push({ kind: "link", link: LINKS[0] });
    stream.push({ kind: "signal", signal: MAIN_SIGNALS[1] });
  }

  if (rest.length > 1) {
    stream.push({ kind: "divider", label: "More Essays" });
    stream.push({ kind: "essay", article: rest[1] });
    stream.push({ kind: "link", link: LINKS[1] });
    stream.push({ kind: "signal", signal: MAIN_SIGNALS[2] });
    stream.push({ kind: "fragment", text: FRAGMENTS[1] });
  }

  if (rest.length > 2) {
    stream.push({ kind: "signal", signal: MAIN_SIGNALS[3] });
    stream.push({ kind: "essay", article: rest[2] });
    stream.push({ kind: "link", link: LINKS[2] });
    stream.push({ kind: "fragment", text: FRAGMENTS[2] });
    stream.push({ kind: "signal", signal: MAIN_SIGNALS[4] });
  }

  rest.slice(3).forEach((article, i) => {
    stream.push({ kind: "essay", article });
    if (FRAGMENTS[i + 3]) stream.push({ kind: "fragment", text: FRAGMENTS[i + 3] });
  });

  return (
    <>
      <MainLayout>
        {/* ═══ ZONE A: Main stream ═══════════════════════════════════════ */}
        <div className="stream-layout">
          {/* ── Main column ─────────────────────────────────────── */}
          <div className="stream-main">
            {/* Masthead */}
            <div className="masthead">
              <span className="masthead-label">
                <span className="live-dot" />
                INTELLIGENCE STREAM
              </span>
              <p className="masthead-descriptor">
                AI cognition · internet culture · digital behavior · power structures · cognitive inequality · online identity
              </p>
            </div>

            {/* Featured essay */}
            {featured && <FeedEssayFeatured article={featured} />}

            {/* Woven stream */}
            {stream.map((item, i) => {
              if (item.kind === "essay")
                return <FeedEssay key={i} article={item.article} />;
              if (item.kind === "signal")
                return <FeedSignal key={i} text={item.signal.text} category={item.signal.category} />;
              if (item.kind === "fragment")
                return <FeedFragment key={i} text={item.text} />;
              if (item.kind === "link")
                return (
                  <FeedLink
                    key={i}
                    title={item.link.title}
                    source={item.link.source}
                    href={item.link.href}
                    category={item.link.category}
                  />
                );
              if (item.kind === "divider")
                return <StreamDivider key={i} label={item.label} />;
              return null;
            })}

            {/* Stream tail */}
            <div
              style={{
                padding: "2.5rem 0 3rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div className="stream-divider-line" />
              <span
                style={{
                  fontFamily: 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#1a1814",
                }}
              >
                Stream current to {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
              <div className="stream-divider-line" />
            </div>
          </div>

          {/* ── Side column ─────────────────────────────────────── */}
          <aside className="stream-side">
            <div className="side-header">
              <span className="live-dot" style={{ width: 4, height: 4 }} />
              <span className="side-header-label">SIGNALS</span>
              <span
                style={{
                  fontFamily: 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
                  fontSize: "0.55rem",
                  color: "#1a1814",
                  letterSpacing: "0.08em",
                }}
              >
                · Observations
              </span>
            </div>

            {SIDEBAR_SIGNALS.map((sig) => (
              <div key={sig.id} className="side-signal">
                <p className="side-signal-text">{sig.text}</p>
                <div className="side-signal-meta">{sig.meta}</div>
              </div>
            ))}

            {/* About blurb */}
            <div
              style={{
                marginTop: "2rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.03)",
              }}
            >
              <p
                style={{
                  fontFamily: 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
                  fontSize: "0.55rem",
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
                  fontSize: "0.78rem",
                  color: "#2a2820",
                  lineHeight: 1.65,
                }}
              >
                Documenting the AI transition era — not from a corporate lens,
                but from a human one.
              </p>
            </div>
          </aside>
        </div>

        {/* ═══ ZONE B: Dispatch band — dense headlines, full width ═══════ */}
        <div className="dispatch-band">
          <div className="dispatch-inner">
            <div className="dispatch-header">
              <span className="live-dot" style={{ width: 4, height: 4 }} />
              <span className="dispatch-label">DISPATCH</span>
              <span
                style={{
                  fontFamily: 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
                  fontSize: "0.55rem",
                  color: "#1a1814",
                  letterSpacing: "0.08em",
                }}
              >
                · Signals from the broader field
              </span>
            </div>
            <div className="dispatch-grid">
              {DISPATCH.map((item) => (
                <DispatchItem
                  key={item.id}
                  title={item.title}
                  category={item.category}
                  source={item.source}
                />
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
