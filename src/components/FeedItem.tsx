import Link from "next/link";
import { Article } from "@/types/content";
import { CATEGORY_LABELS } from "@/types/content";
import { formatDateShort } from "@/lib/utils";

// ─── Shared meta row ─────────────────────────────────────────────────────────
function MetaRow({ article }: { article: Article }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
      <span className="type-tag type-tag-essay">{CATEGORY_LABELS[article.category]}</span>
      <span className="date-stamp">{formatDateShort(article.date)}</span>
      <span className="date-stamp">{article.readingTime}</span>
      <span className="read-arrow">→</span>
    </div>
  );
}

// ─── Featured essay ───────────────────────────────────────────────────────────
export function FeedEssayFeatured({ article }: { article: Article }) {
  return (
    <Link href={`/essays/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article className="feed-essay feed-essay-featured">
        <div className="feed-essay-eyebrow">
          <span className="type-tag type-tag-featured">Featured Essay</span>
          <span className="date-stamp">{formatDateShort(article.date)}</span>
        </div>
        <h1 className="feed-essay-title">{article.title}</h1>
        <p className="feed-essay-excerpt">{article.excerpt}</p>
        <MetaRow article={article} />
      </article>
    </Link>
  );
}

// ─── Standard essay ───────────────────────────────────────────────────────────
export function FeedEssay({ article }: { article: Article }) {
  return (
    <Link href={`/essays/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article className="feed-essay">
        <div className="feed-essay-eyebrow">
          <span className="type-tag type-tag-essay">{CATEGORY_LABELS[article.category]}</span>
          <span className="date-stamp">{formatDateShort(article.date)}</span>
        </div>
        <h2 className="feed-essay-title">{article.title}</h2>
        <p className="feed-essay-excerpt">{article.excerpt}</p>
        <span className="read-arrow">→</span>
      </article>
    </Link>
  );
}

// ─── Ambient signal — the animated left-bar version ──────────────────────────
export function FeedSignal({ text, category }: { text: string; category?: string }) {
  return (
    <div className="feed-signal">
      <div className="feed-signal-bar" />
      <p className="feed-signal-text">{text}</p>
      {category && (
        <div className="feed-signal-meta">
          <span className="type-tag type-tag-signal">{category}</span>
        </div>
      )}
    </div>
  );
}

// ─── Monospace fragment ───────────────────────────────────────────────────────
export function FeedFragment({ text }: { text: string }) {
  return (
    <div className="feed-fragment">
      <p className="feed-fragment-text">// {text}</p>
    </div>
  );
}

// ─── External link / news item ────────────────────────────────────────────────
export function FeedLink({
  title,
  source,
  href,
  category,
}: {
  title: string;
  source: string;
  href: string;
  category?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
      <div className="feed-link">
        <div>
          {category && (
            <span className="type-tag type-tag-link" style={{ display: "block", marginBottom: "0.3rem" }}>
              {category}
            </span>
          )}
          <p className="feed-link-title">{title}</p>
        </div>
        <span className="feed-link-source">{source}</span>
      </div>
    </a>
  );
}

// ─── Stream section divider ───────────────────────────────────────────────────
export function StreamDivider({ label }: { label: string }) {
  return (
    <div className="stream-divider">
      <span className="stream-divider-label">{label}</span>
      <div className="stream-divider-line" />
    </div>
  );
}

// ─── Dispatch band item (dense headline grid) ─────────────────────────────────
export function DispatchItem({
  title,
  category,
  source,
  href,
}: {
  title: string;
  category: string;
  source: string;
  href?: string;
}) {
  const inner = (
    <div className="dispatch-item-inner">
      <p className="dispatch-item-category">{category}</p>
      <p className="dispatch-item-title">{title}</p>
      <p className="dispatch-item-source">{source}</p>
    </div>
  );

  if (href) {
    return (
      <div className="dispatch-item">
        <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
          {inner}
        </a>
      </div>
    );
  }

  return <div className="dispatch-item">{inner}</div>;
}
