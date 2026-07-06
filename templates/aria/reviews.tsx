"use client";

/* =====================================================================
   "Aria" template — Reviews page (FRONTEND ONLY).
   Placeholder data, ready for CMS wiring.
   ===================================================================== */

import { useState } from "react";
import {
  Star, Quote, LayoutGrid, Heart, Users, Baby, Briefcase, Package as PackageIcon,
  Shirt, PartyPopper, ArrowRight, Play, Image as ImageIcon, Camera, Settings,
  ExternalLink, type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

import { Reveal, EASE } from "./motion";
import type { TemplatePageProps } from "@/templates/types";

const u = (id: string, w = 400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const HERO_IMG = "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=80";

const TABS: { name: string; icon: LucideIcon }[] = [
  { name: "All Reviews", icon: LayoutGrid }, { name: "Wedding", icon: Heart }, { name: "Pre-Wedding", icon: Users },
  { name: "Maternity", icon: Baby }, { name: "Corporate", icon: Briefcase }, { name: "Product", icon: PackageIcon },
  { name: "Fashion", icon: Shirt }, { name: "Event", icon: PartyPopper },
];

const BARS = [{ s: 5, p: 95 }, { s: 4, p: 4 }, { s: 3, p: 1 }, { s: 2, p: 0 }, { s: 1, p: 0 }];

type Review = { text: string; name: string; role: string; city: string; date: string; cat: string; img: string };
const REVIEWS: Review[] = [
  { text: "They captured our wedding exactly the way it felt. The private gallery and quick sneak peek were a lovely touch.", name: "Aisha & Rohan", role: "Wedding Photography", city: "Kolkata", date: "12 May 2024", cat: "Wedding", img: u("1519741497674-611481863552") },
  { text: "My maternity shoot was calm and so well guided. The photos are stunning and arrived ahead of time.", name: "Nupur Sen", role: "Maternity Photography", city: "Howrah", date: "28 Apr 2024", cat: "Maternity", img: u("1494790108377-be9c29b29330") },
  { text: "Clean product shots that lifted our store listings. Fast turnaround and easy booking.", name: "Nexa Store", role: "Product Photography", city: "Salt Lake", date: "10 Apr 2024", cat: "Product", img: u("1560472354-b33ff0c44a43") },
  { text: "The pre-wedding shoot was magical! They made us feel so comfortable in front of the camera.", name: "Megha & Arjun", role: "Pre-Wedding Photography", city: "Kolkata", date: "02 Apr 2024", cat: "Pre-Wedding", img: u("1522075469751-3a6694fb2f61") },
  { text: "Highly professional team with creative ideas. Our corporate event photos were fantastic.", name: "Rohit Agarwal", role: "Corporate Photography", city: "Kolkata", date: "25 Mar 2024", cat: "Corporate", img: u("1507003211169-0a1dd7228f2d") },
  { text: "Fashion shoot was beyond expectations. Great styling suggestions and perfect lighting!", name: "Diya Sharma", role: "Fashion Photography", city: "Kolkata", date: "18 Mar 2024", cat: "Fashion", img: u("1438761681033-6461ffad8d80") },
];

const PHOTOS = ["1519741497674-611481863552", "1490725263030-1f0521cec8ec", "1556228578-8c89e6adf883", "1520854221256-17451cc331bf", "1519227355453-8f982e425321", "1511578314322-379afb476865"];

const STATS: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Users, value: "1000+", label: "Happy Clients" }, { icon: Camera, value: "1500+", label: "Photoshoots Completed" },
  { icon: Star, value: "4.9/5", label: "Average Rating" }, { icon: Settings, value: "5+ Years", label: "Of Creating Memories" },
];

