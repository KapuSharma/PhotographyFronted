"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart, Users, Baby, Shirt, Briefcase, Package as PackageIcon, PartyPopper, Camera,
  Star, CircleCheck, ArrowRight, Clock, Bookmark,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn, plainSummary } from "@/lib/utils";
import type { ServiceItem } from "@/templates/types";
import type { Photo } from "@/lib/data";
import { TiltCard } from "@/components/site/anim";
import { AskAiButton } from "@/components/site/ask-ai-button";

function svcIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("pre")) return Users;
  if (n.includes("wed")) return Heart;
  if (n.includes("matern")) return Baby;
  if (n.includes("fashion")) return Shirt;
  if (n.includes("corp")) return Briefcase;
  if (n.includes("prod")) return PackageIcon;
  if (n.includes("event") || n.includes("family")) return PartyPopper;
  return Camera;
}
// Stable pseudo-rating/review counts so cards feel real.
const reviewsFor = (name: string) => 60 + ((name.length * 13) % 130);
const featuresFor = (s: ServiceItem) => {
  const base = ["High Resolution Images", "Private Online Gallery", "Professional Editing", "Fast Delivery"];
  const n = s.name.toLowerCase();
  if (n.includes("wed")) return ["Full Day Coverage", "2 Photographers", "Premium Album & Box", "300+ Edited Photos", "Drone Coverage"];
  if (n.includes("pre")) return ["2 Locations", "4 Hours Session", "80+ Edited Photos", "Outfit Changes", "Cinematic Highlights"];
  if (n.includes("matern")) return ["2-3 Hours Session", "Indoor / Outdoor", "50+ Edited Photos", "Partner & Family Shots"];
  if (n.includes("corp")) return ["Headshots", "Team Photos", "Office Branding", "Events Coverage"];
  if (n.includes("prod")) return ["Multiple Angles", "White Background", "Lifestyle Shots", "Fast Delivery"];
  return base;
};

