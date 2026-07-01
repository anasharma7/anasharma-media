import MainLayout from "@/components/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signals",
  description:
    "Observations, fragments, and noticed patterns from the edge of the AI transition.",
};

const ALL_SIGNALS = [
  {
    id: "s1",
    text: "People aren't losing jobs to AI. They're losing their sense of authorship — the quiet ownership of thought. That's the subtler theft.",
    category: "AI & COGNITION",
    date: "2025-07-01",
  },
  {
    id: "s2",
    text: "Every platform that rewarded outrage over accuracy has built the neural scaffolding for believing AI-generated content at face value.",
    category: "INTERNET CULTURE",
    date: "2025-06-30",
  },
  {
    id: "s3",
    text: "The new cognitive divide isn't between those who use AI and those who don't — it's between those who know how to question it and those who don't.",
    category: "DIGITAL BEHAVIOR",
    date: "2025-06-28",
  },
  {
    id: "s4",
    text: "Online grief now happens in broadcast mode. The internet taught us to perform our pain publicly long before we understood what that would cost us.",
    category: "IDENTITY",
    date: "2025-06-26",
  },
  {
    id: "s5",
    text: "Attention is now a resource extracted at scale. The next generation of monopolies will be built not on data, but on directed thought.",
    category: "POWER",
    date: "2025-06-24",
  },
  {
    id: "s6",
    text: "The most dangerous thing about AI isn't that it will replace us. It's that it will validate us — endlessly, uncritically — until we forget what it feels like to be challenged.",
    category: "AI & COGNITION",
    date: "2025-06-22",
  },
  {
    id: "s7",
    text: "We built the surveillance state one 'I agree' button at a time. We are building the compliance engine one 'This was helpful' thumb at a time.",
    category: "POWER",
    date: "2025-06-20",
  },
  {
    id: "s8",
    text: "Nobody talks about the loneliness of watching your industry be automated in real time while being expected to be grateful for the efficiency gains.",
    category: "DIGITAL BEHAVIOR",
    date: "2025-06-18",
  },
  {
    id: "s9",
    text: "Internet identity is now more stable than embodied identity for many people. This is not a metaphor. It has legal, psychological, and social consequences we haven't started reckoning with.",
    category: "IDENTITY",
    date: "2025-06-16",
  },
  {
    id: "s10",
    text: "The algorithm isn't radicalizing people toward any ideology in particular. It's radicalizing them toward certainty. That's scarier.",
    category: "INTERNET CULTURE",
    date: "2025-06-14",
  },
  {
    id: "s11",
    text: "AI companions exist because we built an internet that is extremely good at making people feel watched and extremely bad at making them feel seen.",
    category: "AI & COGNITION",
    date: "2025-06-12",
  },
  {
    id: "s12",
    text: "The real filter bubble isn't political — it's epistemic. It doesn't just filter what you believe. It filters what kinds of evidence you're capable of accepting.",
    category: "DIGITAL BEHAVIOR",
    date: "2025-06-10",
  },
];

export default function SignalsPage() {
  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 1.25rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "2rem 0 1.5rem",
            borderBottom: "1px solid #0f0f0f",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "end",
            gap: "2rem",
          }}
        >
          <div>
            <span
              style={{
                fontFamily:
                  'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#1e1c1a",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Signal Log
            </span>
            <h1
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#dedad3",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              Observed patterns
            </h1>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "0.85rem",
                color: "#2e2c2a",
                lineHeight: 1.6,
                maxWidth: "55ch",
              }}
            >
              Fragments, observations, and noticed patterns. Things too small for an
              essay, too important to ignore.
            </p>
          </div>
          <span
            style={{
              fontFamily:
                'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
              fontSize: "0.62rem",
              color: "#2e2c2a",
              letterSpacing: "0.06em",
            }}
          >
            {ALL_SIGNALS.length} signals
          </span>
        </div>

        {/* Signal list */}
        <div
          style={{
            maxWidth: "720px",
          }}
        >
          {ALL_SIGNALS.map((signal, i) => (
            <div
              key={signal.id}
              style={{
                padding: "1.5rem 0",
                borderBottom: "1px solid #0d0d0d",
              }}
            >
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  color: "#6a6660",
                  paddingLeft: "1.25rem",
                  borderLeft: "1px solid #1a1a1a",
                  marginBottom: "0.5rem",
                }}
              >
                {signal.text}
              </p>
              <div
                style={{
                  paddingLeft: "1.25rem",
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "center",
                }}
              >
                <span className="type-tag">{signal.category}</span>
                <span className="date-stamp">{signal.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
