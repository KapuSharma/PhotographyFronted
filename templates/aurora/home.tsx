import Link from "next/link";
import { Calendar, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/site/section-title";
import { PhotoImage } from "@/components/site/photo-image";
import { PackageCard } from "@/components/site/package-card";
import { ReviewCard } from "@/components/site/review-card";
import { AskAiButton } from "@/components/site/ask-ai-button";
import type { TemplateHomeProps } from "@/templates/types";

const BADGE_TONES = ["emerald", "amber", "slate", "teal", "violet"] as const;

/* Aurora — the original light / teal design, fully content-driven. */
export default function AuroraHome({ content }: TemplateHomeProps) {
  const { hero, services, portfolio, packages, testimonials, sections, cta } = content;

  return (
    <main>
      {/* ---------------- Hero ---------------- */}
      {hero.active && (
      <section className="relative flex min-h-[560px] overflow-hidden sm:min-h-[620px] md:min-h-[680px] lg:min-h-[78vh] xl:min-h-[84vh] 2xl:min-h-[88vh]">
        {/* Static backdrop — guarantees the hero is never empty even when the
            crossfade animation is frozen (e.g. screenshots / reduced motion). */}
        {hero.images[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero.images[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className="hero-fade absolute inset-0">
          {hero.images.map((src, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={idx}
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/30" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-12 md:px-6 md:py-16 xl:max-w-[1536px] 2xl:max-w-[1920px] 2xl:px-12">
          <div className="max-w-2xl">
            {hero.badges.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {hero.badges.map((b, i) => (
                  <Badge key={i} tone={BADGE_TONES[i % BADGE_TONES.length]}>
                    {b}
                  </Badge>
                ))}
              </div>
            )}
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">{hero.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={hero.primaryHref || "/booking"}>
                  <Calendar width={17} height={17} />
                  {hero.primaryLabel}
                </Link>
              </Button>
              {hero.secondaryEnabled && <AskAiButton label={hero.secondaryLabel} />}
            </div>
          </div>
          {hero.marqueeEnabled && hero.marqueeImages.length > 0 && (
            <div className="mt-10 overflow-hidden rounded-2xl border border-white/30 bg-black/10 p-3 backdrop-blur">
              <div className="marquee flex w-max gap-3">
                {[...hero.marqueeImages, ...hero.marqueeImages].map((src, i) => (
                  <div
                    key={i}
                    className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl border border-white/20"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      )}

      {/* ---------------- Featured services ---------------- */}
      {sections.services.active && (
      <section className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-10 md:px-6 2xl:px-12">
        <SectionTitle
          eyebrow={sections.services.eyebrow}
          title={sections.services.title}
          desc={sections.services.desc}
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {services.map((s, i) => (
            <Link key={i} href={`/services/${s.id}`} className="group block">
              <Card className="overflow-hidden transition group-hover:shadow-md">
                <PhotoImage photo={s.photo} className="h-36 lg:h-44 2xl:h-52" />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900">{s.name}</p>
                    <span className="text-sm font-semibold text-brand-600">{s.from}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{s.desc}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      )}

      {/* ---------------- Portfolio bento ---------------- */}
      {sections.portfolio.active && (
      <section className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-10 md:px-6 2xl:px-12">
        <SectionTitle eyebrow={sections.portfolio.eyebrow} title={sections.portfolio.title} desc={sections.portfolio.desc} />
        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[180px] md:grid-cols-4 lg:auto-rows-[220px] 2xl:auto-rows-[260px]">
          {portfolio.map((p, idx) => (
            <div
              key={idx}
              className={cn(
                "relative overflow-hidden rounded-2xl",
                idx === 0 && "md:col-span-2 md:row-span-2"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.title} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Button asChild variant="ghost">
            <Link href="/gallery">View full gallery</Link>
          </Button>
        </div>
      </section>
      )}

      {/* ---------------- Packages ---------------- */}
      {sections.packages.active && (
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-12 md:px-6 2xl:px-12">
          <SectionTitle eyebrow={sections.packages.eyebrow} title={sections.packages.title} desc={sections.packages.desc} />
          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ---------------- Reviews ---------------- */}
      {sections.reviews.active && (
      <section className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-12 md:px-6 2xl:px-12">
        <SectionTitle eyebrow={sections.reviews.eyebrow} title={sections.reviews.title} desc={sections.reviews.desc} />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <ReviewCard key={i} review={t} />
          ))}
        </div>
        {testimonials.length > 3 && (
          <div className="mt-5">
            <Button asChild variant="ghost">
              <Link href="/reviews">Read all reviews</Link>
            </Button>
          </div>
        )}
      </section>
      )}

      {/* ---------------- CTA ---------------- */}
      {cta.active && (
      <section className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 pb-16 md:px-6 2xl:px-12">
        <Card>
          <div className="flex flex-col items-center gap-4 p-8 text-center md:p-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Sparkles width={24} height={24} />
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              {cta.title}
            </h3>
            <p className="max-w-md text-sm text-slate-500">{cta.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/booking">
                  <Calendar width={17} height={17} />
                  Start booking
                </Link>
              </Button>
              <AskAiButton label="Ask AI" icon="bot" />
            </div>
          </div>
        </Card>
      </section>
      )}
    </main>
  );
}
