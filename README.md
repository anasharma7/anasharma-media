# anasharma.com

A digital media and intelligence platform documenting the AI transition era through essays, observations, and cultural analysis.

## Topics
- AI & Cognition
- Internet Culture
- Digital Behavior
- Power Structures
- Identity in Online Spaces

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4 + custom CSS design system
- **Content**: MDX with gray-matter frontmatter
- **Deployment**: Vercel
- **Language**: TypeScript

## Project Structure

```
src/
  app/
    page.tsx              — Homepage
    essays/page.tsx       — Essays index
    essays/[slug]/page.tsx — Individual essay
    signals/page.tsx      — Signals feed
    about/page.tsx        — About page
    sitemap.ts            — Auto-generated sitemap
    robots.ts             — robots.txt
    globals.css           — Design system & global styles
    layout.tsx            — Root layout with metadata
  components/
    Header.tsx            — Sticky nav header
    Footer.tsx            — Site footer
    MainLayout.tsx        — Header + Footer wrapper
    ArticleCard.tsx       — Article card (3 variants)
    FeaturedHero.tsx      — Featured essay hero
    SignalsFeed.tsx        — Signals/observations feed
  lib/
    content.ts            — MDX content loader
    utils.ts              — Date formatting utilities
  types/
    content.ts            — TypeScript types & category constants

content/
  essays/                 — MDX essay files
    the-quiet-theft.mdx
    cognitive-inequality.mdx
    you-are-not-the-user.mdx
```

## Writing Essays

Create a new `.mdx` file in `content/essays/` with this frontmatter:

```yaml
---
title: "Your Essay Title"
excerpt: "A one-paragraph summary that appears in cards and meta tags."
date: "YYYY-MM-DD"
slug: "url-friendly-slug"
category: "ai-cognition" # see categories below
tags: ["tag1", "tag2"]
featured: false          # set true for homepage hero
author: "Ana Sharma"
status: "published"      # or "draft" to hide
---
```

### Categories
- `ai-cognition`
- `internet-culture`
- `digital-behavior`
- `power-structures`
- `identity`
- `observations`
- `essays`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Connected to Vercel. Pushes to `main` auto-deploy.
