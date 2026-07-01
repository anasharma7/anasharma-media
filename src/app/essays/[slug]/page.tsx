import { getAllArticleSlugs, getArticleBySlug } from "@/lib/content";
import { CATEGORY_LABELS } from "@/types/content";
import { formatDate } from "@/lib/utils";
import MainLayout from "@/components/MainLayout";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.status !== "published") {
    notFound();
  }

  return (
    <MainLayout>
      <article>
        {/* Article header */}
        <div
          style={{
            borderBottom: "1px solid #1a1a1a",
            backgroundColor: "#080808",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "3.5rem 1.5rem 2.5rem",
            }}
          >
            {/* Breadcrumb */}
            <nav
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <Link
                href="/"
                style={{
                  fontSize: "0.7rem",
                  color: "#3a3836",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                }}
              >
                Home
              </Link>
              <span style={{ fontSize: "0.7rem", color: "#2a2826" }}>›</span>
              <Link
                href="/essays"
                style={{
                  fontSize: "0.7rem",
                  color: "#3a3836",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                }}
              >
                Essays
              </Link>
              <span style={{ fontSize: "0.7rem", color: "#2a2826" }}>›</span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#5c5a56",
                  letterSpacing: "0.06em",
                }}
              >
                {article.title.slice(0, 30)}…
              </span>
            </nav>

            {/* Category */}
            <div style={{ marginBottom: "1rem" }}>
              <span className="category-pill category-pill-accent">
                {CATEGORY_LABELS[article.category]}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                color: "#e8e6e1",
                marginBottom: "1.25rem",
              }}
            >
              {article.title}
            </h1>

            {/* Excerpt / lede */}
            <p
              style={{
                fontSize: "1.15rem",
                color: "#6e6c68",
                lineHeight: 1.65,
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                maxWidth: "55ch",
                marginBottom: "1.75rem",
              }}
            >
              {article.excerpt}
            </p>

            {/* Meta bar */}
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                alignItems: "center",
                flexWrap: "wrap",
                paddingTop: "1rem",
                borderTop: "1px solid #1a1a1a",
              }}
            >
              {article.author && (
                <span style={{ fontSize: "0.75rem", color: "#5c5a56" }}>
                  By {article.author}
                </span>
              )}
              <span style={{ fontSize: "0.75rem", color: "#3a3836" }}>
                {formatDate(article.date)}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#3a3836" }}>
                {article.readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "3.5rem 1.5rem 5rem",
          }}
        >
          <div className="prose-editorial">
            <MDXRemote source={article.content} />
          </div>

          {/* Article footer */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid #1a1a1a",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Link
              href="/essays"
              style={{
                fontSize: "0.75rem",
                color: "#5c5a56",
                textDecoration: "none",
                letterSpacing: "0.06em",
              }}
            >
              ← Back to Essays
            </Link>
            {article.tags && article.tags.length > 0 && (
              <div
                style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
              >
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="category-pill"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </MainLayout>
  );
}
