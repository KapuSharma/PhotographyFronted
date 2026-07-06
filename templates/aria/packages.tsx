"use client";

/* =====================================================================
   "Aria" template — Packages page (FRONTEND ONLY).
   Placeholder data, ready for CMS wiring. Uses the scoped .aria palette
   + shared motion primitives.
   ===================================================================== */

import { useState } from "react";
import {
  Heart, Users, Baby, Shirt, Briefcase, Package as PackageIcon, PartyPopper,
  Camera, Check, Star, MessageCircle, ChevronRight, type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Reveal, EASE } from "./motion";
import type { TemplatePageProps } from "@/templates/types";

const u = (id: string, w = 700) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const CATEGORIES: { name: string; icon: LucideIcon }[] = [
  { name: "Wedding", icon: Heart }, { name: "Pre-Wedding", icon: Users }, { name: "Maternity", icon: Baby },
  { name: "Fashion", icon: Shirt }, { name: "Corporate", icon: Briefcase }, { name: "Product", icon: PackageIcon }, { name: "Event", icon: PartyPopper },
];

type Pkg = { badge: string; duration: string; name: string; price: string; desc: string; includes: string[]; img: string; popular?: boolean };
const PACKAGES: Pkg[] = [
  { badge: "Essential", duration: "2 Hours", name: "Essential Frame", price: "₹18,000", desc: "Perfect for intimate ceremonies and small celebrations.", includes: ["25 Edited Images", "Private Online Gallery", "1 Photographer", "7-Day Delivery", "1 Location"], img: u("1519741497674-611481863552") },
  { badge: "Most Popular", duration: "Half Day", name: "Signature Story", price: "₹50,000", desc: "Ideal for pre-wedding, fashion, events and brand shoots.", includes: ["120 Edited Images", "Client Selection Flow", "2 Photographers", "48-Hour Sneak Peek", "2 Locations"], img: u("1583939003579-730e3918a45a"), popular: true },
  { badge: "Premium", duration: "Full Day", name: "Legacy Coverage", price: "₹1,20,000", desc: "Complete coverage for weddings and destination events.", includes: ["400+ Edited Images", "Premium Album", "2 Photographers", "Full Delivery Suite", "All Day Coverage"], img: u("1519225421980-715cb0215aed") },
];

