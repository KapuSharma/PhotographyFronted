import Link from "next/link";
import {
  Calendar,
  Camera,
  HeartHandshake,
  Baby,
  Briefcase,
  Package as PackageIcon,
  PartyPopper,
  ArrowRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageCard } from "@/components/site/package-card";
import { ReviewCard } from "@/components/site/review-card";
import { AskAiButton } from "@/components/site/ask-ai-button";
import type { TemplateHomeProps } from "@/templates/types";

/* High On Innovation — warm off-white, emerald green + gold, Playfair serif.
   Fully content-driven: the same SiteContent every other template receives.
   The green/cream/gold palette is themed site-wide via [data-template] in
   globals.css; only local gold accents are hard-coded here. */

const GOLD = "#C79A3C";

// Rotating icon set for the service cards (falls back by index).
const SERVICE_ICONS = [Camera, HeartHandshake, Baby, Briefcase, PackageIcon, PartyPopper];

/* Render the last two words of a heading as a gold italic accent so titles get
   the "…memories that last forever." look without hard-coding any copy. */
function AccentTitle({ title, className }: { title: string; className?: string }) {
  const words = title.trim().split(/\s+/);
  const canSplit = words.length > 2;
  const head = canSplit ? words.slice(0, -2).join(" ") : "";
  const tail = canSplit ? words.slice(-2).join(" ") : title;
  return (
    <h2 className={cn("font-serif font-bold tracking-tight text-foreground", className)}>
      {head ? `${head} ` : ""}
      <span className="italic" style={{ color: GOLD }}>
        {tail}
      </span>
    </h2>
  );
}

