import Link from "next/link";
import { Article } from "@/types/content";
import { CATEGORY_LABELS } from "@/types/content";
import { formatDateShort } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "horizontal";
}

export default function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/essays/${article.slug}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <article
          className="article-card"
          style={{
            padding: "1rem 0",
            borderBottom: "1px solid #141414",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "1rem",
            }}
          >
            <p
              className="article-title"
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#c8c4bc",
                lineHeight: 1.4,
                transition: "color 0.15s",
              }}
            >
              {article.title}
            </p>
            <span
              style={{
                fontSize: "0.7rem",
                color: "#3c3a36",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {formatDateShort(article.date)}
            </span>
          </div>
          <span className="category-pill" style={{ marginTop: "0.4rem" }}>
            {CATEGORY_LABELS[article.category]}
          </span>
        </article>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/essays/${article.slug}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <article
          className="article-card"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "1.5rem",
            padding: "1.5rem",
            border: "1px solid #1a1a1a",
            backgroundColor: "#0a0a0a",
            alignItems: "start",
          }}
        >
          <div>
            <span className="category-pill category-pill-accent" style={{ marginBottom: "0.6rem" }}>
              {CATEGORY_LABELS[article.category]}
            </span>
            <h3
              className="article-title"
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#e8e6e1",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
                transition: "color 0.15s",
              }}
            >
              {article.title}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6e6c68",
                lineHeight: 1.6,
              }}
            >
              {article.excerpt}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "0.25rem",
              minWidth: "100px",
            }}
          >
            <span style={{ fontSize: "0.7rem", color: "#3c3a36" }}>
              {formatDateShort(article.date)}
            </span>
            <span style={{ fontSize: "0.7rem", color: "#3c3a36" }}>
              {article.readingTime}
            </span>
          </div>
        </article>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      href={`/essays/${article.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <article
        className="article-card"
        style={{
          padding: "1.5rem",
          border: "1px solid #1a1a1a",
          backgroundColor: "#0a0a0a",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "0.75rem" }}>
          <span className="category-pill category-pill-accent">
            {CATEGORY_LABELS[article.category]}
          </span>
        </div>
        <h3
          className="article-title"
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "#e0ddd6",
            lineHeight: 1.35,
            letterSpacing: "-0.015em",
            marginBottom: "0.6rem",
            transition: "color 0.15s",
            flexGrow: 1,
          }}
        >
          {article.title}
        </h3>
        <p
          style={{
            fontSize: "0.8rem",
            color: "#5c5a56",
            lineHeight: 1.55,
            marginBottom: "1rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          {article.excerpt}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #141414",
            paddingTop: "0.75rem",
            marginTop: "auto",
          }}
        >
          <span style={{ fontSize: "0.7rem", color: "#3a3836" }}>
            {formatDateShort(article.date)}
          </span>
          <span style={{ fontSize: "0.7rem", color: "#3a3836" }}>
            {article.readingTime}
          </span>
        </div>
      </article>
    </Link>
  );
}
