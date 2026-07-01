import { Signal } from "@/types/content";
import { CATEGORY_LABELS } from "@/types/content";

interface SignalsFeedProps {
  signals: Signal[];
}

export default function SignalsFeed({ signals }: SignalsFeedProps) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <span className="section-label">Signals</span>
        <span
          style={{
            fontSize: "0.65rem",
            color: "#3a3836",
            letterSpacing: "0.06em",
          }}
        >
          Observations from the feed
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {signals.map((signal, i) => (
          <div
            key={signal.id}
            style={{
              padding: "0.875rem 0",
              borderBottom: i < signals.length - 1 ? "1px solid #111" : "none",
            }}
          >
            <p
              className="signal-dot"
              style={{
                fontSize: "0.85rem",
                color: "#9a9690",
                lineHeight: 1.6,
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              {signal.text}
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginTop: "0.4rem",
                alignItems: "center",
              }}
            >
              <span className="category-pill" style={{ fontSize: "0.6rem" }}>
                {CATEGORY_LABELS[signal.category]}
              </span>
              {signal.source && (
                <span style={{ fontSize: "0.65rem", color: "#3a3836" }}>
                  {signal.sourceUrl ? (
                    <a
                      href={signal.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#c8a96e", textDecoration: "none" }}
                    >
                      {signal.source}
                    </a>
                  ) : (
                    signal.source
                  )}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
