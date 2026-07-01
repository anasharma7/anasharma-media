import { getAllArticles, getFeaturedArticle } from "@/lib/content";
import { Signal } from "@/types/content";
import MainLayout from "@/components/MainLayout";
import FeaturedHero from "@/components/FeaturedHero";
import ArticleCard from "@/components/ArticleCard";
import SignalsFeed from "@/components/SignalsFeed";
import Link from "next/link";

// Static signals data — will eventually be CMS-driven
const SIGNALS: Signal[] = [
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
];

export default function HomePage() {
  const featured = getFeaturedArticle();
  const allArticles = getAllArticles();
  const nonFeatured = allArticles.filter(
    (a) => a.slug !== featured?.slug
  );
  const recentArticles = nonFeatured.slice(0, 6);

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Hero masthead */}
        <div
          style={{
            padding: "2rem 0 0",
            borderBottom: "1px solid #1a1a1a",
            marginBottom: "0",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#3a3836",
              marginBottom: "0.5rem",
            }}
          >
            anasharma.com
          </p>
          <h2
            style={{
              fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
              color: "#5c5a56",
              fontWeight: 400,
              letterSpacing: "0.04em",
              lineHeight: 1.5,
              maxWidth: "60ch",
              paddingBottom: "1.5rem",
            }}
          >
            On AI, internet culture, digital behavior, cognitive inequality,
            and the emotional architecture of online life.
          </h2>
        </div>

        {/* Featured Essay */}
        {featured && <FeaturedHero article={featured} />}

        {/* Main grid: articles + signals */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "3rem",
            padding: "3rem 0",
            alignItems: "start",
          }}
        >
          {/* Left: article grid */}
          <div>
            {recentArticles.length > 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.25rem",
                    paddingBottom: "0.75rem",
                    borderBottom: "1px solid #1a1a1a",
                  }}
                >
                  <span className="section-label">Recent Essays</span>
                  <Link
                    href="/essays"
                    style={{
                      fontSize: "0.7rem",
                      color: "#5c5a56",
                      textDecoration: "none",
                      letterSpacing: "0.06em",
                    }}
                  >
                    All essays →
                  </Link>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "1px",
                    backgroundColor: "#141414",
                    border: "1px solid #141414",
                  }}
                >
                  {recentArticles.map((article) => (
                    <div
                      key={article.slug}
                      style={{ backgroundColor: "#080808" }}
                    >
                      <ArticleCard article={article} variant="default" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div
                style={{
                  padding: "3rem",
                  border: "1px solid #1a1a1a",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#5c5a56",
                    marginBottom: "0.5rem",
                  }}
                >
                  Essays coming soon.
                </p>
                <p style={{ fontSize: "0.75rem", color: "#3a3836" }}>
                  The first pieces are in draft.
                </p>
              </div>
            )}
          </div>

          {/* Right: signals sidebar */}
          <aside
            style={{
              position: "sticky",
              top: "80px",
            }}
          >
            <SignalsFeed signals={SIGNALS} />
            <div
              style={{
                marginTop: "2rem",
                padding: "1.25rem",
                border: "1px solid #1a1a1a",
                backgroundColor: "#0a0a0a",
              }}
            >
              <p
                className="section-label"
                style={{ marginBottom: "0.75rem" }}
              >
                About this Platform
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#5c5a56",
                  lineHeight: 1.65,
                  marginBottom: "1rem",
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                Documenting what it feels like to live through the AI transition
                era — not from a corporate lens, but from a human one.
              </p>
              <Link
                href="/about"
                style={{
                  fontSize: "0.7rem",
                  color: "#c8a96e",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                }}
              >
                Learn more →
              </Link>
            </div>
          </aside>
        </div>

        {/* Bottom divider line */}
        <div
          style={{
            borderTop: "1px solid #1a1a1a",
            padding: "1.5rem 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "0.65rem", color: "#2a2826", letterSpacing: "0.1em" }}>
            AI · INTERNET CULTURE · DIGITAL BEHAVIOR · COGNITIVE INEQUALITY · IDENTITY
          </p>
          <p style={{ fontSize: "0.65rem", color: "#2a2826" }}>
            est. 2025
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
