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
          maxWidth: "800px",
          margin: "0 auto",
          padding: "3.5rem 1.5rem 5rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "3.5rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid #1a1a1a",
          }}
        >
          <span
            className="section-label"
            style={{ display: "block", marginBottom: "1rem" }}
          >
            About
          </span>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#e8e6e1",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            On this platform
          </h1>
        </div>

        {/* Body */}
        <div className="prose-editorial">
          <p>
            We are living through a transition unlike anything before it. Not a
            technological shift — those happen all the time — but a cognitive
            one. Artificial intelligence isn&apos;t just changing what we do.
            It&apos;s changing how we think, what we trust, how we relate to each
            other, and how we understand ourselves.
          </p>

          <p>
            This platform is my attempt to document that transition honestly.
            Not from a corporate perspective. Not as a product review site or an
            optimism machine for venture capital. Not as a doomscrolling panic
            loop. But as a human being trying to make sense of what&apos;s
            happening, in real time, with some rigor and a lot of genuine
            curiosity.
          </p>

          <h2>What this is</h2>

          <p>
            Essays. Observations. Signals from the edges of culture. Cultural
            analysis. Uncomfortable questions asked in plain language. Writing
            that tries to do what good journalism does — locate the human being
            inside the systemic change.
          </p>

          <p>
            The topics this platform orbits: AI and cognition, internet culture,
            digital behavior, cognitive inequality, identity in online spaces,
            the emotional life of the networked individual, power structures
            being built and dismantled by technology, and what all of it feels
            like from the inside.
          </p>

          <h2>What this is not</h2>

          <p>
            A tech blog. A startup newsletter. A Twitter thread turned into
            prose. A place that publishes takes timed to the news cycle. A place
            that performs objectivity while having none. A place that sells you
            a course.
          </p>

          <h2>The editorial stance</h2>

          <p>
            Honest. Curious. Critical without being cynical. Deeply concerned
            with what technology does to human beings rather than what human
            beings can do with technology. Interested in power without being
            conspiratorial. Interested in the individual without being
            solipsistic.
          </p>

          <p>
            I care about writing that respects the reader — that assumes
            intelligence, doesn&apos;t explain itself to death, and isn&apos;t
            afraid to sit inside uncertainty without forcing resolution.
          </p>

          <blockquote>
            Documenting what it feels like to live through the AI transition
            era. Not from a corporation&apos;s lens. From a human one.
          </blockquote>

          <h2>Future directions</h2>

          <p>
            This is a foundation. What it will eventually expand into: longer
            investigative essays, interviews with people living on the edges of
            the technological transition, curated research digests, audio, and
            eventually interactive pieces that use AI to explore questions about
            AI. The irony is intentional.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
