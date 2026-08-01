# anasharma.com

A Next.js site, statically exported and deployed to GitHub Pages on your custom domain.

## Publishing a new essay

1. Add a new file to `content/essays/`, e.g. `content/essays/the-quiet-theft.mdx`
2. Fill in the frontmatter at the top (title, dek, category, date, readTime, author, featured)
3. Write the essay body below the second `---` line in plain markdown
4. Commit and push:

```
git add .
git commit -m "publish: the quiet theft"
git push origin main
```

GitHub Actions builds and deploys automatically, live in one to two minutes.

## Editing signals

Hand-written signals live in `content/signals.json`, edit directly, same commit/push workflow.

## Live news signals (new)

`content/signals-live.json` is auto-generated, don't edit it by hand, it gets overwritten.

A scheduled GitHub Action (`.github/workflows/fetch-news.yml`) runs every 4 hours, pulls fresh headlines from a curated set of AI/tech RSS feeds (see `scripts/fetch-signals.mjs` for the list), and commits the results automatically. The homepage merges `content/signals.json` (yours) and `content/signals-live.json` (auto-pulled) together, your hand-written ones are never touched or overwritten.

To trigger a fetch manually instead of waiting: go to the repo's **Actions** tab → **Fetch live signals** → **Run workflow**.

To test locally: `npm run fetch-signals`

To add or remove news sources, edit the `FEEDS` array at the top of `scripts/fetch-signals.mjs`.

## Local development

```
npm install
npm run dev
```

## One-time setup required for the live news feature

Repo **Settings → Actions → General → Workflow permissions** must be set to **"Read and write permissions"**, otherwise the scheduled fetch can't commit its results back to the repo.

## How deployment works

- `next.config.mjs` sets `output: 'export'`, static export, no server required.
- `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
- `.github/workflows/fetch-news.yml` refreshes live signals on a schedule and commits changes, which in turn triggers a deploy.
- `public/CNAME` keeps the custom domain intact across rebuilds.
