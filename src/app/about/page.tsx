import MainLayout from "@/components/MainLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ana Sharma and this platform — a space for documenting the AI transition through human eyes.",
};

export default function AboutPage() {
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
            padding: "2rem 0 2rem",
            borderBottom: "1px solid #0f0f0f",
          }}
        >
          <span
            style={{
              fontFamily:
                'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
              fontSize: "0.58rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#1e1c1a",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            About this platform
          </span>
          <h1 className="article-title-display">On this platform</h1>
        </div>

        {/* Body */}
        <div style={{ maxWidth: "720px", padding: "3rem 0 5rem" }}>
          <div className="prose-editorial">
            <p>
              We are living through a transition unlike anything before it. Not
              a technological shift — those happen all the time — but a
              cognitive one. Artificial intelligence isn&apos;t just changing
              what we do. It&apos;s changing how we think, what we trust, how we
              relate to each other, and how we understand ourselves.
            </p>

            <p>
              This platform is my attempt to document that transition honestly.
              Not from a corporate perspective. Not as a product review site or
              an optimism machine for venture capital. Not as a doomscrolling
              panic loop. But as a human being trying to make sense of what&apos;s
              happening, in real time, with some rigor and genuine curiosity.
            </p>

            <h2>What this is</h2>

            <p>
              Essays. Observations. Signals from the edges of culture. Writing
              that tries to do what good journalism does — locate the human
              being inside the systemic change.
            </p>

            <p>
              The topics this platform orbits: AI and cognition, internet
              culture, digital behavior, cognitive inequality, identity in
              online spaces, the emotional life of the networked individual,
              power structures being built and dismantled by technology, and
              what all of it feels like from the inside.
            </p>

            <h2>What this is not</h2>

            <p>
              A tech blog. A startup newsletter. A place that publishes takes
              timed to the news cycle. A place that performs objectivity while
              having none. A place that sells you a course.
            </p>

            <h2>The editorial stance</h2>

            <p>
              Honest. Curious. Critical without being cynical. Deeply concerned
              with what technology does to human beings rather than what human
              beings can do with technology. Interested in power without being
              conspiratorial. Interested in the individual without being
              solipsistic.
            </p>

            <blockquote>
              Documenting what it feels like to live through the AI transition
              era. Not from a corporation&apos;s lens. From a human one.
            </blockquote>

            <h2>Future directions</h2>

            <p>
              This is a foundation. What it will eventually expand into: longer
              investigative essays, interviews, curated research digests, audio,
              and interactive pieces that use AI to explore questions about AI.
              The irony is intentional.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
