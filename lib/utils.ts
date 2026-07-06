import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Strip HTML tags + decode common entities to plain text (SSR-safe).
 *  Used where CMS rich-text needs to render as a clean single string
 *  (e.g. a styled review quote) rather than raw markup. */
export function stripHtml(html?: string | null): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/** stripHtml + collapse repeated sentences. CMS fields sometimes accumulate
 *  the same paragraph several times (repeated pastes/saves); this yields a
 *  clean, de-duplicated summary string. */
export function plainSummary(html?: string | null): string {
  const text = stripHtml(html);
  if (!text) return "";
  // Split after sentence punctuation (even when run together, e.g. "…day.Full…").
  const parts = text.split(/(?<=[.!?])\s*/).map((s) => s.trim()).filter(Boolean);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of parts) {
    const key = p.toLowerCase();
    if (!seen.has(key)) { seen.add(key); out.push(p); }
  }
  return out.join(" ");
}
