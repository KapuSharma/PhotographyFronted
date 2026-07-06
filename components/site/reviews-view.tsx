"use client";

import { useState } from "react";
import { Quote, Grid3x3 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Stars } from "@/components/site/stars";
import { TiltCard } from "@/components/site/anim";

export type ReviewItem = {
  client: string;
  city: string;
  rating: number;
  text: string;
  service: string;
  date: string;
};

const CATS = ["Wedding", "Pre-Wedding", "Maternity", "Corporate", "Product", "Fashion", "Event"];

export function ReviewsView({ reviews }: { reviews: ReviewItem[] }) {
  const tabs = ["All Reviews", ...CATS];
  const [active, setActive] = useState("All Reviews");
  const shown = active === "All Reviews" ? reviews : reviews.filter((r) => r.service === active);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const on = t === active;
          return (
            <button key={t} onClick={() => setActive(t)} className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition",
              on ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/25" : "border-border bg-card text-muted-foreground hover:border-brand-200 hover:text-brand-700"
            )}>
              {t === "All Reviews" ? <Grid3x3 width={14} height={14} /> : null} {t}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((r, i) => (
            <div key={i} className="perspective">
              <TiltCard intensity={6} glare={false} className="preserve-3d h-full">
                <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm lift">
                  <div className="flex items-start justify-between">
                    <Stars n={r.rating} />
                    <Quote width={28} height={28} className="text-brand-100" />
                  </div>
                  <p className="mt-3 flex-1 text-[15px] leading-7 text-foreground/80">“{r.text}”</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{r.client.slice(0, 1)}</span>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-foreground">{r.client}</div>
                      <div className="text-xs text-muted-foreground">{r.service} Photography · {r.city}</div>
                    </div>
                    <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">{r.date}</span>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {shown.length === 0 ? <p className="py-12 text-center text-sm text-muted-foreground">No reviews in this category yet.</p> : null}
    </>
  );
}
