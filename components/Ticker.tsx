type TickerItem = {
  tag: string;
  text: string;
};

const items: TickerItem[] = [
  { tag: 'SIGNAL', text: 'tracking a shift in how group chats moderate themselves' },
  { tag: 'NOTE', text: '"AI grief" search volume up 40% this month' },
  { tag: 'WATCH', text: 'universities reintroducing oral exams as proof of thought' },
  { tag: 'DRIFT', text: 'new slang for "obviously AI-written" spreading in three languages' },
  { tag: 'PATTERN', text: 'productivity influencers going quiet on their AI workflows' },
  { tag: 'FIELD', text: 'independent researchers outpacing institutions on model behavior' },
  { tag: 'MARKET', text: '"authenticity" priced as a premium feature, not a default' },
];

export default function Ticker() {
  return (
    <div className="ticker-bar" role="region" aria-label="Live signal feed">
      <div className="ticker-label">
        <span className="live-dot"></span>SIGNAL
      </div>
      <div className="ticker-track">
        {[...items, ...items].map((item, i) => (
          <span className="ticker-item" key={i}>
            <span className="tag">{item.tag}</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
