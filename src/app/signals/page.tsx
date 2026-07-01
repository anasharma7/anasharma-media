import MainLayout from "@/components/MainLayout";
import SignalsFeed from "@/components/SignalsFeed";
import { Signal } from "@/types/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signals",
  description:
    "Observations, fragments, and noticed patterns from the edge of the AI transition.",
};

const ALL_SIGNALS: Signal[] = [
  {
    id: "s1",
    text: "People aren't losing jobs to AI. They're losing their sense of authorship — the quiet ownership of thought. That's the subtler theft.",
    category: "ai-cognition",
    date: "2025-07-01",
  },
  {
    id: "s2",
    text: "Every platform that rewarded outrage over accuracy has built the neural scaffolding for believing AI-generated content at face value.",
    source: "Observation",
    category: "internet-culture",
    date: "2025-06-30",
  },
  {
    id: "s3",
    text: "The new cognitive divide isn't between those who use AI and those who don't — it's between those who know how to question it and those who don't.",
    category: "digital-behavior",
    date: "2025-06-28",
  },
  {
    id: "s4",
    text: "Online grief now happens in broadcast mode. The internet taught us to perform our pain publicly long before we understood what that would cost us.",
    category: "identity",
    date: "2025-06-26",
  },
  {
    id: "s5",
    text: "Attention is now a resource extracted at scale. The next generation of monopolies will be built not on data, but on directed thought.",
    category: "power-structures",
    date: "2025-06-24",
  },
  {
    id: "s6",
    text: "The most dangerous thing about AI isn't that it will replace us. It's that it will validate us — endlessly, uncritically — until we forget what it feels like to be challenged.",
    category: "ai-cognition",
    date: "2025-06-22",
  },
  {
    id: "s7",
    text: "We built the surveillance state one 'I agree' button at a time. We are building the compliance engine one 'This was helpful' thumb at a time.",
    category: "power-structures",
    date: "2025-06-20",
  },
  {
    id: "s8",
    text: "Nobody talks about the loneliness of watching your industry be automated in real time while being expected to be grateful for the efficiency gains.",
    category: "digital-behavior",
    date: "2025-06-18",
  },
  {
    id: "s9",
    text: "Internet identity is now more stable than embodied identity for many people. This is not a metaphor. It has legal, psychological, and social consequences we haven't started reckoning with.",
    category: "identity",
    date: "2025-06-16",
  },
  {
    id: "s10",
    text: "The algorithm isn't radicalizing people toward any ideology in particular. It's radicalizing them toward certainty. That's scarier.",
    category: "internet-culture",
    date: "2025-06-14",
  },
];

export default function SignalsPage() {
  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "3rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid #1a1a1a",
          }}
        >
          <span
            className="section-label"
            style={{ display: "block", marginBottom: "1rem" }}
          >
            Signals
          </span>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#e8e6e1",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            Observed patterns
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#5c5a56",
              maxWidth: "55ch",
              lineHeight: 1.65,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            Short observations, fragments, and noticed patterns from the edges
            of the AI transition. Things too small for an essay, too important
            to ignore.
          </p>
        </div>

        <SignalsFeed signals={ALL_SIGNALS} />
      </div>
    </MainLayout>
  );
}
