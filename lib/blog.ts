import type { SiteContent } from "@/templates/types";
import { stripHtml } from "@/lib/utils";

export type BlogItem = SiteContent["blog"][number];

export type EnrichedPost = BlogItem & {
  slug: string;
  category: string;
  readMins: number;
  views: string;
  author: string;
};

export const BLOG_CATEGORIES = [
  "Wedding",
  "Pre-Wedding",
  "Maternity",
  "Corporate",
  "Product",
  "Tips & Guide",
  "Behind the Scenes",
];

export const POPULAR_TAGS = [
  "wedding tips", "pre wedding", "photography", "poses", "planning", "canon", "lighting", "indian wedding",
];

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function inferCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("pre-wed") || t.includes("pre wed")) return "Pre-Wedding";
  if (t.includes("wedding")) return "Wedding";
  if (t.includes("matern")) return "Maternity";
  if (t.includes("product")) return "Product";
  if (t.includes("corporate") || t.includes("brand")) return "Corporate";
  if (t.includes("behind")) return "Behind the Scenes";
  return "Tips & Guide";
}

export function enrichPost(post: BlogItem, i: number): EnrichedPost {
  const readMins = 3 + ((post.title.length + i) % 4);
  const viewsN = 0.8 + ((post.title.length * 7) % 20) / 10; // 0.8 - 2.7
  return {
    ...post,
    excerpt: stripHtml(post.excerpt), // CMS excerpts may be rich-text HTML
    slug: slugify(post.title),
    category: inferCategory(post.title),
    readMins,
    views: `${viewsN.toFixed(1)}k`,
    author: "High On Innovation Team",
  };
}

export function enrichPosts(posts: BlogItem[]): EnrichedPost[] {
  return posts.map(enrichPost);
}

/** Category → count map for the sidebar (falls back to spread defaults). */
export function categoryCounts(posts: EnrichedPost[]): { name: string; count: number }[] {
  return BLOG_CATEGORIES.map((name, i) => {
    const real = posts.filter((p) => p.category === name).length;
    return { name, count: real || [12, 8, 6, 7, 5, 9, 4][i] || 3 };
  });
}
