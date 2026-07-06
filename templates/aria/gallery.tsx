"use client";

/* =====================================================================
   "Aria" template — Gallery page (FRONTEND ONLY).
   Placeholder data + image slots, ready for CMS wiring. Uses the scoped
   .aria palette (globals.css) + shared motion primitives (./motion).
   ===================================================================== */

import { useState } from "react";
import {
  Camera, Star, Heart, Images, MessageCircle, Share2, ShieldCheck, ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Reveal, Stagger, StaggerItem, Tilt, EASE } from "./motion";
import { CommonSections } from "./common";
import type { TemplatePageProps } from "@/templates/types";

/* ── image slots (placeholder Unsplash) ── */
const u = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const P = {
  prewed: u("1583939003579-730e3918a45a"),
  wedding: u("1519741497674-611481863552"),
  maternity: u("1529626455594-4ff0802cfb7e"),
  fashion: u("1487412720507-e7ab37603c6f"),
  bride: u("1519225421980-715cb0215aed"),
  corporate: u("1522071820081-009f0129c71c"),
  product: u("1542291026-7eec264c27ff"),
  event: u("1511795409834-ef04bbd61622"),
  contactBg: u("1452587925148-ce544e77e70d", 1200),
  // Hero collage slots (placeholder — swap freely).
  camera: u("1516035069371-29a1b244cc32", 900),
  hiker: u("1500648767791-00dcc994a43e"),
};

/* ── data ── */
const CATEGORIES = ["All", "Wedding", "Pre-Wedding", "Fashion", "Maternity", "Corporate", "Product", "Event"];
const GALLERY: { title: string; category: string; count: number; img: string }[] = [
  { title: "Riverside Pre-Wedding", category: "Pre-Wedding", count: 36, img: P.prewed },
  { title: "Harbour Wedding", category: "Wedding", count: 48, img: P.wedding },
  { title: "Golden Maternity", category: "Maternity", count: 32, img: P.maternity },
  { title: "Studio Fashion", category: "Fashion", count: 28, img: P.fashion },
  { title: "Bridal Portrait", category: "Wedding", count: 42, img: P.bride },
  { title: "Corporate Team", category: "Corporate", count: 30, img: P.corporate },
  { title: "Product Shoot", category: "Product", count: 26, img: P.product },
  { title: "Event Celebration", category: "Event", count: 40, img: P.event },
];
const HERO_STATS: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Camera, value: "1200+", label: "Photos" },
  { icon: Star, value: "8+", label: "Years Experience" },
  { icon: Heart, value: "500+", label: "Happy Clients" },
];
const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Camera, title: "Professional Setup", text: "Top of the line cameras and lighting." },
  { icon: MessageCircle, title: "Fast Delivery", text: "Quick turnaround with premium quality." },
  { icon: Share2, title: "Personalized Service", text: "Every shoot is tailored to your story." },
  { icon: ShieldCheck, title: "Secure & Private", text: "Your photos are safe and always private." },
];

/* Hero collage: scattered white-bordered photo cards on the right (inline
   styles so size/pos/rotation stay dynamic — Tailwind can't JIT them). */
const CARDS: { img: string; w: number; left: string; top: string; rot: number; gray?: boolean }[] = [
  { img: P.fashion, w: 150, left: "26%", top: "7%", rot: -8 },              // woman in hat / fashion
  { img: P.corporate, w: 86, left: "17%", top: "40%", rot: -15 },           // small studio card
  { img: P.wedding, w: 214, left: "33%", top: "30%", rot: 5 },              // romantic couple (largest)
  { img: P.hiker, w: 114, left: "66%", top: "50%", rot: 10, gray: true },   // B&W landscape
];

