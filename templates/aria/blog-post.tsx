"use client";

/* =====================================================================
   "Aria" template — Blog single post page (FRONTEND ONLY).
   Placeholder data, ready for CMS wiring. Wired directly in the
   /blog/[slug] route (no registry slot needed).
   ===================================================================== */

import {
  Search, Heart, Users, Baby, Briefcase, Package as PackageIcon, Lightbulb, Camera,
  ArrowRight, Clock, Eye, Check, Image as ImageIcon, BookOpen, Video, Link2,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

import { Reveal } from "./motion";
import type { ArticleBlock, SiteContent } from "@/templates/types";

/* CMS icon-key → glyph for article blocks (deliverables + callouts). */
const BLOCK_ICONS: Record<string, LucideIcon> = { image: ImageIcon, book: BookOpen, video: Video, lightbulb: Lightbulb, heart: Heart, check: Check, camera: Camera, users: Users, baby: Baby, briefcase: Briefcase, package: PackageIcon };
const bic = (k?: string): LucideIcon => (k && BLOCK_ICONS[k]) || ImageIcon;

/* Renders one structured article block in the designed aria style. */
function Block({ b }: { b: ArticleBlock }) {
  switch (b.type) {
    case "heading":
      return <h2 className="font-playfair mt-5 text-xl font-bold text-[var(--a-ink)]">{b.text}</h2>;
    case "paragraph":
      return <p className="mt-3 text-[13px] leading-6 text-[var(--a-body)]">{b.text}</p>;
    case "checklist":
      return (
        <div className="mt-3">
          {b.intro ? <p className="text-[13px] leading-6 text-[var(--a-body)]">{b.intro}</p> : null}
          <ul className="mt-4 space-y-2.5">
            {b.items.map((it, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--a-ink)]/85"><Check width={16} height={16} className="mt-0.5 shrink-0 text-[var(--a-green)]" /><span><span className="font-bold text-[var(--a-ink)]">{it.bold}</span> {it.text}</span></li>
            ))}
          </ul>
        </div>
      );
    case "callout": {
      const Icon = bic(b.icon);
      const color = b.tone === "pink" ? "text-[#c2506a]" : "text-[var(--a-gold)]";
      return <div className="mt-4 flex items-start gap-2 rounded-xl bg-[var(--a-green-soft)]/70 p-3.5 text-sm text-[var(--a-ink)]"><Icon width={16} height={16} className={`mt-0.5 shrink-0 ${color}`} /><span>{b.text}</span></div>;
    }
    case "image":
      return (
        <Reveal>
          <div className="mt-4 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.url} alt={b.alt} className="aspect-[11/5] w-full object-cover" />
          </div>
        </Reveal>
      );
    case "deliverables":
      return (
        <div className="mt-4 grid max-w-[820px] gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {b.items.map((d, i) => {
            const Icon = bic(d.icon);
            return (
              <div key={i} className="rounded-xl border border-[var(--a-line)] bg-white p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--a-green-soft)] text-[var(--a-green)]"><Icon width={17} height={17} /></span>
                <div className="mt-3 text-sm font-bold text-[var(--a-ink)]">{d.title}</div>
                <p className="mt-1 text-xs leading-5 text-[var(--a-body)]">{d.sub}</p>
              </div>
            );
          })}
        </div>
      );
    case "quote":
      return <p className="font-playfair mt-5 border-l-2 border-[var(--a-gold)] pl-4 text-lg italic leading-8 text-[var(--a-ink)]">“{b.text}”</p>;
    default:
      return null;
  }
}

const u = (id: string, w = 700) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const AVATAR = u("1506794778202-cad84cf45f1d", 120);

const CATEGORIES: { name: string; count: number; icon: LucideIcon }[] = [
  { name: "Wedding", count: 12, icon: Heart }, { name: "Pre-Wedding", count: 8, icon: Users }, { name: "Maternity", count: 6, icon: Baby },
  { name: "Corporate", count: 7, icon: Briefcase }, { name: "Product", count: 5, icon: PackageIcon }, { name: "Tips & Guide", count: 9, icon: Lightbulb },
  { name: "Behind the Scenes", count: 4, icon: Camera },
];

