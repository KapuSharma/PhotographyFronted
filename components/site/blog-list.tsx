"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Flame, Send, Grid3x3 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { BLOG_CATEGORIES, type EnrichedPost } from "@/lib/blog";
import { TiltCard } from "@/components/site/anim";

export function BlogList({ posts }: { posts: EnrichedPost[] }) {
  const tabs = ["All Posts", ...BLOG_CATEGORIES];
  const [active, setActive] = useState("All Posts");
  const filtered = active === "All Posts" ? posts : posts.filter((p) => p.category === active);
  const featured = filtered[0];
  const rest = filtered.slice(1, 4);
  const popular = posts.slice(0, 4);

  return (
    <>
      {/* Tabs */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {tabs.map((t) => {
          const on = t === active;
          return (
            <button key={t} onClick={() => setActive(t)} className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition",
              on ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/25" : "border-border bg-card text-muted-foreground hover:border-brand-200 hover:text-brand-700"
            )}>
              {t === "All Posts" ? <Grid3x3 width={14} height={14} /> : null} {t}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        {/* Posts */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              {featured ? (
                <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm lift md:grid-cols-2">
                  <div className="shine relative aspect-[16/11] overflow-hidden md:aspect-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Featured</span>
                  </div>
                  <div className="flex flex-col justify-center p-6">
                    <div className="text-xs font-bold text-brand-600">{featured.date}</div>
                    <h3 className="mt-2 text-xl font-extrabold leading-snug text-foreground group-hover:text-brand-700">{featured.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{featured.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">By {featured.author} · {featured.readMins} min read</span>
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-700 transition group-hover:gap-2">Read more <ArrowRight width={14} height={14} /></span>
                    </div>
                  </div>
                </Link>
              ) : null}

              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {rest.map((p) => (
                  <div key={p.slug} className="perspective">
                    <TiltCard intensity={6} glare={false} className="preserve-3d h-full">
                      <Link href={`/blog/${p.slug}`} className="group block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm lift">
                        <div className="shine relative aspect-[16/11] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-brand-700">{p.category}</span>
                        </div>
                        <div className="p-4">
                          <div className="text-xs font-bold text-brand-600">{p.date}</div>
                          <h4 className="mt-1.5 text-sm font-bold leading-snug text-foreground group-hover:text-brand-700 line-clamp-2">{p.title}</h4>
                          <p className="mt-1.5 text-xs leading-5 text-muted-foreground line-clamp-2">{p.excerpt}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-700">Read more <ArrowRight width={12} height={12} /></span>
                            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"><Clock width={11} height={11} /> {p.readMins} min</span>
                          </div>
                        </div>
                      </Link>
                    </TiltCard>
                  </div>
                ))}
              </div>

              {filtered.length === 0 ? <p className="py-12 text-center text-sm text-muted-foreground">No posts in this category yet.</p> : null}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {["1", "2", "3", "…", "8"].map((n, i) => (
              <button key={i} className={cn(
                "flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition",
                i === 0 ? "border-brand-600 bg-brand-600 text-white" : "border-border bg-card text-muted-foreground hover:border-brand-200"
              )}>{n}</button>
            ))}
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:border-brand-200"><ArrowRight width={15} height={15} /></button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h4 className="flex items-center gap-2 text-sm font-bold text-foreground"><Flame width={16} height={16} className="text-brand-600" /> Popular Posts</h4>
            <ul className="mt-4 space-y-4">
              {popular.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                    <span>
                      <span className="block text-sm font-semibold leading-snug text-foreground group-hover:text-brand-700 line-clamp-2">{p.title}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{p.date}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-700">View all posts <ArrowRight width={13} height={13} /></Link>
          </div>

          <div className="rounded-2xl border border-border bg-muted/50 p-6 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100"><Send width={18} height={18} /></span>
            <h4 className="mt-4 text-base font-bold text-foreground">Stay inspired</h4>
            <p className="mt-1 text-sm text-muted-foreground">Subscribe for the latest tips, stories and offers.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="Your email address" className="w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-brand-400" />
              <button className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"><Send width={14} height={14} /></button>
            </form>
          </div>
        </aside>
      </div>
    </>
  );
}
