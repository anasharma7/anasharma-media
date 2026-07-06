# anasharma.com

A Next.js site, statically exported and deployed to GitHub Pages on your custom domain.

## Publishing a new essay

1. Add a new file to `content/essays/`, e.g. `content/essays/the-quiet-theft.mdx`
2. Fill in the frontmatter at the top:

```
---
title: "Your headline"
dek: "The one or two sentence summary under the headline."
category: "cognition"
date: "2026-07-15"
readTime: "8 min"
author: "Ana Sharma"
featured: false
---
```

3. Write the essay body below the second `---` line in plain markdown. Paragraphs, `## headers`, and `> blockquotes` all render automatically.
4. Set `featured: true` on whichever single essay should get the large headline treatment on the homepage. Only one essay should be featured at a time.
5. Commit and push:

```
git add .
git commit -m "publish: the quiet theft"
git push origin main
```

That's it. GitHub Actions builds the site and deploys it automatically, live in one to two minutes. No manual build step, no copying files.

Delete `content/essays/template-delete-me.mdx` whenever you're ready, it's only there as a working example.

## Editing signals

Signals (the short dense links in the three-column river) live in `content/signals.json`, a plain array. Add, remove, or edit entries directly, same commit and push workflow applies.

```json
{
  "text": "The headline text of the signal",
  "source": "a short attribution or note",
  "flag": "trending"
}
```

`flag` is optional, leave it out for a plain entry. When present, it renders as a small red live-marker (options used so far: `trending`, `escalating`, `developing`, but any short word works).

## Local development

```
npm install
npm run dev
```

Visit `http://localhost:3000` to preview changes before pushing.

## How deployment works

- `next.config.mjs` sets `output: 'export'`, so `npm run build` produces a fully static `out/` folder, no server required.
- `.github/workflows/deploy.yml` runs on every push to `main`: installs dependencies, builds, and publishes the `out/` folder to GitHub Pages automatically via GitHub's official Pages Actions.
- `public/CNAME` contains `anasharma.com`, this is what keeps GitHub Pages serving on your custom domain after each rebuild.
- `public/.nojekyll` stops GitHub Pages from trying to run Jekyll over the build output, which would break the `_next` asset folder.

## One-time setup still required

In the GitHub repo: **Settings → Pages → Build and deployment → Source**, change this from "Deploy from a branch" to **GitHub Actions**. This only needs to be done once, after that every push deploys automatically.

Your DNS records at your registrar do not need to change, they already point at GitHub Pages correctly.

## A note on dependencies

`npm audit` will flag some vulnerabilities in Next.js's server runtime (middleware, image optimizer, server components). Since this site is fully statically exported, none of that server code ever runs in production, GitHub Pages only serves flat HTML/CSS/JS files. Worth keeping an eye on for future upgrades, not urgent for this deployment model.