const POPULAR = [
  { title: "What to wear for your maternity shoot", date: "15 Jun 2026", img: u("1494790108377-be9c29b29330", 160) },
  { title: "Top 10 wedding photography trends in 2026", date: "12 Jun 2026", img: u("1606800052052-a08af7148866", 160) },
  { title: "Best camera settings for perfect photos", date: "10 Jun 2026", img: u("1516035069371-29a1b244cc32", 160) },
  { title: "Drone photography ideas for weddings", date: "08 Jun 2026", img: u("1473968512647-3e447244af8f", 160) },
];

const DELIVERABLES: { icon: LucideIcon; title: string; sub: string }[] = [
  { icon: ImageIcon, title: "Edited Photos", sub: "Quality matters more than quantity." },
  { icon: ImageIcon, title: "Online Gallery", sub: "Easy to share with family and friends." },
  { icon: BookOpen, title: "Photo Album", sub: "A timeless keepsake of your memories." },
  { icon: Video, title: "Highlight Video", sub: "Relive your day in beautiful way." },
];

const TAGS = ["wedding tips", "pre wedding", "photography", "poses", "planning", "canon", "lighting", "indian wedding"];

const RELATED = [
  { cat: "Pre-Wedding", date: "17 Jun 2026", title: "5 pre-wedding shoot locations around Kolkata", read: "4 min read", img: u("1522075469751-3a6694fb2f61") },
  { cat: "Tips & Guide", date: "16 Jun 2026", title: "How to prepare for your wedding photoshoot", read: "5 min read", img: u("1519741497674-611481863552") },
  { cat: "Behind the Scenes", date: "15 Jun 2026", title: "Behind the scenes of a wedding photoshoot", read: "3 min read", img: u("1516035069371-29a1b244cc32") },
  { cat: "Wedding", date: "14 Jun 2026", title: "Candid moments that make weddings unforgettable", read: "4 min read", img: u("1606800052052-a08af7148866") },
];

const ShareBtn = ({ children, bg }: { children: React.ReactNode; bg: string }) => (
  <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:opacity-90" style={{ background: bg }}>{children}</a>
);

const stripHtml = (s: string) => (s || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/\s+/g, " ").trim();

