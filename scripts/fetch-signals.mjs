// Pulls recent headlines from a curated set of AI/tech RSS feeds and writes
// them into content/signals-live.json in the same shape the site expects.
//
// This never touches content/signals.json (your hand-written signals), it
// only manages its own separate file, which the site merges in at build time.
//
// Run manually with: npm run fetch-signals
// Runs automatically on a schedule via .github/workflows/fetch-news.yml

import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';

const OUTPUT_PATH = path.join(process.cwd(), 'content/signals-live.json');
const MAX_ITEMS = 12;
const MAX_PER_SOURCE = 3;

// Public RSS feeds, no API key required. Add or remove sources here.
// If a feed URL goes stale, the fetch for that one source is skipped
// (logged, not fatal) rather than failing the whole run.
const FEEDS = [
  { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', source: 'TechCrunch' },
  { url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', source: 'The Verge' },
  { url: 'https://www.technologyreview.com/feed/', source: 'MIT Technology Review' },
  { url: 'https://www.wired.com/feed/tag/ai/latest/rss', source: 'Wired' },
];

const parser = new Parser({
  timeout: 15000,
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; anasharma-signal-bot/1.0)' },
});

function truncate(text, maxLen = 140) {
  const clean = text.trim().replace(/\s+/g, ' ');
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen - 1).trimEnd() + '…';
}

async function fetchFeed({ url, source }) {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items || [])
      .slice(0, MAX_PER_SOURCE)
      .filter((item) => item.title && item.link)
      .map((item) => ({
        text: truncate(item.title),
        source,
        link: item.link,
        flag: 'wire',
      }));
  } catch (err) {
    console.error(`Skipping ${source} (${url}): ${err.message}`);
    return [];
  }
}

async function main() {
  console.log(`Fetching ${FEEDS.length} feeds...`);
  const results = await Promise.all(FEEDS.map(fetchFeed));
  const combined = results.flat();

  // simple shuffle so the same source doesn't dominate the top of the list
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  const final = combined.slice(0, MAX_ITEMS);

  if (final.length === 0) {
    console.log('No items fetched from any feed, leaving existing signals-live.json untouched.');
    return;
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(final, null, 2) + '\n');
  console.log(`Wrote ${final.length} live signals to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('fetch-signals failed:', err);
  process.exit(1);
});