/* Centered eyebrow + serif title used above each band. */
function SectionHead({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow ? (
        <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
          <span className="h-px w-6 bg-brand-400" />
          {eyebrow}
          <span className="h-px w-6 bg-brand-400" />
        </p>
      ) : null}
      <AccentTitle title={title} className="mt-3 text-3xl md:text-4xl" />
      {desc ? (
        <div
          className="rich-content mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      ) : null}
    </div>
  );
}

export default function HighOnInnovationHome({ content }: TemplateHomeProps) {
  const { hero, services, portfolio, packages, testimonials, sections, cta, blog } = content;

  return (
    <main className="bg-background">
      {/* ---------------- Hero ---------------- */}
      {hero.active && (
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20 xl:max-w-[1400px]">
            <div>
              {hero.badges[0] && (
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                  <span className="h-px w-6 bg-brand-400" />
                  {hero.badges[0]}
                </p>
              )}
              <AccentTitle
                title={hero.title}
                className="mt-5 text-4xl leading-[1.08] md:text-5xl xl:text-6xl"
              />
              <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
                {hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="pill">
                  <Link href={hero.primaryHref || "/booking"}>
                    <Calendar width={17} height={17} />
                    {hero.primaryLabel}
                  </Link>
                </Button>
                {hero.secondaryEnabled &&
                  (hero.secondaryLabel?.toLowerCase().includes("ai") ? (
                    <AskAiButton label={hero.secondaryLabel} />
                  ) : (
                    <Button asChild variant="ghost" size="pill">
                      <Link href="/gallery">{hero.secondaryLabel || "View gallery"}</Link>
                    </Button>
                  ))}
              </div>
              {hero.badges.length > 1 && (
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  {hero.badges.slice(1).map((b, i) => (
                    <span key={i} className="text-sm font-semibold text-foreground/80">
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              {hero.images[0] && (
                <div className="relative overflow-hidden rounded-[24px] border border-border shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hero.images[0]}
                    alt=""
                    className="h-[380px] w-full object-cover md:h-[480px]"
                  />
                </div>
              )}
              {hero.images.length > 1 && (
                <div className="absolute -bottom-6 left-6 hidden gap-3 sm:flex">
                  {hero.images.slice(1, 4).map((src, i) => (
                    <div
                      key={i}
                      className="h-20 w-20 overflow-hidden rounded-2xl border-4 border-background shadow-md"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Services (green tint) ---------------- */}
      {sections.services.active && (
        <section className="bg-brand-50/70">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 xl:max-w-[1400px]">
            <SectionHead
              eyebrow={sections.services.eyebrow}
              title={sections.services.title}
              desc={sections.services.desc}
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {services.map((s, i) => {
                const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
                return (
                  <Link key={s.id} href={`/services/${s.id}`} className="group block">
                    <Card className="h-full overflow-hidden transition group-hover:-translate-y-0.5 group-hover:shadow-md">
                      <div className="p-5">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                          <Icon width={20} height={20} />
                        </span>
                        <div className="mt-4 flex items-baseline justify-between gap-2">
                          <p className="font-serif text-lg font-bold text-foreground">{s.name}</p>
                          <span className="text-sm font-semibold" style={{ color: GOLD }}>
                            {s.from}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {s.desc}
                        </p>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Portfolio highlights ---------------- */}
      {sections.portfolio.active && portfolio.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 xl:max-w-[1400px]">
          <SectionHead
            eyebrow={sections.portfolio.eyebrow}
            title={sections.portfolio.title}
            desc={sections.portfolio.desc}
          />
          <div className="grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 lg:auto-rows-[230px]">
            {portfolio.map((p, idx) => (
              <div
                key={p.id ?? idx}
                className={cn(
                  "group relative overflow-hidden rounded-2xl",
                  idx === 0 && "md:col-span-2 md:row-span-2"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {p.title && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-sm font-semibold text-white">{p.title}</p>
                    {p.category && <p className="text-xs text-white/80">{p.category}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="ghost" size="pill">
              <Link href="/gallery">
                View full gallery
                <ArrowRight width={16} height={16} />
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* ---------------- Packages (cream tint) ---------------- */}
      {sections.packages.active && (
        <section style={{ backgroundColor: "#FBF4E9" }}>
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 xl:max-w-[1400px]">
            <SectionHead
              eyebrow={sections.packages.eyebrow}
              title={sections.packages.title}
              desc={sections.packages.desc}
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {packages.map((p) => (
                <PackageCard key={p.id} pkg={p} ctaLabel="Book this package" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Reviews (blue tint) ---------------- */}
      {sections.reviews.active && testimonials.length > 0 && (
        <section style={{ backgroundColor: "#EFF3F6" }}>
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 xl:max-w-[1400px]">
            <SectionHead
              eyebrow={sections.reviews.eyebrow}
              title={sections.reviews.title}
              desc={sections.reviews.desc}
            />
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.slice(0, 3).map((t, i) => (
                <ReviewCard key={i} review={t} />
              ))}
            </div>
            {testimonials.length > 3 && (
              <div className="mt-8 text-center">
                <Button asChild variant="ghost" size="pill">
                  <Link href="/reviews">
                    Read all reviews
                    <ArrowRight width={16} height={16} />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------------- Latest from blog ---------------- */}
      {blog.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 xl:max-w-[1400px]">
          <SectionHead eyebrow="Our blog" title="Latest stories & tips" />
          <div className="grid gap-6 md:grid-cols-3">
            {blog.slice(0, 3).map((b, i) => (
              <Link key={i} href="/blog" className="group block">
                <Card className="h-full overflow-hidden transition group-hover:shadow-md">
                  <div className="relative h-44 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.image}
                      alt={b.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: GOLD }}>
                      {b.date}
                    </p>
                    <p className="mt-2 font-serif text-lg font-bold leading-snug text-foreground">
                      {b.title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {b.excerpt}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                      Read more
                      <ArrowRight width={15} height={15} />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- CTA (dark green band) ---------------- */}
      {cta.active && (
        <section className="bg-brand-700 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-16 text-center md:px-6 xl:max-w-[1400px]">
            <AccentTitle title={cta.title} className="text-3xl text-white md:text-4xl [&_span]:!text-[#C79A3C]" />
            <p className="max-w-lg text-sm leading-6 text-white/80">{cta.subtitle}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-brand-900 shadow-sm transition hover:opacity-90"
                style={{ backgroundColor: GOLD }}
              >
                <Calendar width={17} height={17} />
                Book a consultation
              </Link>
              <AskAiButton label="Chat with AI Assistant" icon="bot" />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
