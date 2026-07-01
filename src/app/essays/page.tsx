import { getAllArticles } from "@/lib/content";
import { CATEGORY_LABELS, Category } from "@/types/content";
import MainLayout from "@/components/MainLayout";
import ArticleCard from "@/components/ArticleCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essays",
  description:
    "Long-form writing on AI, internet culture, digital behavior, and the emotional architecture of online life.",
};

export default function EssaysPage() {
  const articles = getAllArticles();

  const byCategory = articles.reduce(
    (acc, article) => {
      if (!acc[article.category]) acc[article.category] = [];
      acc[article.category].push(article);
      return acc;
    },
    {} as Record<string, typeof articles>
  );

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
        }}
      >
        {/* Page header */}
        <div
          style={{
            marginBottom: "3rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid #1a1a1a",
          }}
        >
          <span className="section-label" style={{ display: "block", marginBottom: "1rem" }}>
            Essays
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
            Long-form writing
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
            Essays on AI cognition, internet culture, digital behavior, power
            structures, and what it means to live an online life.
          </p>
        </div>

        {articles.length === 0 ? (
          <div
            style={{
              padding: "4rem",
              border: "1px solid #1a1a1a",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "0.875rem", color: "#5c5a56" }}>
              Essays are being written. Check back soon.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1px",
              backgroundColor: "#141414",
              border: "1px solid #141414",
            }}
          >
            {articles.map((article) => (
              <div
                key={article.slug}
                style={{ backgroundColor: "#080808" }}
              >
                <ArticleCard article={article} variant="default" />
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
