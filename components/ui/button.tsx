import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      // Mirrors the prototype's BTN map
      variant: {
        primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
        soft: "bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-100",
        ghost: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
        subtle: "bg-slate-100 text-slate-700 hover:bg-slate-200",
        dark: "bg-slate-900 text-white hover:bg-slate-800",
      },
      size: {
        default: "px-4 py-2.5",
        sm: "px-3 py-1.5 text-xs",
        icon: "h-10 w-10 p-0",
        pill: "px-5 py-3 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
