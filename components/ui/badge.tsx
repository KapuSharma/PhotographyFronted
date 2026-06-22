import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold [&_svg]:shrink-0",
  {
    variants: {
      // Mirrors the prototype's TONE map
      tone: {
        teal: "bg-brand-50 text-brand-700 border-brand-100",
        amber: "bg-amber-50 text-amber-700 border-amber-100",
        violet: "bg-violet-50 text-violet-700 border-violet-100",
        rose: "bg-rose-50 text-rose-700 border-rose-100",
        emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
        slate: "bg-slate-100 text-slate-600 border-slate-200",
        blue: "bg-blue-50 text-blue-700 border-blue-100",
      },
    },
    defaultVariants: {
      tone: "slate",
    },
  }
);

export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>["tone"]>;

function Badge({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { Badge, badgeVariants };
