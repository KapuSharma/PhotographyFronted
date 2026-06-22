import Link from "next/link";
import { Calendar, Check, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/site/stars";
import { AskAiButton } from "@/components/site/ask-ai-button";
import type { TemplateHomeProps } from "@/templates/types";

/* Noir — dark / gold / serif restyle. Same content as Aurora, different skin.
   Self-contained styling so it never affects the light template. */

const GOLD_BTN = "border-transparent bg-amber-400 text-slate-950 hover:bg-amber-300";
const GOLD_GHOST =
  "border-amber-400/40 bg-transparent text-amber-200 hover:bg-amber-400/10 hover:text-amber-100";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">{children}</p>
  );
}

export default function NoirHome({ content }: TemplateHomeProps) {
  const { hero, services, portfolio, packages, testimonials, studioName, sections, cta } = content;

  return (
    <main className="bg-slate-950 text-slate-200">
      {/* ---------------- Hero ---------------- */}
      {hero.active && (
      <section className="relative flex min-h-[560px] items-center overflow-hidden sm:min-h-[620px] md:min-h-[680px] lg:min-h-[78vh] xl:min-h-[84vh] 2xl:min-h-[88vh]">
        {hero.images[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.images[0]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-[0.4]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/55 to-slate-950" />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-16 text-center md:px-6">
          <Eyebrow>{studioName}</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.08] text-white md:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">{hero.subtitle}</p>
          {hero.badges.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {hero.badges.map((label, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 px-3 py-1 text-xs font-semibold text-amber-100"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className={GOLD_BTN}>
              <Link href={hero.primaryHref || "/booking"}>
                <Calendar width={17} height={17} />
                {hero.primaryLabel}
              </Link>
            </Button>
            {hero.secondaryEnabled && <AskAiButton label={hero.secondaryLabel} className={GOLD_GHOST} />}
          </div>
        </div>
      </section>
      )}

      {/* ---------------- Marquee strip ---------------- */}
      {hero.active && hero.marqueeEnabled && hero.marqueeImages.length > 0 && (
      <section className="overflow-hidden border-y border-white/5 bg-slate-950 py-4">
        <div className="marquee flex w-max gap-3">
          {[...hero.marqueeImages, ...hero.marqueeImages].map((src, i) => (
            <div
              key={i}
              className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-white/10 grayscale"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>
      )}

      {/* ---------------- Featured services ---------------- */}
      {sections.services.active && (
      <section className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-14 md:px-6 2xl:px-12">
        <div className="mb-6 text-center">
          <Eyebrow>{sections.services.eyebrow}</Eyebrow>
          <h2 className="mt-2 font-serif text-3xl font-medium text-white md:text-4xl">
            {sections.services.title}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {services.map((s, i) => (
            <Link
              key={i}
              href={`/services/${s.id}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition hover:border-amber-400/40"
            >
              <div className="h-36 overflow-hidden lg:h-44 2xl:h-52">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.photo.src}
                  alt={s.name}
                  className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="font-serif text-lg text-white">{s.name}</p>
                  <span className="text-sm font-semibold text-amber-300">{s.from}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      )}

      {/* ---------------- Portfolio bento ---------------- */}
      {sections.portfolio.active && (
      <section className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-10 md:px-6 2xl:px-12">
        <div className="mb-6 text-center">
          <Eyebrow>{sections.portfolio.eyebrow}</Eyebrow>
          <h2 className="mt-2 font-serif text-3xl font-medium text-white md:text-4xl">
            {sections.portfolio.title}
          </h2>
        </div>
        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[180px] md:grid-cols-4 lg:auto-rows-[220px] 2xl:auto-rows-[260px]">
          {portfolio.map((p, idx) => (
            <div
              key={idx}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-white/5",
                idx === 0 && "md:col-span-2 md:row-span-2"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.title} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button asChild className={GOLD_GHOST} variant="ghost">
            <Link href="/gallery">View full gallery</Link>
          </Button>
        </div>
      </section>
      )}

      {/* ---------------- Packages ---------------- */}
      {sections.packages.active && (
      <section className="border-y border-white/5 bg-slate-900/40">
        <div className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-14 md:px-6 2xl:px-12">
          <div className="mb-8 text-center">
            <Eyebrow>{sections.packages.eyebrow}</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-medium text-white md:text-4xl">
              {sections.packages.title}
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.id}
                className={cn(
                  "relative rounded-2xl border bg-slate-950/60 p-6",
                  p.popular ? "border-amber-400/60 ring-1 ring-amber-400/40" : "border-white/10"
                )}
              >
                {p.popular ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-slate-950">
                    Most booked
                  </span>
                ) : null}
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {p.duration}
                </p>
                <h3 className="mt-1 font-serif text-xl text-white">{p.name}</h3>
                <p className="mt-2 text-3xl font-bold tracking-tight text-amber-300">{p.price}</p>
                <p className="mt-1 text-sm text-slate-400">{p.bestFor}</p>
                <ul className="mt-4 space-y-2">
                  {p.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check width={16} height={16} className="text-amber-300" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="ghost"
                  className={cn("mt-5 w-full", p.popular ? GOLD_BTN : GOLD_GHOST)}
                >
                  <Link href="/booking">Choose package</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ---------------- Reviews ---------------- */}
      {sections.reviews.active && (
      <section className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-14 md:px-6 2xl:px-12">
        <div className="mb-6 text-center">
          <Eyebrow>{sections.reviews.eyebrow}</Eyebrow>
          <h2 className="mt-2 font-serif text-3xl font-medium text-white md:text-4xl">
            {sections.reviews.title}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <Stars n={t.rating} />
              <div className="rich-content mt-3 text-sm leading-6 text-slate-300" dangerouslySetInnerHTML={{ __html: t.text }} />
              <div className="mt-3 flex items-center gap-2.5">
                {t.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.avatar} alt={t.client} className="h-9 w-9 shrink-0 rounded-full object-cover" />
                ) : null}
                <p className="text-sm font-bold text-white">
                  {t.client} <span className="font-medium text-slate-500">· {t.city}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        {testimonials.length > 3 && (
          <div className="mt-6 text-center">
            <Button asChild className={GOLD_GHOST} variant="ghost">
              <Link href="/reviews">Read all reviews</Link>
            </Button>
          </div>
        )}
      </section>
      )}

      {/* ---------------- CTA ---------------- */}
      {cta.active && (
      <section className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 pb-16 md:px-6 2xl:px-12">
        <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-b from-slate-900 to-slate-950 p-8 text-center md:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/30 text-amber-300">
            <Sparkles width={24} height={24} />
          </div>
          <h3 className="mt-4 font-serif text-2xl text-white md:text-3xl">{cta.title}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">{cta.subtitle}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild className={GOLD_BTN}>
              <Link href="/booking">
                <Calendar width={17} height={17} />
                Start booking
              </Link>
            </Button>
            <AskAiButton label="Ask AI" icon="bot" className={GOLD_GHOST} />
          </div>
        </div>
      </section>
      )}
    </main>
  );
}
