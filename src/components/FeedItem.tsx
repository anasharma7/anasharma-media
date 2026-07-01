import Link from "next/link";
import { Article } from "@/types/content";
import { CATEGORY_LABELS } from "@/types/content";
import { formatDateShort } from "@/lib/utils";

// ─── Shared meta row ─────────────────────────────────────────────────────────
function MetaRow({
  article,
  showArrow = true,
}: {
  article: Article;
  showArrow?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
      }}
    >
      <span className="type-tag type-tag-essay">
        {CATEGORY_LABELS[article.category]}
      </span>
      <span className="date-stamp">{formatDateShort(article.date)}</span>
      <span className="date-stamp">{article.readingTime}</span>
      {showArrow && <span className="read-arrow">→</span>}
    </div>
  );
}

// ─── Featured essay — top of main column, largest treatment ──────────────────
export function FeedEssayFeatured({ article }: { article: Article }) {
  return (
    <Link href={`/essays/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article className="feed-essay feed-essay-featured">
        <div className="feed-essay-eyebrow">
          <span className="type-tag type-tag-featured">Featured</span>
          <span className="date-stamp">{formatDateShort(article.date)}</span>
        </div>
        <h1 className="feed-essay-title">{article.title}</h1>
        <p className="feed-essay-excerpt">{article.excerpt}</p>
        <MetaRow article={article} showArrow={true} />
      </article>
    </Link>
  );
}

// ─── Standard essay item ──────────────────────────────────────────────────────
export function FeedEssay({ article }: { article: Article }) {
  return (
    <Link href={`/essays/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article className="feed-essay">
        <div className="feed-essay-eyebrow">
          <span className="type-tag type-tag-essay">
            {CATEGORY_LABELS[article.category]}
          </span>
          <span className="date-stamp">{formatDateShort(article.date)}</span>
        </div>
        <h2 className="feed-essay-title">{article.title}</h2>
        <p className="feed-essay-excerpt">{article.excerpt}</p>
        <span className="read-arrow">→</span>
      </article>
    </Link>
  );
}

// ─── Inline signal — observation woven into main stream ───────────────────────
export function FeedSignal({
  text,
  category,
}: {
  text: string;
  category?: string;
}) {
  return (
    <div className="feed-signal">
      <p className="feed-signal-text">{text}</p>
      {category && (
        <div style={{ paddingLeft: "1rem", marginTop: "0.4rem" }}>
          <span className="type-tag type-tag-signal">{category}</span>
        </div>
      )}
    </div>
  );
}

// ─── Fragment — stark monospace one-liner ─────────────────────────────────────
export function FeedFragment({ text }: { text: string }) {
  return (
    <div className="feed-fragment">
      <p className="feed-fragment-text">// {text}</p>
    </div>
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
