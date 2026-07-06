import Link from "next/link";
import type { ReactNode } from "react";
import { Calendar, ArrowRight } from "lucide-react";

import { cn, plainSummary } from "@/lib/utils";
import { Reveal, Parallax } from "@/components/site/anim";

/** Warm flatlay used on page heroes (camera + notebook + coffee + eucalyptus). */
export const HERO_FLATLAY =
  "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=80";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-bold uppercase tracking-[0.25em] text-brand-600", className)}>
      {children}
    </p>
  );
}

/** Centered section heading with eyebrow + serif title + optional description. */
export function SectionHeading({
  eyebrow,
  title,
  desc,
  center = true,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  desc?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow ? <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal> : null}
      <Reveal delay={0.06}>
        <h2 className="display-title mt-2 text-[clamp(1.8rem,3.4vw,2.8rem)] text-foreground">{title}</h2>
      </Reveal>
      {desc ? (
        <Reveal delay={0.12}>
          <p className={cn("mt-3 text-[15px] leading-7 text-muted-foreground", center && "mx-auto")}>{typeof desc === "string" ? plainSummary(desc) : desc}</p>
        </Reveal>
      ) : null}
      {center ? (
        <Reveal delay={0.16}>
          <div className="mx-auto mt-4 flex items-center justify-center gap-2 text-brand-400">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-brand-300" />
            <span className="h-1.5 w-1.5 rotate-45 bg-brand-500" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-brand-300" />
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Cream hero band with a signature flatlay + floating handwriting note. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  image = HERO_FLATLAY,
  note = "Every picture tells a story. Let's tell yours.",
  compact = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  image?: string;
  note?: string;
  compact?: boolean;
}) {
  return (
    <section className="hero-cream relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.4]">
        <div className="anim-float-slow absolute right-[8%] top-10 h-40 w-40 rounded-full bg-brand-200/30 blur-2xl" />
      </div>
      <div
        className={cn(
          "relative mx-auto grid max-w-7xl 2xl:max-w-[1500px] items-center gap-8 px-4 md:grid-cols-2 md:px-6",
          compact ? "py-12 md:py-16" : "py-16 md:py-24"
        )}
      >
        <div>
          {eyebrow ? <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal> : null}
          <Reveal delay={0.06}>
            <h1 className="display-title mt-3 text-[clamp(2.2rem,5vw,4rem)] text-foreground">{title}</h1>
          </Reveal>
          {subtitle ? (
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-lg text-[15px] leading-7 text-muted-foreground md:text-base">{subtitle}</p>
            </Reveal>
          ) : null}
          {children ? <Reveal delay={0.2}><div className="mt-7">{children}</div></Reveal> : null}
        </div>

        <Parallax speed={26} className="relative hidden md:block">
          <div className="perspective">
            <div className="preserve-3d relative [transform:rotateY(-8deg)_rotateX(3deg)]">
              <div className="shine overflow-hidden rounded-[2rem] shadow-2xl shadow-brand-900/20 ring-1 ring-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className="h-[360px] w-full object-cover lg:h-[440px]" />
              </div>
              {/* floating handwriting note */}
              <div className="anim-float absolute -left-6 top-8 max-w-[200px] rotate-[-6deg] rounded-2xl bg-cream-50/95 px-5 py-4 shadow-xl ring-1 ring-black/5 backdrop-blur">
                <p className="font-script text-[22px] leading-tight text-foreground/80">{note}</p>
                <span className="mt-1 block text-right text-lg">🤍</span>
              </div>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}

/** Dark-green "ready to book" band used at the foot of most pages. */
export function CTABand({
  title,
  subtitle,
  buttonLabel = "Book your session",
  href = "/booking",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 py-12 md:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 px-6 py-10 md:px-12 md:py-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="display-title text-2xl text-white md:text-[2rem]">{title}</h3>
              {subtitle ? <p className="mt-2 max-w-xl text-sm text-white/70 md:text-base">{subtitle}</p> : null}
            </div>
            <Link
              href={href}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-800 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Calendar width={17} height={17} />
              {buttonLabel}
              <ArrowRight width={17} height={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Consistent page-section wrapper. */
export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 py-14 md:px-6 md:py-20", className)}>
      {children}
    </section>
  );
}
