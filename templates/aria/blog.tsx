"use client";

/* =====================================================================
   "Aria" template — Blog listing page (FRONTEND ONLY).
   Layout mirrors the HOI blog.html spec. Placeholder data, ready for
   CMS wiring.
   ===================================================================== */

import { useState } from "react";
import Image from "next/image";
import { LayoutGrid, ArrowRight, Clock, Sparkles, Mail, Send, PenLine } from "lucide-react";
import { motion } from "motion/react";

import { Reveal } from "./motion";
import type { TemplatePageProps } from "@/templates/types";

const u = (id: string, w = 600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
// Local hero banner — panoramic "Create Memories" flat-lay.
const HERO_IMG = "/templates/blog.png";
const TINT = "#eef4f0";

const TABS = ["All Posts", "Wedding", "Pre-Wedding", "Maternity", "Corporate", "Product", "Tips & Guide", "Behind the Scenes"];

const FEATURED = { date: "18 Jun 2026", title: "How to choose your wedding photography package", excerpt: "A simple guide to coverage hours, deliverables, and what actually matters on your big day.", read: "5 min read", img: u("1519741497674-611481863552", 900) };

type Post = { cat: string; date: string; title: string; excerpt: string; read: string; img: string };
const POSTS: Post[] = [
  { cat: "Pre-Wedding", date: "18 Jun 2026", title: "5 pre-wedding shoot locations around Kolkata", excerpt: "Riverside, heritage, and golden-hour spots that photograph beautifully.", read: "4 min read", img: u("1522075469751-3a6694fb2f61") },
  { cat: "Product", date: "17 Jun 2026", title: "Why product photos decide your online sales", excerpt: "What good lighting and angles do for conversion on marketplaces.", read: "4 min read", img: u("1542291026-7eec264c27ff") },
  { cat: "Behind the Scenes", date: "15 Jun 2026", title: "Behind the scenes of a wedding photoshoot", excerpt: "Planning, preparation and those unseen moments.", read: "3 min read", img: u("1516035069371-29a1b244cc32") },
];

const POPULAR = [
  { title: "What to wear for your maternity shoot", date: "15 Jun 2026", img: u("1494790108377-be9c29b29330", 160) },
  { title: "Top 10 wedding photography trends in 2026", date: "12 Jun 2026", img: u("1606800052052-a08af7148866", 160) },
  { title: "Best camera settings for perfect photos", date: "10 Jun 2026", img: u("1516035069371-29a1b244cc32", 160) },
  { title: "Drone photography ideas for weddings", date: "08 Jun 2026", img: u("1473968512647-3e447244af8f", 160) },
];

const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14 ${className}`}>{children}</section>
);
const cn = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export default function AriaBlog(_props: TemplatePageProps) {
  const [tab, setTab] = useState("All Posts");
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  return (
    <main className="aria font-inter bg-[var(--a-cream)] text-[var(--a-body)]">
      {/* ── Overlay hero banner ── */}
      <section className="relative h-[230px] w-full overflow-hidden bg-[#f7f6f4] sm:h-[260px] md:h-[290px]">
        {/* Full-bleed image, anchored right so the camera always shows; the empty
            cream left (under the text) is the part that gets cropped as it fills. */}
        <Image
          src={HERO_IMG}
          alt="Flat-lay: notebook 'Create Memories', camera, latte and eucalyptus"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* Left→right readability gradient, matched to the image's cream (#f7f6f4). */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f6f4] via-[#f7f6f4]/80 to-transparent" />
        {/* Content overlay, aligned to the site grid */}
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full w-full max-w-[1200px] items-center px-5 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14">
            <div className="max-w-xl">
              <Reveal><p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--a-green)]"><ArrowRight width={12} height={12} /> Our Blog</p></Reveal>
              <Reveal delay={0.06}>
                <h1 className="font-playfair mt-3 text-[2.4rem] font-bold leading-[1.15] text-[var(--a-ink)] md:text-[2.75rem]">
                  Stories, tips &amp; inspiration<br />for better <em className="font-script text-[38px] font-normal normal-case not-italic leading-none text-[var(--a-green)] underline decoration-2 decoration-[var(--a-green)]/40 underline-offset-[8px] md:text-[48px]">memories</em>
                </h1>
              </Reveal>
              <Reveal delay={0.12}><p className="mt-4 max-w-md text-[15px] leading-7 text-[var(--a-body)]">Real stories, practical tips and creative inspiration to help you plan your perfect shoot.</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter pills ── */}
      <Wrap className="py-6">
        <div className="flex flex-wrap gap-2.5">
          {TABS.map((t) => {
            const on = t === tab;
            return (
              <button key={t} onClick={() => setTab(t)}
                className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition",
                  on ? "border-[var(--a-green-2)] bg-[var(--a-green-2)] font-semibold text-white" : "border-[var(--a-line)] bg-white text-[var(--a-ink)] hover:border-[var(--a-green)]/40")}>
                {t === "All Posts" && <LayoutGrid width={16} height={16} />}{t}
              </button>
            );
          })}
        </div>
      </Wrap>

      {/* ── Main + sidebar (4-col grid: main spans 3, sidebar spans 1) ── */}
      <Wrap className="grid grid-cols-1 gap-6 pb-10 lg:grid-cols-4">
        {/* Main column */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {/* Featured */}
          <Reveal>
            <article className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--a-line)] bg-white shadow-[0_6px_28px_rgba(20,40,32,.05)] md:h-[260px] md:grid-cols-2">
              <div className="relative aspect-[16/10] md:aspect-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FEATURED.img} alt={FEATURED.title} className="absolute inset-0 h-full w-full object-cover" />
                <span className="absolute left-3 top-3 rounded bg-[var(--a-green-2)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Featured</span>
              </div>
              <div className="flex h-full flex-col p-6">
                <p className="mb-1 text-xs font-semibold text-[var(--a-green)]">{FEATURED.date}</p>
                <h2 className="font-playfair mb-2 text-[1.625rem] font-bold leading-[1.2] tracking-tight text-[var(--a-ink)]">{FEATURED.title}</h2>
                <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--a-body)] md:text-sm">{FEATURED.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex min-w-0 items-center gap-2 text-xs text-[var(--a-body)]">
                    <div className="flex shrink-0 -space-x-2">
                      {POPULAR.slice(0, 3).map((p) => (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img key={p.title} src={p.img} alt="" className="h-7 w-7 rounded-full border-2 border-white object-cover" />
                      ))}
                    </div>
                    <span className="truncate">By High On Innovation Team · 5 min read</span>
                  </div>
                  <a href="/blog/how-to-choose-wedding-photography-package" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--a-green)]">Read more <ArrowRight width={16} height={16} /></a>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Post grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {POSTS.map((p) => (
              <Reveal key={p.title}>
                <motion.article whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--a-line)] bg-white shadow-[0_6px_28px_rgba(20,40,32,.05)]">
                  <div className="relative h-28">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.title} className="h-full w-full object-cover" />
                    <span className="absolute right-3 top-3 rounded bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--a-ink)]">{p.cat}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs font-semibold text-[var(--a-green)]">{p.date}</p>
                    <h3 className="font-playfair mt-1 text-[1.05rem] font-bold leading-[1.2] text-[var(--a-ink)]">{p.title}</h3>
                    <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[var(--a-body)]">{p.excerpt}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <a href="#" className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--a-green)]">Read more <ArrowRight width={14} height={14} /></a>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#8A8A85]"><Clock width={12} height={12} /> {p.read}</span>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            {["1", "2", "3", "…", "8"].map((n, i) => (
              <button key={i} className={cn("flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-semibold transition",
                n === "1" ? "bg-[var(--a-green-2)] text-white" : n === "…" ? "text-[#8A8A85]" : "border border-[var(--a-line)] bg-white text-[var(--a-ink)] hover:border-[var(--a-green)]/50")}>{n}</button>
            ))}
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--a-line)] bg-white text-[var(--a-ink)] hover:border-[var(--a-green)]/50"><ArrowRight width={15} height={15} /></button>
          </div>
        </div>

        {/* Sidebar (spans 1 of 4) */}
        <aside className="flex flex-col gap-6 lg:col-span-1">
          {/* Popular Posts */}
          <Reveal>
            <div className="rounded-2xl border border-[var(--a-line)] bg-white p-5 shadow-[0_6px_28px_rgba(20,40,32,.05)]">
              <div className="mb-3 flex items-center gap-2"><Sparkles width={18} height={18} className="text-[var(--a-green)]" /><h3 className="font-playfair text-lg font-bold text-[var(--a-ink)]">Popular Posts</h3></div>
              <div className="space-y-3.5">
                {POPULAR.map((p) => (
                  <a key={p.title} href="#" className="group flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.title} className="h-14 w-20 shrink-0 rounded-lg object-cover" />
                    <div className="flex min-w-0 flex-col justify-center pl-3">
                      <p className="mb-0.5 text-[13px] font-semibold leading-tight text-[var(--a-ink)] group-hover:text-[var(--a-green)]">{p.title}</p>
                      <p className="text-[11px] text-[#9a968c]">{p.date}</p>
                    </div>
                  </a>
                ))}
              </div>
              <a href="#" className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--a-green)]">View all posts <ArrowRight width={14} height={14} /></a>
            </div>
          </Reveal>

          {/* Stay inspired */}
          <Reveal delay={0.06}>
            <div className="rounded-2xl border border-[var(--a-line)] p-5 pb-4" style={{ background: "#F3F5F7" }}>
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--a-green-soft)] text-[var(--a-green)]"><Mail width={20} height={20} /></span>
                <div>
                  <h3 className="font-playfair text-lg font-bold leading-tight text-[var(--a-ink)]">Stay inspired</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--a-body)]">Subscribe to our newsletter for the latest tips, stories and offers.</p>
                </div>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setSubbed(true); setEmail(""); } }} className="mt-3 flex gap-2">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" required className="min-w-0 flex-1 rounded-xl border border-[var(--a-line)] bg-white px-3.5 py-2.5 text-[13px] outline-none placeholder:text-slate-400 focus:border-[var(--a-green)] focus:ring-2 focus:ring-[var(--a-green)]/15" />
                <button type="submit" className="flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[var(--a-green-2)] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[var(--a-green)] active:scale-95">Subscribe <Send width={15} height={15} /></button>
              </form>
              {subbed && <p className="mt-2 text-xs font-medium text-[var(--a-green-2)]">Thanks — you&apos;re subscribed.</p>}
            </div>
          </Reveal>
        </aside>
      </Wrap>

      {/* ── Suggest topic bar ── */}
      <Wrap className="pb-10">
        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-2xl p-6 sm:flex-row sm:justify-between" style={{ background: TINT }}>
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[var(--a-green)]"><PenLine width={19} height={19} /></span>
              <div><p className="font-playfair text-xl font-bold text-[var(--a-ink)]">Have a topic in mind?</p><p className="text-sm text-[var(--a-body)]">Let us know what you&apos;d like to read about next.</p></div>
            </div>
            <button className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--a-green)] px-6 py-3 text-sm font-semibold text-[var(--a-green)] transition hover:bg-[var(--a-green)] hover:text-white active:scale-95">Suggest a Topic <ArrowRight width={16} height={16} /></button>
          </div>
        </Reveal>
      </Wrap>
    </main>
  );
}
