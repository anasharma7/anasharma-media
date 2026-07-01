import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Article, ArticleFrontmatter } from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content/essays");

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const extensions = [".mdx", ".md"];
  let filePath: string | null = null;

  for (const ext of extensions) {
    const candidate = path.join(CONTENT_DIR, `${slug}${ext}`);
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    ...(data as ArticleFrontmatter),
    slug,
    content,
    readingTime: stats.text,
  };
}

export function getAllArticles(): Article[] {
  const slugs = getAllArticleSlugs();
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => a !== null && a.status === "published")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedArticle(): Article | null {
  const all = getAllArticles();
  return all.find((a) => a.featured) ?? all[0] ?? null;
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}
