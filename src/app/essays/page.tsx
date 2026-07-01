import { getAllArticles } from "@/lib/content";
import { CATEGORY_LABELS } from "@/types/content";
import MainLayout from "@/components/MainLayout";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essays",
  description:
    "Long-form writing on AI, internet culture, digital behavior, and the emotional architecture of online life.",
};

export default function EssaysPage() {
  const articles = getAllArticles();

  return (
    <MainLayout>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div
          style={{
            padding: "2rem 0 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "end",
            gap: "2rem",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
                fontSize: "0.56rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#1a1814",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              All Essays
            </span>
            <h1
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#ccc8c0",
                lineHeight: 1.1,
              }}
            >
              Long-form writing
            </h1>
          </div>
          <span className="stamp">{articles.length} essays</span>
        </div>

        {/* Essay list */}
        <div>
          {articles.length === 0 ? (
            <div style={{ padding: "4rem 0", textAlign: "center" }}>
              <p className="stamp" style={{ letterSpacing: "0.1em" }}>Essays are being written.</p>
            </div>
          ) : (
            articles.map((article) => (
              <Link
                key={article.slug}
                href={`/essays/${article.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div className="essays-row">
                  <div>
                    <p className="essays-row-title">{article.title}</p>
                    <p className="essays-row-excerpt">{article.excerpt}</p>
                    <div style={{ display: "flex", gap: "0.65rem", marginTop: "0.55rem", alignItems: "center" }}>
                      <span className={`tag ${article.featured ? "tag-featured" : "tag-essay"}`}>
                        {CATEGORY_LABELS[article.category]}
                      </span>
                      <span className="stamp">{article.readingTime}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem", minWidth: "90px" }}>
                    <span className="stamp">{formatDateShort(article.date)}</span>
                    {article.featured && <span className="tag tag-featured">Featured</span>}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
