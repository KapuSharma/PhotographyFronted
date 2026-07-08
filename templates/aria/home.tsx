"use client";

/* =====================================================================
   "Aria" template — Home page (FRONTEND ONLY).
   Structure mirrors the HOI prototype home (crossfade hero + marquee,
   featured services, portfolio bento, packages, reviews, CTA), rendered
   in the aria design language. Placeholder data, ready for CMS wiring.
   ===================================================================== */

import { useState, useEffect, useCallback } from "react";
import {
  Calendar, MessageCircle, ArrowRight, Star, Check, BadgeCheck,
  MapPin, Sparkles, Quote, Heart, Users, Baby, Briefcase, Package as PackageIcon,
  Shirt, Camera, PartyPopper, X, ChevronLeft, ChevronRight, ZoomIn, type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Reveal, Stagger, StaggerItem, Tilt, EASE } from "./motion";
import { CommonSections } from "./common";
import { initials } from "@/lib/initials";
import { formatPrice } from "@/lib/data";
import type { TemplateHomeProps } from "@/templates/types";

const u = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const HERO_IMGS = ["1519741497674-611481863552", "1487412720507-e7ab37603c6f", "1583939003579-730e3918a45a", "1511795409834-ef04bbd61622"];
const STRIP = ["1519741497674-611481863552", "1487412720507-e7ab37603c6f", "1583939003579-730e3918a45a", "1529626455594-4ff0802cfb7e", "1542291026-7eec264c27ff", "1507679799987-c73779587ccf", "1511795409834-ef04bbd61622", "1508214751196-bcfd4ca60f91"];

type Svc = { name: string; from: string; icon: LucideIcon; img: string; desc: string };
const SERVICES: Svc[] = [
  { name: "Wedding", from: "₹50,000", icon: Heart, img: u("1519741497674-611481863552", 700), desc: "Full-day story coverage, private gallery, guided portraits." },
  { name: "Pre-Wedding", from: "₹25,000", icon: Users, img: u("1583939003579-730e3918a45a", 700), desc: "Outdoor and themed couple shoots with locations." },
  { name: "Fashion", from: "₹35,000", icon: Shirt, img: u("1487412720507-e7ab37603c6f", 700), desc: "Lookbooks, campaigns, model direction, retouching." },
  { name: "Maternity", from: "₹15,000", icon: Baby, img: u("1529626455594-4ff0802cfb7e", 700), desc: "Warm, private sessions with soft guided posing." },
  { name: "Corporate", from: "₹20,000", icon: Briefcase, img: u("1507679799987-c73779587ccf", 700), desc: "Headshots, founder stories, team and brand imagery." },
  { name: "Product", from: "₹12,000", icon: PackageIcon, img: u("1542291026-7eec264c27ff", 700), desc: "Clean product photography for stores and campaigns." },
];

const PORTFOLIO = ["1519741497674-611481863552", "1487412720507-e7ab37603c6f", "1529626455594-4ff0802cfb7e", "1542291026-7eec264c27ff", "1511795409834-ef04bbd61622", "1508214751196-bcfd4ca60f91"];

type Pkg = { duration: string; name: string; price: string; bestFor: string; includes: string[]; popular?: boolean };
const PACKAGES: Pkg[] = [
  { duration: "2 hours", name: "Essential Frame", price: "₹18,000", bestFor: "Portraits, maternity, small product shoots", includes: ["25 edited images", "Private gallery", "1 location", "7-day delivery"] },
  { duration: "Half day", name: "Signature Story", price: "₹50,000", bestFor: "Pre-wedding, fashion, events, brand shoots", popular: true, includes: ["120 edited images", "Client selection flow", "2 locations", "48-hour sneak peek"] },
  { duration: "Full day", name: "Legacy Coverage", price: "₹1,20,000", bestFor: "Weddings and destination events", includes: ["400+ edited images", "Second shooter", "Premium album", "Full delivery suite"] },
];

