"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart, Users, Baby, Shirt, Briefcase, Package as PackageIcon, PartyPopper, Camera,
  Check, Star, MessageCircle, ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import type { PackageItem } from "@/templates/types";
import type { Photo } from "@/lib/data";
import { TiltCard } from "@/components/site/anim";

function catIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("pre")) return Users;
  if (n.includes("wed")) return Heart;
  if (n.includes("matern")) return Baby;
  if (n.includes("fashion")) return Shirt;
  if (n.includes("corp")) return Briefcase;
  if (n.includes("prod")) return PackageIcon;
  if (n.includes("event")) return PartyPopper;
  return Camera;
}

export function PackagesView({
  packages,
  categories,
  portfolio,
}: {
  packages: PackageItem[];
  categories: string[];
  portfolio: Photo[];
}) {
  const cats = categories.length ? categories : ["Wedding"];
  const [active, setActive] = useState(cats[0]);
  const ActiveIcon = catIcon(active);

  const tierBadge = (p: PackageItem, i: number) => (p.popular ? "Most Popular" : i === 0 ? "Essential" : "Premium");

  return (
    <>
      {/* Category tabs */}
      <div className="mx-auto mb-12 flex max-w-5xl flex-wrap items-center justify-center gap-1.5 rounded-full border border-border bg-card p-2 shadow-sm">
        {cats.map((c) => {
          const Icon = catIcon(c);
          const on = c === active;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full py-1.5 text-sm font-semibold transition",
                on ? "border border-brand-300 bg-white pl-1.5 pr-4 font-bold text-foreground shadow-sm" : "px-4 py-2.5 text-muted-foreground hover:text-brand-700"
              )}
            >
              {on ? (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-700 text-white"><Icon width={15} height={15} /></span>
              ) : (
                <Icon width={16} height={16} className="text-foreground/55" />
              )}
              {c}
            </button>
          );
        })}
      </div>

      {/* Category heading */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100"><ActiveIcon width={22} height={22} /></span>
          <div>
            <h3 className="text-xl font-extrabold text-foreground">{active} Photography Packages</h3>
            <p className="text-sm text-muted-foreground">From intimate ceremonies to grand celebrations, we capture every emotion beautifully.</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3.5 py-1.5 text-sm font-bold text-gold-500">
          <Star width={15} height={15} className="fill-current" /> 4.9/5 <span className="font-medium text-muted-foreground">(180+ Reviews)</span>
        </div>
      </div>

      {/* Package cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {packages.map((p, i) => {
            const img = p.images?.[0] || portfolio[i % portfolio.length]?.src;
            const popular = p.popular;
            return (
              <div key={p.id} className="perspective">
                <TiltCard intensity={popular ? 5 : 7} glare={false} className="preserve-3d h-full">
                  <div className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-[1.4rem] border bg-card shadow-sm lift",
                    popular ? "border-gold-500/70 ring-2 ring-gold-500/20 lg:-mt-3 lg:mb-0" : "border-border"
                  )}>
                    <div className="shine relative aspect-[16/10] overflow-hidden p-2.5">
                      <div className="h-full w-full overflow-hidden rounded-xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      </div>
                      <span className={cn(
                        "absolute right-5 top-5 rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow",
                        popular ? "bg-gold-500" : "bg-brand-700"
                      )}>{tierBadge(p, i)}</span>
                    </div>
                    <div className="flex flex-1 flex-col px-6 pb-6 pt-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{p.duration}</div>
                          <h4 className="mt-1 text-xl font-extrabold text-foreground">{p.name}</h4>
                        </div>
                        <div className="text-right">
                          <div className="display-title text-2xl text-foreground">{p.price}</div>
                          <div className="text-[10px] font-semibold uppercase text-muted-foreground">Starting from</div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">{p.bestFor}</p>
                      <ul className="mt-5 grid flex-1 grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                        {p.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-1.5 text-[13px] text-foreground/80">
                            <Check width={15} height={15} className="mt-0.5 shrink-0 text-brand-600" /> {inc}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <Link href="/booking" className={cn(
                          "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-sm font-bold transition",
                          popular ? "bg-gold-500 text-white hover:brightness-95" : "bg-brand-700 text-white hover:bg-brand-800"
                        )}>Book this package</Link>
                        <Link href={`/packages/${p.id}`} className={cn(
                          "inline-flex items-center justify-center gap-1.5 rounded-lg border px-4 py-3 text-sm font-bold transition",
                          popular ? "border-gold-500/60 text-gold-500 hover:bg-cream-100" : "border-brand-300 text-brand-700 hover:bg-brand-50"
                        )}>View details</Link>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Consultation CTA */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-border bg-muted/50 px-6 py-6 md:flex-row md:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100"><Camera width={20} height={20} /></span>
          <div>
            <h4 className="text-base font-bold text-foreground">Not sure which package is right for you?</h4>
            <p className="text-sm text-muted-foreground">Let&apos;s understand your needs and suggest the perfect package.</p>
          </div>
        </div>
        <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-700 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-800">
          <MessageCircle width={16} height={16} /> Book a Free Consultation <ChevronRight width={16} height={16} />
        </Link>
      </div>
    </>
  );
}
