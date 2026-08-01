'use client';

import { useState } from 'react';
import GrainCanvas from './GrainCanvas';

export type Signal = {
  text: string;
  source: string;
  flag?: string;
  link?: string;
};

export default function SignalsGrid({ signals }: { signals: Signal[] }) {
  const [active, setActive] = useState<Signal | null>(null);

  const columns: Signal[][] = [[], [], []];
  signals.forEach((signal, i) => columns[i % 3].push(signal));

  return (
    <>
      <div className="signal-grid">
        {columns.map((col, ci) => (
          <div className="signal-col" key={ci}>
            {col.map((signal, i) => (
              <div
                className="signal-item clickable"
                key={i}
                onClick={() => setActive(signal)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActive(signal);
                }}
              >
                {signal.flag && (
                  <span className={`flag ${signal.flag === 'wire' ? 'wire' : ''}`}>
                    <span className="live-dot"></span>
                    {signal.flag}
                  </span>
                )}
                <span>{signal.text}</span>
                <span className="signal-source">{signal.source}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {active && (
        <div
          className="signal-overlay"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <GrainCanvas />
          <div className="signal-overlay-panel" onClick={(e) => e.stopPropagation()}>
            <button className="signal-overlay-close" onClick={() => setActive(null)} aria-label="Close">
              close ✕
            </button>
            <div className="signal-overlay-meta">
              <span className="live-dot"></span>
              {active.flag || 'signal'}
            </div>
            <div className="signal-overlay-text">{active.text}</div>
            <div className="signal-overlay-source">{active.source}</div>
            {active.link && (
              <a
                className="signal-overlay-link"
                href={active.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                read the source →
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