const REVIEWS = [
  { client: "Aisha & Rohan", city: "Kolkata", rating: 5, text: "They captured our wedding exactly the way it felt. The private gallery and quick sneak peek were a lovely touch." },
  { client: "Nupur Sen", city: "Howrah", rating: 5, text: "My maternity shoot was calm and so well guided. The photos are stunning and arrived ahead of time." },
  { client: "Nexa Store", city: "Salt Lake", rating: 5, text: "Clean product shots that lifted our store listings. Fast turnaround and easy booking." },
];

const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14 ${className}`}>{children}</section>
);
const cn = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

const Head = ({ eyebrow, title, desc, center = false }: { eyebrow: string; title: React.ReactNode; desc?: string; center?: boolean }) => {
  const cleanDesc = typeof desc === "string" ? stripHtml(desc) : desc;
  return (
  <div className={cn("mb-2", center && "text-center")}>
    <Reveal><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--a-green)]">{eyebrow}</p></Reveal>
    <Reveal delay={0.06}><h2 className="font-playfair mt-2 text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-[var(--a-ink)]">{title}</h2></Reveal>
    {cleanDesc && <Reveal delay={0.1}><p className={cn("mt-2 max-w-2xl text-sm leading-6 text-[var(--a-body)]", center && "mx-auto")}>{cleanDesc}</p></Reveal>}
  </div>
  );
};
const Stars = ({ n = 5 }: { n?: number }) => (
  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} width={14} height={14} className={i < n ? "fill-[var(--a-gold)] text-[var(--a-gold)]" : "text-[var(--a-line)]"} />)}</div>
);

/* Direction-aware slide for the lightbox image. */
const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -60 : 60 }),
};

/* Full-screen image viewer: blurred backdrop, prev/next, keyboard nav, slide. */
function Lightbox({ images, index, onClose, onIndex }: { images: string[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const [dir, setDir] = useState(0);
  const go = useCallback((delta: number) => {
    setDir(delta);
    onIndex((index + delta + images.length) % images.length);
  }, [index, images.length, onIndex]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [go, onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Blurred backdrop — click to close */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"><X width={22} height={22} /></button>
      {images.length > 1 && (
        <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:left-6"><ChevronLeft width={26} height={26} /></button>
      )}
      {images.length > 1 && (
        <button onClick={() => go(1)} aria-label="Next image" className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:right-6"><ChevronRight width={26} height={26} /></button>
      )}
      <div className="relative z-[1] flex h-full w-full max-w-5xl items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img key={index} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.32, ease: EASE }} src={images[index]} alt=""
            className="max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl" />
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">{index + 1} / {images.length}</div>
      )}
    </motion.div>
  );
}

/* Map a CMS service category → a glyph for the service card badge. */
const CAT_ICON: Record<string, LucideIcon> = {
  Wedding: Heart, "Pre-Wedding": Users, "Pre Wedding": Users, Maternity: Baby,
  Corporate: Briefcase, Product: PackageIcon, Fashion: Shirt, Family: Users,
  Event: PartyPopper, Events: PartyPopper,
};
const catIc = (c?: string): LucideIcon => (c && CAT_ICON[c]) || Camera;
/* CMS rich-text fields can carry HTML; render reviews as plain text. */
const stripHtml = (s: string) => (s || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/\s+/g, " ").trim();
/* Badge pill styling cycles so dynamic CMS badges keep the original 3-tone look. */
const BADGE_STYLES = [
  "bg-[var(--a-green-soft)] text-[var(--a-green)]",
  "bg-[#f7efdf] text-[var(--a-gold)]",
  "border border-[var(--a-line)] bg-white/70 text-[var(--a-body)]",
];

export default function AriaHome({ content }: TemplateHomeProps) {
  const sym = content?.currencySymbol || "₹";
  // ── Hero ──
  const h = content?.hero;
  const heroActive = h?.active !== false;
  const badges = h?.badges?.length ? h.badges : ["Verified studio", "4.9 · 186 clients", "Kolkata · Destination"];
  const heroTitle = h?.title || "Photography that feels like the moment,";
  const heroAccent = h?.accent || "not just a photo.";
  const heroSubtitle = h?.subtitle || "Wedding, pre-wedding, fashion, maternity and brand photography — with private galleries, guided booking, and an AI assistant that answers instantly.";
  const heroPrimaryLabel = h?.primaryLabel || "Check availability";
  const heroPrimaryHref = h?.primaryHref || "/packages";
  const heroSecondaryEnabled = h?.secondaryEnabled !== false;
  const heroSecondaryLabel = h?.secondaryLabel || "Ask the AI assistant";
  const heroImgs = h?.images?.length ? h.images : HERO_IMGS.map((id) => u(id, 1500));
  const marqueeEnabled = h?.marqueeEnabled !== false;
  const strip = h?.marqueeImages?.length ? h.marqueeImages : STRIP.map((id) => u(id, 300));

  // ── Section headings (home) ──
  const svcHead = content?.sections?.services;
  const portHead = content?.sections?.portfolio;
  const pkgHead = content?.sections?.packages;
  const revHead = content?.sections?.reviews;

  // ── Collections ──
  const services = content?.services?.length
    ? content.services.map((s) => ({ name: s.name, from: s.from || "", icon: catIc(s.category), img: s.photo?.src || s.images?.[0] || u("1519741497674-611481863552", 700), desc: s.desc || "" }))
    : SERVICES;
  const portfolio = content?.portfolio?.length ? content.portfolio.map((p) => p.src).filter(Boolean) : PORTFOLIO.map((id) => u(id, 900));
  const packages = content?.packages?.length
    ? content.packages.map((p) => ({ duration: p.duration || "", name: p.name, price: p.price || "", bestFor: p.description || p.bestFor || "", includes: p.includes || [], popular: p.popular }))
    : PACKAGES;
  const reviews = content?.testimonials?.length
    ? content.testimonials.map((t) => ({ client: t.client || "Client", city: t.city || "", rating: typeof t.rating === "number" ? t.rating : 5, text: stripHtml(t.text || "") }))
    : REVIEWS;

  // ── CTA ──
  const ctaData = content?.cta;
  const ctaActive = ctaData?.active !== false;
  const ctaTitle = ctaData?.title || "Ready to lock your date?";
  const ctaSubtitle = ctaData?.subtitle || "Start a booking now, or ask the AI assistant anything about packages, availability and delivery.";

  // Portfolio: show at most 9, click to open in a lightbox.
  const shownPortfolio = portfolio.slice(0, 9);
  // Lightbox holds the image set + current index, so it serves both the hero
  // photo-strip and the portfolio grid.
  const [lb, setLb] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <main className="aria font-inter bg-[var(--a-cream)] text-[var(--a-ink)]">
      {/* ── Hero ── */}
      {heroActive && (
      <section className="relative overflow-hidden">
        <div className="hero-fade absolute inset-0">
          {heroImgs.map((src, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={i} src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--a-cream)] via-[var(--a-cream)]/88 to-[var(--a-cream)]/25" />
        <Wrap className="relative pb-10 pt-14 md:pt-20">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                {badges.map((b, i) => {
                  const Icon = i === 0 ? BadgeCheck : i === 1 ? Star : MapPin;
                  return (
                    <span key={i} className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${BADGE_STYLES[i % BADGE_STYLES.length]}`}>
                      <Icon width={13} height={13} className={i === 1 ? "fill-current" : ""} /> {b}
                    </span>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-playfair mt-5 text-[clamp(2.1rem,5vw,2.875rem)] font-bold leading-[1.06] text-[var(--a-ink)]">
                {heroTitle} <span className="font-script text-[38px] md:text-[48px] text-[var(--a-green)]">{heroAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[var(--a-body)] md:text-base">{heroSubtitle}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={heroPrimaryHref} className="group inline-flex items-center gap-2 rounded-full bg-[var(--a-green-2)] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--a-green-2)]/20 transition hover:-translate-y-0.5 hover:bg-[var(--a-green)]">
                  <Calendar width={17} height={17} /> {heroPrimaryLabel} <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                </a>
                {heroSecondaryEnabled && (
                <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--a-green)]/40 bg-white/70 px-6 py-3.5 text-sm font-bold text-[var(--a-green)] backdrop-blur transition hover:bg-white">
                  <MessageCircle width={17} height={17} /> {heroSecondaryLabel}
                </a>
                )}
              </div>
            </Reveal>
          </div>
          {/* Marquee strip */}
          {marqueeEnabled && (
          <Reveal delay={0.3}>
            <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--a-line)] bg-white/40 p-3 backdrop-blur">
              <div className="marquee flex w-max gap-3 hover:[animation-play-state:paused]">
                {[...strip, ...strip].map((src, i) => (
                  <button type="button" key={i} onClick={() => setLb({ images: strip, index: i % strip.length })} aria-label="Open image"
                    className="group relative h-24 w-36 shrink-0 overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--a-green)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110" />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/30">
                      <ZoomIn width={18} height={18} className="text-white opacity-0 transition duration-300 group-hover:opacity-100" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          )}
        </Wrap>
      </section>
      )}

      {/* ── Featured services ── */}
      {svcHead?.active !== false && (
      <Wrap className="py-12 md:py-14">
        <Head eyebrow={svcHead?.eyebrow || "What we shoot"} title={svcHead?.title || "Featured services"} desc={svcHead?.desc || "Pick a service to see packages and start a booking."} />
        <Stagger className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={i}>
                <Tilt intensity={6} className="h-full">
                  <a href="/services" className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--a-line)] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[var(--a-green)]/40 hover:shadow-lg">
                    <div className="relative h-32 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.img} alt={s.name} className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110" />
                      <span className="pointer-events-none absolute inset-0 bg-[var(--a-green)]/0 transition duration-300 group-hover:bg-[var(--a-green)]/10" />
                      <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--a-green)] shadow"><Icon width={15} height={15} /></span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-[var(--a-ink)]">{s.name}</p>
                        <span className="text-sm font-semibold text-[var(--a-green)]">{formatPrice(s.from, sym)}</span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--a-body)]">{s.desc}</p>
                    </div>
                  </a>
                </Tilt>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Wrap>
      )}

      {/* ── Portfolio highlights ── */}
      {portHead?.active !== false && (
      <Wrap className="pb-12 md:pb-14">
        <Head eyebrow={portHead?.eyebrow || "Selected work"} title={portHead?.title || "Portfolio highlights"} desc={portHead?.desc || undefined} />
        <div className="mt-8 grid auto-rows-[170px] grid-cols-2 gap-3 md:grid-cols-4">
          {shownPortfolio.map((src, i) => (
            <Reveal key={i} delay={i * 0.04} className={cn("relative", i === 0 && "col-span-2 row-span-2")}>
              <button type="button" onClick={() => setLb({ images: shownPortfolio, index: i })} aria-label="Open image"
                className="group relative block h-full w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--a-green)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110" />
                {/* Hover overlay + zoom hint */}
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white/90 text-[var(--a-ink)] shadow-lg transition duration-300 group-hover:translate-y-0"><ZoomIn width={20} height={20} /></span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex justify-center">
          <a href="/gallery" className="group inline-flex items-center gap-2 rounded-full bg-[var(--a-green-2)] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--a-green-2)]/25 transition hover:-translate-y-0.5 hover:bg-[var(--a-green)]">View full gallery <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" /></a>
        </Reveal>
      </Wrap>
      )}

      {/* ── Packages ── */}
      {pkgHead?.active !== false && (
      <div className="border-y border-[var(--a-line)] bg-white">
        <Wrap className="py-12 md:py-14">
          <Head eyebrow={pkgHead?.eyebrow || "Packages"} title={pkgHead?.title || "Clear pricing, no surprises"} desc={pkgHead?.desc || "Flexible packages for every occasion and every budget."} />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {packages.map((p, pi) => (
              <Reveal key={pi}>
                <div className={cn("relative flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm", p.popular ? "border-[var(--a-gold)]/70 ring-2 ring-[var(--a-gold)]/20" : "border-[var(--a-line)]")}>
                  {p.popular && <span className="absolute -top-3 left-6 rounded-full bg-[var(--a-gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">Most booked</span>}
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--a-body)]">{p.duration}</p>
                  <h3 className="font-playfair mt-1 text-xl font-extrabold text-[var(--a-ink)]">{p.name}</h3>
                  <p className={cn("mt-2 text-3xl font-bold", p.popular ? "text-[var(--a-gold)]" : "text-[var(--a-ink)]")}>{formatPrice(p.price, sym)}</p>
                  <p className="mt-1 text-sm text-[var(--a-body)]">{p.bestFor}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {p.includes.map((x, xi) => (
                      <li key={xi} className="flex items-center gap-2 text-sm text-[var(--a-ink)]/80"><Check width={16} height={16} className="shrink-0 text-[var(--a-green)]" /> {x}</li>
                    ))}
                  </ul>
                  <a href="/packages" className={cn("mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition", p.popular ? "bg-[var(--a-gold)] text-white hover:brightness-95" : "border border-[var(--a-green)]/40 text-[var(--a-green)] hover:bg-[var(--a-green-soft)]")}>Choose package <ArrowRight width={15} height={15} /></a>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </div>
      )}

      {/* ── Reviews ── */}
      {revHead?.active !== false && (
      <Wrap className="py-12 md:py-14">
        <Head eyebrow={revHead?.eyebrow || "Reviews"} title={revHead?.title || "Loved by recent clients"} desc={revHead?.desc || undefined} />
        <Stagger className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map((t, i) => (
            <StaggerItem key={i}>
              <div className="relative flex h-full flex-col rounded-2xl border border-[var(--a-line)] bg-white p-6 shadow-sm">
                <Quote width={28} height={28} className="text-[var(--a-green-faint)]" fill="currentColor" />
                <p className="mt-2 flex-1 text-[15px] leading-7 text-[var(--a-ink)]/85">{t.text}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-[var(--a-line)] pt-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--a-green-2)] text-sm font-bold text-white">{initials(t.client)}</span>
                  <div><div className="text-sm font-bold text-[var(--a-ink)]">{t.client}</div><div className="text-xs text-[var(--a-body)]">{t.city}</div></div>
                  <div className="ml-auto"><Stars n={t.rating} /></div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-8 text-center">
          <a href="/reviews" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--a-green)] transition hover:gap-2.5">View all reviews <ArrowRight width={15} height={15} /></a>
        </Reveal>
      </Wrap>
      )}

      {/* ── CTA ── */}
      {ctaActive && (
      <Wrap className="pb-16">
        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-[1.6rem] border border-[var(--a-line)] bg-gradient-to-br from-[var(--a-green-soft)] to-[#eef3f0] p-8 text-center md:p-12">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--a-green)] shadow-sm"><Sparkles width={24} height={24} /></span>
            <h3 className="font-playfair text-2xl font-bold text-[var(--a-ink)] md:text-3xl">{ctaTitle}</h3>
            <p className="max-w-md text-sm text-[var(--a-body)]">{ctaSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/packages" className="inline-flex items-center gap-2 rounded-full bg-[var(--a-green-2)] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--a-green)]"><Calendar width={17} height={17} /> Start booking</a>
              <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--a-green)]/40 bg-white px-6 py-3.5 text-sm font-bold text-[var(--a-green)] transition hover:bg-white/70"><MessageCircle width={17} height={17} /> Ask AI</a>
            </div>
          </div>
        </Reveal>
      </Wrap>
      )}
      <CommonSections content={content} page="home" />

      {/* ── Image lightbox (portfolio + hero strip) ── */}
      <AnimatePresence>
        {lb && (
          <Lightbox
            images={lb.images}
            index={lb.index}
            onClose={() => setLb(null)}
            onIndex={(index) => setLb((cur) => (cur ? { ...cur, index } : cur))}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