/* ── shared wrappers ── */
const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14 ${className}`}>{children}</section>
);

export default function AriaGallery(_props: TemplatePageProps) {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  return (
    <main className="aria font-inter bg-[var(--a-cream)] text-[var(--a-ink)]">
      {/* ── Hero (linen backdrop + scattered photo collage) ── */}
      <section className="relative min-h-[340px] w-full overflow-hidden md:min-h-[430px]" style={{ background: "linear-gradient(115deg, #f3ede3 0%, #faf6ef 55%, #fdfbf7 100%)" }}>
        {/* Scattered white-bordered photo cards — right half (hidden on mobile) */}
        <div className="absolute inset-y-0 right-0 hidden w-[56%] md:block">
          <div className="relative h-full">
            {CARDS.map((c, i) => (
              <div key={i} className="absolute rounded-sm bg-white p-2 shadow-[0_16px_36px_-12px_rgba(30,20,10,0.35)]"
                style={{ left: c.left, top: c.top, width: c.w, transform: `rotate(${c.rot}deg)` }}>
                <div className="overflow-hidden rounded-[2px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt="" className={`aspect-[4/5] w-full object-cover ${c.gray ? "grayscale" : ""}`} />
                </div>
              </div>
            ))}
            {/* fade the collage's left edge into the backdrop */}
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, #f6f0e7 0%, rgba(246,240,231,0) 26%)" }} />
          </div>
        </div>
        {/* Text content — left */}
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full w-full max-w-[1200px] items-center px-5 py-6 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14">
            <div className="max-w-xl md:max-w-[48%]">
              <Reveal><p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--a-green)]"><ArrowRight width={12} height={12} /> Our Gallery</p></Reveal>
              <Reveal delay={0.06}><h1 className="font-playfair mt-2 text-[2.4rem] font-bold leading-[1.15] text-[var(--a-ink)] md:text-[2.75rem]">Gallery</h1></Reveal>
              <Reveal delay={0.12}><p className="mt-3 max-w-md text-[15px] leading-7 text-[var(--a-body)]">A collection of real moments, captured with creativity and passion.</p></Reveal>
              <Stagger className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
                {HERO_STATS.map((s) => (
                  <StaggerItem key={s.label} className="flex items-center gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--a-green-soft)] text-[var(--a-green)]"><s.icon width={18} height={18} /></span>
                    <div>
                      <div className="text-base font-extrabold text-[var(--a-green)]">{s.value}</div>
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--a-body)]">{s.label}</div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal delay={0.2} className="mt-5">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button key={c} onClick={() => setFilter(c)}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                        filter === c ? "bg-[var(--a-green-2)] text-white shadow-sm"
                        : "border border-[var(--a-line)] bg-white/80 text-[var(--a-body)] shadow-sm backdrop-blur hover:border-[var(--a-green)] hover:text-[var(--a-green)]"
                      }`}>{c}</button>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filterable grid ── */}
      <Wrap className="py-10">
        <Reveal>
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {shown.map((g) => (
                <motion.div key={g.title} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.4, ease: EASE }}>
                  <div className="aria-perspective">
                    <Tilt intensity={6} lift={false} className="aria-preserve-3d">
                      <div className="group relative aspect-[16/10] overflow-hidden rounded-xl shadow-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={g.img} alt={g.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                        <span className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1 rounded-md bg-black/45 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
                          <Images width={13} height={13} /> {g.count}
                        </span>
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <div className="text-[13px] font-bold text-white">{g.title}</div>
                          <div className="text-xs text-white/70">{g.category}</div>
                        </div>
                      </div>
                    </Tilt>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Reveal>
        {shown.length === 0 ? <p className="py-14 text-center text-sm text-[var(--a-body)]">No photos in this category yet.</p> : null}

        <Reveal className="mt-10 text-center">
          <a href="#" className="inline-flex items-center gap-2 rounded-full border border-[var(--a-green)]/40 bg-white px-6 py-3 text-sm font-bold text-[var(--a-green)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--a-green)] hover:text-white">
            View more photos <ArrowRight width={15} height={15} />
          </a>
        </Reveal>
      </Wrap>

      {/* ── Features band + project CTA ── */}
      <Wrap className="pb-12">
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl border border-[var(--a-line)] bg-[var(--a-green-soft)]/45 lg:grid-cols-[1fr_auto]">
            {/* 4 features — icon left, text right, subtle vertical dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x sm:divide-[var(--a-line)] lg:grid-cols-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-3 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--a-green-soft)] text-[var(--a-green)]"><f.icon width={18} height={18} /></span>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--a-ink)]">{f.title}</h4>
                    <p className="mt-1 text-xs leading-5 text-[var(--a-body)]">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* green CTA card filling the right */}
            <div className="flex flex-col justify-center bg-[var(--a-green-2)] p-6 text-white lg:min-w-[300px]">
              <h4 className="font-playfair text-lg font-bold">Have a project in mind?</h4>
              <p className="mt-1.5 text-sm text-white/70">Let&apos;s create something beautiful together.</p>
              <a href="#" className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-white/40 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-[var(--a-green-2)]">
                Contact us <ArrowRight width={15} height={15} />
              </a>
            </div>
          </div>
        </Reveal>
      </Wrap>

      {/* ── Common lower-page sections (each CMS-toggleable later) ── */}
      <CommonSections />
    </main>
  );
}
