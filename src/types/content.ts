export interface ArticleFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  category: Category;
  tags: string[];
  featured?: boolean;
  featuredImage?: string;
  author?: string;
  readingTime?: string;
  status: "published" | "draft";
}

export interface Article extends ArticleFrontmatter {
  content: string;
  readingTime: string;
}

export interface Signal {
  id: string;
  text: string;
  source?: string;
  sourceUrl?: string;
  date: string;
  category: Category;
}

export type Category =
  | "ai-cognition"
  | "internet-culture"
  | "digital-behavior"
  | "power-structures"
  | "identity"
  | "observations"
  | "essays";

export const CATEGORY_LABELS: Record<Category, string> = {
  "ai-cognition": "AI & Cognition",
  "internet-culture": "Internet Culture",
  "digital-behavior": "Digital Behavior",
  "power-structures": "Power Structures",
  identity: "Identity",
  observations: "Observations",
  essays: "Essays",
};
