import { getAllArticles, getFeaturedArticle } from "@/lib/content";
import MainLayout from "@/components/MainLayout";
import {
  FeedEssayFeatured,
  FeedEssay,
  FeedSignal,
  FeedFragment,
  StreamDivider,
} from "@/components/FeedItem";

// ─── All signals — main stream and sidebar ────────────────────────────────────
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

export default function HomePage() {
  const featured = getFeaturedArticle();
  const allArticles = getAllArticles();
  const rest = allArticles.filter((a) => a.slug !== featured?.slug);

  // Weave articles and signals into a single stream
  // Pattern: featured → signal → essay → fragment → signal → essay → ...
  type StreamItem =
    | { kind: "essay"; article: typeof rest[0] }
    | { kind: "signal"; signal: typeof MAIN_SIGNALS[0] }
    | { kind: "fragment"; text: string }
    | { kind: "divider"; label: string };

  const stream: StreamItem[] = [];

  if (rest.length > 0) {
    stream.push({ kind: "signal", signal: MAIN_SIGNALS[0] });
    stream.push({ kind: "essay", article: rest[0] });
    stream.push({ kind: "fragment", text: FRAGMENTS[0] });
    stream.push({ kind: "signal", signal: MAIN_SIGNALS[1] });
  }

  if (rest.length > 1) {
    stream.push({ kind: "divider", label: "Further Reading" });
    stream.push({ kind: "essay", article: rest[1] });
    stream.push({ kind: "signal", signal: MAIN_SIGNALS[2] });
    stream.push({ kind: "fragment", text: FRAGMENTS[1] });
  }

  if (rest.length > 2) {
    stream.push({ kind: "signal", signal: MAIN_SIGNALS[3] });
    stream.push({ kind: "essay", article: rest[2] });
    stream.push({ kind: "fragment", text: FRAGMENTS[2] });
    stream.push({ kind: "signal", signal: MAIN_SIGNALS[4] });
  }

  // Append any remaining articles
  rest.slice(3).forEach((article, i) => {
    stream.push({ kind: "essay", article });
    if (FRAGMENTS[i + 3]) {
      stream.push({ kind: "fragment", text: FRAGMENTS[i + 3] });
    }
  });

  return (
    <MainLayout>
      <div className="stream-layout">
        {/* ── Main column ───────────────────────────────────────────────── */}
        <div className="stream-main">
          {/* Masthead */}
          <div className="masthead">
            <span className="masthead-label">
              INTELLIGENCE STREAM · UPDATED CONTINUOUSLY
            </span>
            <p className="masthead-descriptor">
              AI cognition · internet culture · digital behavior · power
              structures · cognitive inequality · online identity
            </p>
          </div>

          {/* Featured essay */}
          {featured && <FeedEssayFeatured article={featured} />}

          {/* Woven stream */}
          {stream.map((item, i) => {
            if (item.kind === "essay")
              return <FeedEssay key={i} article={item.article} />;
            if (item.kind === "signal")
              return (
                <FeedSignal
                  key={i}
                  text={item.signal.text}
                  category={item.signal.category}
                />
              );
            if (item.kind === "fragment")
              return <FeedFragment key={i} text={item.text} />;
            if (item.kind === "divider")
              return <StreamDivider key={i} label={item.label} />;
            return null;
          })}

          {/* Stream tail */}
          <div
            style={{
              padding: "2.5rem 0",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div className="stream-divider-line" />
            <span
              style={{
                fontFamily:
                  'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1a1816",
              }}
            >
              End of current stream
            </span>
            <div className="stream-divider-line" />
          </div>
        </div>

        {/* ── Side column — faster-moving signal feed ───────────────────── */}
        <aside className="stream-side">
          <div className="side-header">
            <span className="side-header-label">SIGNALS ·&nbsp;</span>
            <span
              style={{
                fontFamily:
                  'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
                fontSize: "0.58rem",
                color: "#1a1816",
                letterSpacing: "0.1em",
              }}
            >
              Observations &amp; fragments
            </span>
          </div>

          {SIDEBAR_SIGNALS.map((sig) => (
            <div key={sig.id} className="side-signal">
              <p className="side-signal-text">{sig.text}</p>
              <div className="side-signal-meta">
                <span>{sig.meta}</span>
              </div>
            </div>
          ))}

          {/* Platform statement — very minimal */}
          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid #0d0d0d",
            }}
          >
            <p
              style={{
                fontFamily:
                  'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1e1c1a",
                marginBottom: "0.75rem",
              }}
            >
              About
            </p>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "0.78rem",
                color: "#2e2c2a",
                lineHeight: 1.65,
              }}
            >
              Documenting the AI transition era — not from a corporate lens,
              but from a human one.
            </p>
          </div>
        </aside>
      </div>
    </MainLayout>
  );
}
