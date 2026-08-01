import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const ESSAYS_DIR = path.join(process.cwd(), 'content/essays');

export type EssayMeta = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
};

export type Essay = EssayMeta & { html: string };

function readEssayFiles(): string[] {
  if (!fs.existsSync(ESSAYS_DIR)) return [];
  return fs.readdirSync(ESSAYS_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
}

export function getAllEssays(): EssayMeta[] {
  const files = readEssayFiles();
  const essays = files.map((filename) => {
    const slug = filename.replace(/\.mdx?$/, '');
    const filePath = path.join(ESSAYS_DIR, filename);
    const source = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(source);
    return {
      slug,
      title: data.title || 'Untitled',
      dek: data.dek || '',
      category: data.category || 'essay',
      date: data.date || '',
      readTime: data.readTime || '',
      author: data.author || 'Ana Sharma',
      featured: data.featured || false,
    };
  });
  return essays.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getEssayBySlug(slug: string): Essay | null {
  const filePath = path.join(ESSAYS_DIR, `${slug}.mdx`);
  const fallbackPath = path.join(ESSAYS_DIR, `${slug}.md`);
  const realPath = fs.existsSync(filePath) ? filePath : fs.existsSync(fallbackPath) ? fallbackPath : null;
  if (!realPath) return null;

  const source = fs.readFileSync(realPath, 'utf8');
  const { data, content } = matter(source);
  const html = marked.parse(content) as string;

  return {
    slug,
    title: data.title || 'Untitled',
    dek: data.dek || '',
    category: data.category || 'essay',
    date: data.date || '',
    readTime: data.readTime || '',
    author: data.author || 'Ana Sharma',
    featured: data.featured || false,
    html,
  };
}
