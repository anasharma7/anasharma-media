import Link from "next/link";
import { Article } from "@/types/content";
import { CATEGORY_LABELS } from "@/types/content";
import { formatDate } from "@/lib/utils";

interface FeaturedHeroProps {
  article: Article;
}

export default function FeaturedHero({ article }: FeaturedHeroProps) {
  return (
    <Link
      href={`/essays/${article.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        style={{
          padding: "3rem 0 2.5rem",
          borderBottom: "1px solid #1a1a1a",
          cursor: "pointer",
        }}
        className="featured-hero"
      >
        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.25rem",
          }}
        >
          <span className="section-label">Featured Essay</span>
          <span
            style={{
              display: "block",
              height: "1px",
              width: "2rem",
              backgroundColor: "#c8a96e",
              opacity: 0.5,
            }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "#e8e6e1",
            maxWidth: "20ch",
            marginBottom: "1.25rem",
            transition: "color 0.15s",
          }}
          className="hero-title"
        >
          {article.title}
        </h1>

        {/* Excerpt */}
        <p
          style={{
            fontSize: "1.05rem",
            color: "#6e6c68",
            lineHeight: 1.65,
            maxWidth: "55ch",
            marginBottom: "1.5rem",
            fontFamily: "Georgia, serif",
          }}
        >
          {article.excerpt}
        </p>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <span className="category-pill category-pill-accent">
            {CATEGORY_LABELS[article.category]}
          </span>
          <span style={{ fontSize: "0.75rem", color: "#3a3836" }}>
            {formatDate(article.date)}
          </span>
          <span style={{ fontSize: "0.75rem", color: "#3a3836" }}>
            {article.readingTime}
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              color: "#c8a96e",
              marginLeft: "auto",
              letterSpacing: "0.05em",
            }}
          >
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}