const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14 ${className}`}>{children}</section>
);
const cn = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const Stars = ({ n = 5 }: { n?: number }) => (
  <div className="flex gap-0.5">{Array.from({ length: n }).map((_, i) => <Star key={i} width={15} height={15} className="fill-[var(--a-gold)] text-[var(--a-gold)]" />)}</div>
);

export default function AriaReviews(_props: TemplatePageProps) {
  const [tab, setTab] = useState("All Reviews");
  const shown = tab === "All Reviews" ? REVIEWS : REVIEWS.filter((r) => r.cat === tab);

  return (
    <main className="aria font-inter bg-[var(--a-cream)] text-[var(--a-ink)]">
      {/* ── Hero (overlay banner, blog-style) ── */}
      <section className="relative h-[230px] w-full overflow-hidden bg-[#f1e8db] sm:h-[260px] md:h-[290px]">
        {/* Full-bleed flatlay, anchored right; the left fades to cream for the text. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMG} alt="Thank you for trusting us with your special moments." className="absolute inset-0 h-full w-full object-cover object-right" />
        {/* Left→right readability gradient, matched to the hero's warm cream. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f1e8db] via-[#f1e8db]/85 to-transparent md:via-[#f1e8db]/70" />
        {/* Content overlay, aligned to the site grid */}
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full w-full max-w-[1200px] items-center px-5 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14">
            <div className="max-w-xl">
              <Reveal><p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--a-green)]">Client Reviews</p></Reveal>
              <Reveal delay={0.06}>
                <h1 className="font-playfair mt-3 text-[2.4rem] font-bold leading-[1.15] text-[var(--a-ink)] md:text-[2.75rem]">
                  Trusted by clients,<br /><em className="font-script text-[38px] font-normal normal-case not-italic leading-none text-[var(--a-green)] md:text-[48px]">loved for memories.</em>
                </h1>
              </Reveal>
              <Reveal delay={0.12}><p className="mt-4 max-w-md text-[15px] leading-7 text-[var(--a-body)]">We don&apos;t just take photos, we create experiences. Here&apos;s what our amazing clients have to say.</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Rating summary (pulled up to overlap the hero banner) ── */}
      <Wrap className="relative z-10 -mt-6 md:-mt-8">
        <Reveal>
          <div className="grid gap-8 rounded-2xl border border-[var(--a-line)] bg-white p-6 shadow-sm md:grid-cols-[0.9fr_1.3fr_1.1fr] md:p-8">
            <div className="text-center md:border-r md:border-[var(--a-line)]">
              <div className="text-sm font-bold text-[var(--a-ink)]">Overall Rating</div>
              <div className="mt-1 flex items-end justify-center gap-1"><span className="text-[3rem] font-extrabold leading-none text-[var(--a-ink)]">4.9</span><span className="mb-2 text-lg text-[var(--a-body)]">/5</span></div>
              <div className="mt-1 flex justify-center"><Stars /></div>
              <div className="mt-1 text-xs text-[var(--a-body)]">(250+ Reviews)</div>
            </div>
            <div className="flex flex-col justify-center gap-2 md:px-6">
              {BARS.map((b) => (
                <div key={b.s} className="flex items-center gap-3 text-xs">
                  <span className="w-12 shrink-0 text-[var(--a-body)]">{b.s} Stars</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#eceae4]"><motion.div initial={{ width: 0 }} whileInView={{ width: `${b.p}%` }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }} className="h-full rounded-full bg-[var(--a-green-2)]" /></div>
                  <span className="w-8 shrink-0 text-right font-semibold text-[var(--a-ink)]">{b.p}%</span>
                </div>
              ))}
            </div>
            <div className="relative rounded-xl bg-[var(--a-green-soft)]/70 p-5">
              <Quote width={26} height={26} className="text-[var(--a-green)]/40" />
              <p className="mt-1 text-sm leading-6 text-[var(--a-ink)]">Our goal is to make every client feel confident, comfortable and completely in love with their photos.</p>
              <p className="mt-3 text-xs font-semibold text-[var(--a-green)]">– High On Innovation Team</p>
            </div>
          </div>
        </Reveal>
      </Wrap>

      {/* ── Filter tabs ── */}
      <Wrap className="mt-10">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5 px-2">
          {TABS.map((t) => {
            const on = t.name === tab;
            const Icon = t.icon;
            return (
              <button key={t.name} onClick={() => setTab(t.name)}
                className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition",
                  on ? "border-[var(--a-green-2)] bg-[var(--a-green-2)] text-white" : "border-[var(--a-line)] bg-white text-[var(--a-body)] hover:border-[var(--a-green)]/40 hover:text-[var(--a-green)]")}>
                <Icon width={15} height={15} /> {t.name}
              </button>
            );
          })}
        </div>
      </Wrap>

      {/* ── Review cards ── */}
      <Wrap className="mt-6">
        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => (
            <motion.div key={r.name} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative flex flex-col rounded-2xl border border-[var(--a-line)] bg-white p-6 shadow-sm">
              <Quote width={30} height={30} className="absolute right-5 top-5 text-[var(--a-green-faint)]" fill="currentColor" />
              <Stars />
              <p className="mt-3 flex-1 text-sm leading-6 text-[var(--a-ink)]/85">{r.text}</p>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--a-line)] pt-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt={r.name} className="h-10 w-10 rounded-full object-cover" />
                  <div><div className="text-sm font-bold text-[var(--a-ink)]">{r.name}</div><div className="text-xs text-[var(--a-body)]">{r.role}</div><div className="text-xs text-[var(--a-body)]">{r.city}</div></div>
                </div>
                <div className="whitespace-nowrap text-[11px] text-[var(--a-body)]">{r.date}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 flex justify-center">
          <a href="#" className="inline-flex items-center gap-2 rounded-full border border-[var(--a-green)]/40 bg-white px-6 py-3 text-sm font-bold text-[var(--a-green)] transition hover:bg-[var(--a-green-soft)]">View more reviews <ArrowRight width={15} height={15} /></a>
        </div>
      </Wrap>

      {/* ── Photo Reviews ── */}
      <Wrap className="mt-10">
        <Reveal>
          <div className="rounded-2xl border border-[var(--a-line)] bg-[#f6f7f5] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--a-green-soft)] text-[var(--a-green)]"><ImageIcon width={17} height={17} /></span>
                <div><div className="text-sm font-bold text-[var(--a-ink)]">Photo Reviews</div><div className="text-xs text-[var(--a-body)]">Moments shared by our wonderful clients</div></div>
              </div>
              <a href="#" className="inline-flex items-center gap-1 text-xs font-bold text-[var(--a-green)]">View all photos <ArrowRight width={13} height={13} /></a>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {PHOTOS.map((id, i) => (
                <motion.div key={id} whileHover={{ scale: 1.04 }} className="overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u(id, 300)} alt={`Client photo ${i + 1}`} className="aspect-square w-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </Wrap>

      {/* ── Video + Stats + Review-us-on ── */}
      <Wrap className="mt-5">
        <div className="grid items-start gap-5 lg:grid-cols-[1fr_1.25fr_0.85fr]">
          {/* Video testimonial */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-[var(--a-line)] bg-[var(--a-green-soft)]/50 p-5">
              <div className="flex items-start gap-2.5">
                <ImageIcon width={18} height={18} className="mt-0.5 shrink-0 text-[var(--a-green)]" />
                <div><div className="text-sm font-bold text-[var(--a-ink)]">Client Video Testimonial</div><div className="text-xs text-[var(--a-body)]">Hear directly from our happy clients</div></div>
              </div>
              <div className="relative mt-4 overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u("1519741497674-611481863552", 600)} alt="Priya & Karan" className="h-[150px] w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/85 text-[var(--a-green-2)] shadow-lg"><Play width={22} height={22} className="fill-current" /></span></div>
                <div className="absolute bottom-3 left-3 text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]"><div className="text-sm font-bold">Priya &amp; Karan</div><div className="text-xs opacity-90">Wedding Photography</div></div>
                <span className="absolute bottom-3 right-3 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">01:32</span>
              </div>
            </div>
          </Reveal>

          {/* Stats — vertically centered 2×2 with a divider between the rows */}
          <Reveal delay={0.06} className="h-full">
            <div className="flex h-full items-center rounded-2xl border border-[var(--a-line)] bg-white px-6 py-4">
              <div className="grid w-full grid-cols-2 gap-x-8">
                {STATS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className={cn("flex items-center gap-4 py-4", i < 2 && "border-b border-[var(--a-line)]", i % 2 === 0 ? "pr-4" : "pl-4")}>
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--a-green-soft)] text-[var(--a-green)]"><Icon width={24} height={24} /></span>
                      <div><div className="text-xl font-bold leading-none text-[var(--a-ink)]">{s.value}</div><div className="mt-1 text-sm text-[var(--a-body)]">{s.label}</div></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Review us on */}
          <Reveal delay={0.12} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-[var(--a-line)] bg-white px-6 py-5">
              <h4 className="text-base font-bold text-[var(--a-ink)]">Review us on</h4>
              <p className="mt-1.5 max-w-[15rem] text-sm leading-6 text-[var(--a-body)]">Share your experience and help others choose the right photographer.</p>
              <div className="mt-4 space-y-2.5">
                <a href="#" className="flex items-center justify-between rounded-xl border border-[var(--a-line)] px-4 py-2.5 transition hover:bg-[#f6f7f5]">
                  <span className="flex items-center gap-3 text-sm font-bold text-[var(--a-ink)]"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[13px] font-black shadow-sm ring-1 ring-[var(--a-line)]" style={{ color: "#4285F4" }}>G</span> Google Reviews</span>
                  <ExternalLink width={15} height={15} className="text-[var(--a-body)]" />
                </a>
                <a href="#" className="flex items-center justify-between rounded-xl border border-[var(--a-line)] px-4 py-2.5 transition hover:bg-[#f6f7f5]">
                  <span className="flex items-center gap-3 text-sm font-bold text-[var(--a-ink)]"><span className="flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-black text-white" style={{ background: "#1877F2" }}>f</span> Facebook Reviews</span>
                  <ExternalLink width={15} height={15} className="text-[var(--a-body)]" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Wrap>

      {/* ── CTA band ── */}
      <Wrap className="py-10">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-[var(--a-green-soft)] to-[#eef3f0] px-6 py-6 md:flex-row md:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--a-green)] shadow-sm"><Camera width={20} height={20} /></span>
              <div>
                <h4 className="text-base font-bold text-[var(--a-ink)]">Ready to create your own beautiful memories?</h4>
                <p className="text-sm text-[var(--a-body)]">Let&apos;s capture your moments that last a lifetime.</p>
              </div>
            </div>
            <a href="#" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[var(--a-green-2)] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--a-green)]">Book Your Session <ArrowRight width={16} height={16} /></a>
          </div>
        </Reveal>
      </Wrap>
    </main>
  );
}