// Per-card accent (icon badge · STARTING-AT label · price · button) — matches the reference.
const ACCENTS = [
  { badge: "bg-cream-100 text-gold-500", text: "text-gold-500", btn: "bg-amber-100 text-amber-700 hover:bg-amber-200" },
  { badge: "bg-emerald-50 text-emerald-600", text: "text-emerald-600", btn: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" },
  { badge: "bg-rose-50 text-rose-500", text: "text-rose-500", btn: "bg-rose-100 text-rose-600 hover:bg-rose-200" },
  { badge: "bg-blue-50 text-blue-600", text: "text-blue-600", btn: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
  { badge: "bg-orange-50 text-orange-500", text: "text-orange-500", btn: "bg-orange-100 text-orange-600 hover:bg-orange-200" },
];

export function ServicesView({ services, portfolio }: { services: ServiceItem[]; portfolio: Photo[] }) {
  const featured = services[0];
  const [active, setActive] = useState("All Services");
  const tabs = ["All Services", ...services.map((s) => s.name)];
  const shown = active === "All Services" ? services : services.filter((s) => s.name === active);
  const FeaturedIcon = featured ? svcIcon(featured.name) : Camera;

  return (
    <>
      {/* Featured service */}
      {featured ? (
        <div className="perspective mb-8">
          <TiltCard intensity={4} glare={false} className="preserve-3d">
            <div className="grid overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-lg md:grid-cols-2">
              <div className="shine relative aspect-[16/11] overflow-hidden md:aspect-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.images?.[0] || featured.photo.src} alt={featured.name} className="h-full w-full object-cover" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow"><Star width={12} height={12} className="fill-current" /> Most Popular</span>
              </div>
              <div className="flex flex-col justify-center p-7 md:p-9">
                <div className="flex items-center gap-2 text-brand-600"><FeaturedIcon width={22} height={22} /><h3 className="text-2xl font-extrabold text-foreground">{featured.name} Photography</h3></div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center gap-1 font-bold text-gold-500"><Star width={14} height={14} className="fill-current" /> 4.9</span>
                  <span className="text-muted-foreground">({reviewsFor(featured.name)} Reviews)</span>
                </div>
                <div className="mt-4 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Starting at</div>
                <div className="display-title text-3xl text-brand-700">{featured.from || "—"}</div>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{plainSummary(featured.desc)}</p>
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                  {featuresFor(featured).slice(0, 5).map((f) => (
                    <span key={f} className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/70"><CircleCheck width={14} height={14} className="text-brand-600" /> {f}</span>
                  ))}
                </div>
                <Link href={`/services/${featured.id}`} className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-800">
                  View Package Details <ArrowRight width={16} height={16} />
                </Link>
              </div>
            </div>
          </TiltCard>
        </div>
      ) : null}

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap items-center gap-2 rounded-full border border-border bg-card p-2 shadow-sm">
        {tabs.map((t) => {
          const on = t === active;
          const Icon = t === "All Services" ? Bookmark : svcIcon(t);
          return (
            <button key={t} onClick={() => setActive(t)} className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition",
              on ? "bg-brand-600 text-white shadow-md shadow-brand-600/25" : "text-muted-foreground hover:text-brand-700"
            )}>
              <Icon width={15} height={15} /> {t}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {shown.map((s, i) => {
            const Icon = svcIcon(s.name);
            const a = ACCENTS[i % ACCENTS.length];
            // Always show exactly 3 thumbnails: the service's own images first,
            // then top up from the portfolio so every card looks uniform.
            const thumbs = [...(s.images || []), ...portfolio.map((p) => p.src)]
              .filter(Boolean)
              .slice(0, 3);
            return (
              <div key={s.id} className="perspective">
                <TiltCard intensity={7} glare={false} className="preserve-3d h-full">
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm lift">
                    <div className="relative">
                      <div className="shine relative aspect-[4/3] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.images?.[0] || s.photo.src} alt={s.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        <span className={cn("absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow ring-2 ring-white", a.badge)}><Icon width={16} height={16} /></span>
                        {i === 0 ? <Bookmark width={20} height={20} className="absolute right-3 top-3 fill-gold-500 text-gold-500 drop-shadow" /> : null}
                      </div>
                      {/* 3 small framed thumbnails overlapping the bottom edge of the image */}
                      <div className="absolute inset-x-3 -bottom-7 z-10 grid grid-cols-3 gap-2">
                        {thumbs.map((t, ti) => (
                          <div key={ti} className="overflow-hidden rounded-lg shadow-md ring-2 ring-white">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={t} alt="" className="h-14 w-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col px-4 pb-4 pt-11">
                      <h4 className="text-base font-bold text-foreground">{s.name} Photography</h4>
                      <div className="mt-1 flex items-center gap-1 text-xs"><Star width={12} height={12} className="fill-gold-500 text-gold-500" /><span className="font-bold text-foreground">4.9</span><span className="text-muted-foreground">({reviewsFor(s.name)})</span></div>
                      <div className={cn("mt-2 text-[10px] font-bold uppercase tracking-wide", a.text)}>Starting at</div>
                      <div className={cn("text-xl font-extrabold", a.text)}>{s.from || "—"}</div>
                      <ul className="mt-2.5 flex-1 space-y-1.5">
                        {featuresFor(s).slice(0, 5).map((f) => (
                          <li key={f} className="flex items-center gap-1.5 text-xs text-foreground/70"><CircleCheck width={13} height={13} className="shrink-0 text-brand-600" /> {f}</li>
                        ))}
                      </ul>
                      <Link href={`/services/${s.id}`} className={cn("mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-bold transition", a.btn)}>
                        View Packages <ArrowRight width={14} height={14} />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* CTA row */}
      <div className="mt-10 grid gap-4 rounded-[1.5rem] border border-border bg-muted/50 p-5 md:grid-cols-2 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100"><Star width={18} height={18} /></span>
            <div>
              <h4 className="text-sm font-bold text-foreground">Not sure which package suits you?</h4>
              <p className="text-xs text-muted-foreground">Let our AI assistant help you find the perfect fit.</p>
            </div>
          </div>
          <AskAiButton label="Ask AI Assistant" icon="bot" className="shrink-0 rounded-full border border-brand-200 bg-card px-4 py-2.5 text-brand-700 hover:bg-brand-50" />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100"><Clock width={18} height={18} /></span>
            <div>
              <h4 className="text-sm font-bold text-foreground">Need a custom package?</h4>
              <p className="text-xs text-muted-foreground">Let&apos;s discuss and create something perfect for you.</p>
            </div>
          </div>
          <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800">Book a Consultation</Link>
        </div>
      </div>
    </>
  );
}
