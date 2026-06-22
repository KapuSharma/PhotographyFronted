import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Package } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PackageCard({
  pkg,
  ctaLabel = "Choose package",
}: {
  pkg: Package;
  ctaLabel?: string;
}) {
  return (
    <Card className="relative overflow-visible">
      <div className={cn("relative p-6", pkg.popular && "rounded-2xl ring-2 ring-brand-500")}>
        {pkg.popular ? (
          <span className="absolute -top-3 left-6">
            <Badge tone="teal">Most booked</Badge>
          </span>
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {pkg.duration}
        </p>
        <Link href={`/packages/${pkg.id}`} className="group">
          <h3 className="mt-1 text-xl font-extrabold text-foreground transition group-hover:text-brand-700">
            {pkg.name}
          </h3>
        </Link>
        <p
          className={cn(
            "mt-2 text-3xl font-extrabold tracking-tight",
            pkg.popular ? "text-brand-600" : "text-foreground"
          )}
        >
          {pkg.price}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{pkg.bestFor}</p>
        <ul className="mt-4 space-y-2">
          {pkg.includes.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check width={16} height={16} className="text-emerald-500" />
              {item}
            </li>
          ))}
        </ul>
        <Button asChild variant={pkg.popular ? "primary" : "ghost"} className="mt-5 w-full">
          <Link href="/booking">{ctaLabel}</Link>
        </Button>
        <Link
          href={`/packages/${pkg.id}`}
          className="mt-3 inline-flex w-full items-center justify-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          View details <ArrowRight width={15} height={15} />
        </Link>
      </div>
    </Card>
  );
}