const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14 ${className}`}>{children}</section>
);
const cn = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export default function AriaPackages(_props: TemplatePageProps) {
  const [active, setActive] = useState("Wedding");
  const ActiveIcon = CATEGORIES.find((c) => c.name === active)?.icon ?? Heart;

  return (
    <main className="aria font-inter bg-[var(--a-cream)] text-[var(--a-ink)]">
      {/* ── Hero ── */}
      <Wrap className="py-14 text-center md:py-16">
        <Reveal><p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--a-green)]">Our Packages</p></Reveal>
        <Reveal delay={0.06}><h1 className="font-playfair mt-3 text-[clamp(2.2rem,4.6vw,3.4rem)] font-bold text-[var(--a-ink)]">Choose the Perfect Package</h1></Reveal>
        <Reveal delay={0.12}><p className="mx-auto mt-3 max-w-2xl text-[15px] leading-7 text-[var(--a-body)]">Every moment is unique. Pick a package that fits your story and let us create memories that last forever.</p></Reveal>
        <Reveal delay={0.16}>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--a-gold)]/70" />
            <Camera width={20} height={20} className="text-[var(--a-gold)]" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--a-gold)]/70" />
          </div>
        </Reveal>
      </Wrap>

      {/* ── Category tabs ── */}
      <Wrap>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-1.5 rounded-full border border-[var(--a-line)] bg-white p-2 shadow-sm">
          {CATEGORIES.map((c) => {
            const on = c.name === active;
            const Icon = c.icon;
            return (
              <button key={c.name} onClick={() => setActive(c.name)}
                className={cn("inline-flex items-center gap-2 rounded-full py-1.5 text-sm font-semibold transition",
                  on ? "border border-[var(--a-green)]/40 bg-white pl-1.5 pr-4 font-bold text-[var(--a-ink)] shadow-sm" : "px-4 py-2.5 text-[var(--a-body)] hover:text-[var(--a-green)]")}>
                {on ? <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--a-green-2)] text-white"><Icon width={15} height={15} /></span> : <Icon width={16} height={16} className="text-[var(--a-body)]/60" />}
                {c.name}
              </button>
            );
          })}
        </div>
      </Wrap>

      {/* ── Section heading ── */}
      <Wrap className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--a-green-soft)] text-[var(--a-green)]"><ActiveIcon width={22} height={22} /></span>
            <div>
              <h3 className="font-playfair text-xl font-bold text-[var(--a-ink)]">{active} Photography Packages</h3>
              <p className="text-sm text-[var(--a-body)]">From intimate ceremonies to grand celebrations, we capture every emotion beautifully.</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f7efdf] px-3.5 py-1.5 text-sm font-bold text-[var(--a-gold)]">
            <Star width={15} height={15} className="fill-current" /> 4.9/5 <span className="font-medium text-[var(--a-body)]">(180+ Reviews)</span>
          </div>
        </div>
      </Wrap>

      {/* ── Package cards ── */}
      <Wrap className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: EASE }} className="grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((p) => {
              const pop = p.popular;
              return (
                <motion.div key={p.name} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={cn("flex h-full flex-col overflow-hidden rounded-[1.4rem] border bg-white shadow-sm", pop ? "border-[var(--a-gold)]/70 ring-2 ring-[var(--a-gold)]/20 lg:-mt-3" : "border-[var(--a-line)]")}>
                  <div className="relative p-2.5">
                    <div className="overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.img} alt={p.name} className="aspect-[16/10] w-full object-cover" />
                    </div>
                    <span className={cn("absolute right-5 top-5 rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow", pop ? "bg-[var(--a-gold)]" : "bg-[var(--a-green-2)]")}>{p.badge}</span>
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wide text-[var(--a-body)]">{p.duration}</div>
                        <h4 className="font-playfair mt-1 text-xl font-bold text-[var(--a-ink)]">{p.name}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[var(--a-ink)]">{p.price}</div>
                        <div className="text-[10px] font-semibold uppercase text-[var(--a-body)]">Starting from</div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[var(--a-body)]">{p.desc}</p>
                    <ul className="mt-5 grid flex-1 grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                      {p.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-1.5 text-[13px] text-[var(--a-ink)]/80"><Check width={15} height={15} className="mt-0.5 shrink-0 text-[var(--a-green)]" /> {inc}</li>
                      ))}
                    </ul>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <a href="#" className={cn("inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-bold text-white transition", pop ? "bg-[var(--a-gold)] hover:brightness-95" : "bg-[var(--a-green-2)] hover:bg-[var(--a-green)]")}>Book this package</a>
                      <a href="#" className={cn("inline-flex items-center justify-center rounded-lg border px-4 py-3 text-sm font-bold transition", pop ? "border-[var(--a-gold)]/60 text-[var(--a-gold)] hover:bg-[#faf5ec]" : "border-[var(--a-green)]/40 text-[var(--a-green)] hover:bg-[var(--a-green-soft)]")}>View details</a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </Wrap>

      {/* ── Consultation CTA ── */}
      <Wrap className="py-12">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-[var(--a-green-soft)]/60 px-6 py-6 md:flex-row md:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[var(--a-green)] shadow-sm"><Camera width={20} height={20} /></span>
              <div>
                <h4 className="text-base font-bold text-[var(--a-ink)]">Not sure which package is right for you?</h4>
                <p className="text-sm text-[var(--a-body)]">Let&apos;s understand your needs and suggest the perfect package.</p>
              </div>
            </div>
            <a href="#" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[var(--a-green-2)] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--a-green)]">
              <MessageCircle width={16} height={16} /> Book a Free Consultation <ChevronRight width={16} height={16} />
            </a>
          </div>
        </Reveal>
      </Wrap>
    </main>
  );
}
