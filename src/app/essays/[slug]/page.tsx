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
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: "article", publishedTime: article.date },
  };
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.status !== "published") notFound();

  return (
    <MainLayout>
      <article>
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="article-header">
            {/* Breadcrumb */}
            <nav style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <Link href="/" className="article-crumb">Home</Link>
              <span className="article-crumb" style={{ cursor: "default" }}>›</span>
              <Link href="/essays" className="article-crumb">Essays</Link>
              <span className="article-crumb" style={{ cursor: "default" }}>›</span>
              <span className="article-crumb">{article.title.slice(0, 32)}…</span>
            </nav>

            {/* Category */}
            <div style={{ marginBottom: "1.25rem" }}>
              <span className={`tag ${article.featured ? "tag-featured" : "tag-essay"}`}>
                {CATEGORY_LABELS[article.category]}
              </span>
            </div>

            {/* Title */}
            <h1 className="article-title-display" style={{ marginBottom: "1.25rem" }}>
              {article.title}
            </h1>

            {/* Lede */}
            <p className="article-lede" style={{ marginBottom: 0 }}>{article.excerpt}</p>

            {/* Meta */}
            <div className="article-meta-bar">
              {article.author && <span className="stamp" style={{ color: "#3a3836" }}>{article.author}</span>}
              <span className="stamp">{formatDate(article.date)}</span>
              <span className="stamp">{article.readingTime}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ maxWidth: "720px", padding: "3.5rem 0 5rem" }}>
            <div className="prose-editorial">
              <MDXRemote source={article.content} />
            </div>

            {/* Footer */}
            <div
              style={{
                marginTop: "4rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.03)",
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
                  fontFamily: 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, monospace',
                  fontSize: "0.6rem",
                  color: "#2e2c28",
                  textDecoration: "none",
                  letterSpacing: "0.08em",
                  transition: "color 0.12s",
                }}
              >
                ← Back to Essays
              </Link>
              {article.tags && article.tags.length > 0 && (
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {article.tags.map((tag) => (
                    <span key={tag} className="tag tag-essay">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </MainLayout>
  );
}