type BlogPostProps = { post?: SiteContent["blog"][number]; cfg?: SiteContent["blogPostPage"] };
export default function AriaBlogPost({ post, cfg }: BlogPostProps) {
  const category = post?.category || "Wedding";
  const heading = post?.title;
  const excerpt = stripHtml(post?.excerpt || "") || "A simple guide to coverage hours, deliverables, and what actually matters on your big day.";
  const date = post?.date || "18 Jun 2026";
  const image = post?.image || u("1519741497674-611481863552", 1000);
  const body = post?.body || [];
  const authorName = post?.author || cfg?.author.name || "High On Innovation Team";
  const authorAvatar = post?.authorImg || cfg?.author.avatar || AVATAR;
  const authorBio = cfg?.author.bio || "We are a team of passionate photographers and storytellers who believe in capturing real emotions and timeless memories.";
  const readTime = post?.readTime || "5 min read";
  const views = post?.views || "1.2k views";
  const categories = cfg?.sidebar.categories?.length ? cfg.sidebar.categories.map((c) => ({ name: c.name, count: c.count, icon: bic(c.icon) })) : CATEGORIES.map((c) => ({ name: c.name, count: String(c.count), icon: c.icon }));
  const tags = (post?.tags?.length ? post.tags : cfg?.sidebar.tags) || TAGS;
  const sideCta = cfg?.sidebar.cta;
  const searchPh = cfg?.sidebar.searchPlaceholder || "Search blog posts...";
  const related = cfg?.related;
  const relatedItems = related?.items?.length ? related.items : RELATED.map((r) => ({ category: r.cat, date: r.date, title: r.title, read: r.read, img: r.img, href: "/blog" }));
  return (
    <main className="aria font-inter bg-[var(--a-cream)] text-[var(--a-ink)]">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--a-body)]">
          <a href="/" className="hover:text-[var(--a-green)]">Home</a><span>›</span>
          <a href="/blog" className="hover:text-[var(--a-green)]">Blog</a><span>›</span>
          <span className="text-[var(--a-ink)]">{heading || "How to choose your wedding photography package"}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* ── Article ── */}
          <article>
            <span className="inline-block rounded-md bg-[var(--a-green-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--a-green)]">{category}</span>
            <h1 className="font-playfair mt-3 text-[clamp(1.9rem,3.6vw,2rem)] font-bold leading-[1.15] text-[var(--a-ink)]">{heading || <>How to choose your wedding<br />photography package</>}</h1>
            <p className="mt-3 text-[13px] text-[var(--a-body)]">{excerpt}</p>

            {/* Meta + share */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--a-body)]">
                <span className="flex items-center gap-2">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={authorAvatar} alt="" className="h-7 w-7 rounded-full object-cover" /> <span className="font-semibold text-[var(--a-ink)]">By {authorName}</span></span>
                <span className="flex items-center gap-1">{date}</span>
                <span className="flex items-center gap-1"><Clock width={13} height={13} /> {readTime}</span>
                <span className="flex items-center gap-1"><Eye width={13} height={13} /> {views}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[var(--a-body)]">Share:</span>
                <ShareBtn bg="#1f2937"><span className="text-[13px] font-black">f</span></ShareBtn>
                <ShareBtn bg="#1f2937"><span className="text-[13px] font-black">t</span></ShareBtn>
                <ShareBtn bg="#1f2937"><span className="text-[12px] font-black">w</span></ShareBtn>
                <ShareBtn bg="#1f2937"><Link2 width={14} height={14} /></ShareBtn>
              </div>
            </div>

            {/* Featured image */}
            <Reveal>
              <div className="mt-6 overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={heading || "Wedding couple"} className="aspect-[100/27] w-full object-cover" />
              </div>
            </Reveal>

            {body.length > 0 ? (
              <div className="mt-6">{body.map((b, i) => <Block key={i} b={b} />)}</div>
            ) : (<>
            <div className="mt-6">
              <p className="mt-3 text-[13px] text-[var(--a-body)] lg:max-w-[60%]">Your wedding photos are the memories you&apos;ll cherish for a lifetime. But with so many photography packages out there, how do you choose the right one for your big day?</p>
              <p className="mt-3 text-[13px] text-[var(--a-body)] lg:max-w-[60%]">This guide breaks down the key factors to consider so you can pick a package that fits your story, your needs, and your budget.</p>
            </div>

            {/* Section 1 */}
            <div className="mt-4 grid gap-6 border-t border-[var(--a-line)] pt-4 md:grid-cols-[1fr_auto] md:items-start">
              <div className="max-w-md">
                <h2 className="font-playfair text-xl font-bold text-[var(--a-ink)]">1. Understand the Coverage Hours</h2>
                <p className="mt-2 text-[13px] leading-6 text-[var(--a-body)]">Coverage hours determine how much of your day will be captured. Here&apos;s a quick guide:</p>
                <ul className="mt-4 space-y-2.5">
                  {[["2–4 Hours:", "Best for intimate weddings or registry ceremonies."], ["6–8 Hours:", "Ideal for capturing key moments from getting ready to main events."], ["10+ Hours:", "Perfect for full-day coverage including all rituals and candid moments."]].map(([b, t]) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-[var(--a-ink)]/85"><Check width={16} height={16} className="mt-0.5 shrink-0 text-[var(--a-green)]" /><span><span className="font-bold text-[var(--a-ink)]">{b}</span> {t}</span></li>
                  ))}
                </ul>
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-[var(--a-green-soft)]/70 p-3.5 text-sm text-[var(--a-ink)]"><Lightbulb width={16} height={16} className="mt-0.5 shrink-0 text-[var(--a-gold)]" /><span><span className="font-bold">Tip:</span> List the moments that matter most to you and work backwards to estimate the hours.</span></div>
              </div>
              <Reveal>
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u("1465495976277-4387d4b0b4c6", 700)} alt="Wedding coverage" className="aspect-square w-full object-cover md:aspect-[11/10] md:h-[300px] md:w-auto" />
                </div>
              </Reveal>
            </div>

            {/* Section 2 */}
            <div className="mt-5">
              <h2 className="font-playfair text-xl font-bold text-[var(--a-ink)]">2. Check What&apos;s Included in the Deliverables</h2>
              <p className="mt-2 text-[13px] leading-6 text-[var(--a-body)]">Not all packages are the same. Make sure you know exactly what you&apos;ll receive.</p>
              <div className="mt-4 grid max-w-[820px] gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                {DELIVERABLES.map((d) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.title} className="rounded-xl border border-[var(--a-line)] bg-white p-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--a-green-soft)] text-[var(--a-green)]"><Icon width={17} height={17} /></span>
                      <div className="mt-3 text-sm font-bold text-[var(--a-ink)]">{d.title}</div>
                      <p className="mt-1 text-xs leading-5 text-[var(--a-body)]">{d.sub}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sections 3 + 4 — image spans both points */}
            <div className="mt-5 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
              <div className="max-w-xl">
                <h2 className="font-playfair text-xl font-bold text-[var(--a-ink)]">3. Consider the Style That Matches You</h2>
                <p className="mt-2 text-[13px] leading-6 text-[var(--a-body)]">Every photographer has a unique style—candid, traditional, editorial, or a mix. Look through full galleries (not just Instagram highlights) to see if their storytelling matches your vision.</p>
                <h2 className="font-playfair mt-5 text-xl font-bold text-[var(--a-ink)]">4. Don&apos;t Just Choose Based on Price</h2>
                <p className="mt-2 text-[13px] leading-6 text-[var(--a-body)]">The cheapest option may not always deliver the experience or quality you expect. Invest in a team that understands your story and makes you feel comfortable.</p>
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-[var(--a-green-soft)]/70 p-3.5 text-sm text-[var(--a-ink)]"><Heart width={16} height={16} className="mt-0.5 shrink-0 text-[#c2506a]" /><span>Your wedding photos are not an expense, they are an investment in memories.</span></div>
              </div>
              <Reveal>
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u("1452587925148-ce544e77e70d", 700)} alt="Photographer style" className="aspect-[11/5] w-full object-cover md:h-[158px] md:w-[400px]" />
                </div>
              </Reveal>
            </div>

            {/* Section 5 */}
            <div className="mt-5 max-w-xl">
              <h2 className="font-playfair text-xl font-bold text-[var(--a-ink)]">5. Have a Conversation</h2>
              <p className="mt-2 text-[13px] leading-6 text-[var(--a-body)]">Talk to your photographer. A quick call can help you understand their process, team, and how comfortable you feel working with them.</p>
              <p className="mt-3 text-[13px] leading-6 text-[var(--a-body)]">Choosing the right wedding photography package is about finding the perfect balance of coverage, deliverables, style, and trust. When you get that right, your photos will tell a story you&apos;ll treasure forever.</p>
            </div>
            </>)}

            {/* Author card */}
            <div className="mt-5 flex max-w-5xl items-start gap-3 rounded-2xl border border-[var(--a-line)] bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={authorAvatar} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
              <div className="max-w-md">
                <div className="text-sm font-bold text-[var(--a-ink)]">Written by {authorName}</div>
                <p className="mt-1 text-sm leading-6 text-[var(--a-body)]">{authorBio}</p>
                <div className="mt-2 flex gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--a-green-soft)] text-[11px] font-black text-[var(--a-green)]">ig</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--a-green-soft)] text-[11px] font-black text-[var(--a-green)]">f</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--a-green-soft)] text-[11px] font-black text-[var(--a-green)]">t</span>
                </div>
              </div>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="space-y-8">
            {/* Search */}
            <div className="rounded-2xl border border-[var(--a-line)] bg-white p-5 shadow-sm">
              <h3 className="text-base font-bold text-[var(--a-ink)]">Search</h3>
              <div className="relative mt-3">
                <input placeholder={searchPh} className="w-full rounded-lg border border-[var(--a-line)] bg-white px-3.5 py-2.5 pr-10 text-sm outline-none focus:border-[var(--a-green)]/60" />
                <Search width={16} height={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--a-body)]" />
              </div>
            </div>
            {/* Categories */}
            <div className="rounded-2xl border border-[var(--a-line)] bg-white p-5 shadow-sm">
              <h3 className="text-base font-bold text-[var(--a-ink)]">Categories</h3>
              <ul className="mt-4 space-y-3">
                {categories.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.name}><a href="#" className="flex items-center justify-between rounded-lg px-2 py-2.5 text-sm transition hover:bg-[#f6f7f5]">
                      <span className="flex items-center gap-2.5 font-semibold text-[var(--a-ink)]"><Icon width={16} height={16} className="text-[var(--a-green)]" /> {c.name}</span>
                      <span className="rounded-md bg-[#f1f2ee] px-2 py-0.5 text-xs font-semibold text-[var(--a-body)]">{c.count}</span>
                    </a></li>
                  );
                })}
              </ul>
            </div>
            {/* Popular */}
            <div className="rounded-2xl border border-[var(--a-line)] bg-white p-5 shadow-sm">
              <h3 className="text-base font-bold text-[var(--a-ink)]">Popular Posts</h3>
              <ul className="mt-4 space-y-6">
                {POPULAR.map((p) => (
                  <li key={p.title} className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.title} className="h-16 w-24 shrink-0 rounded-lg object-cover" />
                    <div><div className="text-[13px] font-bold leading-snug text-[var(--a-ink)] hover:text-[var(--a-green)]">{p.title}</div><div className="mt-0.5 text-[11px] text-[var(--a-body)]">{p.date}</div></div>
                  </li>
                ))}
              </ul>
            </div>
            {/* CTA */}
            <div className="relative overflow-hidden rounded-2xl bg-[var(--a-green-2)] px-6 py-9 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white"><Camera width={20} height={20} /></span>
              <h3 className="font-playfair mt-4 max-w-[175px] text-[15px] font-bold leading-snug">{sideCta?.heading || "Capture your story beautifully"}</h3>
              <p className="mt-2 max-w-[180px] text-[13px] text-white/80">{sideCta?.subtitle || "Let's create memories that last forever."}</p>
              <a href={sideCta?.buttonHref || "/contact"} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[13px] font-bold text-[var(--a-green-2)] transition hover:bg-white/90">{sideCta?.buttonLabel || "Book a Consultation"} <ArrowRight width={15} height={15} /></a>
            </div>
            {/* Tags */}
            <div className="rounded-2xl border border-[var(--a-line)] bg-white p-5 shadow-sm">
              <h3 className="text-base font-bold text-[var(--a-ink)]">Tags</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((t) => <a key={t} href="#" className="rounded-full border border-[var(--a-line)] px-3 py-1.5 text-xs font-semibold text-[var(--a-body)] transition hover:border-[var(--a-green)]/40 hover:text-[var(--a-green)]">{t}</a>)}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── You may also like ── */}
      <div className="bg-[var(--a-green-soft)]/40">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-xl font-bold text-[var(--a-ink)]">{related?.heading || "You may also like"}</h2>
            <a href={related?.viewAllHref || "/blog"} className="inline-flex items-center gap-1 text-[13px] font-bold text-[var(--a-green)]">{related?.viewAllLabel || "View all posts"} <ArrowRight width={14} height={14} /></a>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedItems.map((p, i) => (
              <motion.article key={`${p.title}-${i}`} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="flex flex-col overflow-hidden rounded-2xl border border-[var(--a-line)] bg-white shadow-sm">
                <a href={(p as { href?: string }).href || "/blog"} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.title} className="aspect-[16/5] w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--a-ink)]">{p.category}</span>
                </a>
                <div className="flex flex-1 flex-col p-4">
                  <span className="text-xs font-semibold text-[var(--a-green)]">{p.date}</span>
                  <h3 className="font-playfair mt-1.5 text-[13px] font-bold leading-snug text-[var(--a-ink)]">{p.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] text-[var(--a-body)]"><Clock width={13} height={13} /> {p.read}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
