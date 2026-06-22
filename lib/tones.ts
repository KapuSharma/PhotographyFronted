import type { BadgeTone } from "@/components/ui/badge";

/* Same tone palette as the prototype's TONE map — for icon chips, dots, etc. */
export const TONE_CLASS: Record<BadgeTone, string> = {
  teal: "bg-brand-50 text-brand-700 border-brand-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
  blue: "bg-blue-50 text-blue-700 border-blue-100",
};

export type { BadgeTone };
