"use client";

/* =====================================================================
   "Aria" template — Home page (FRONTEND ONLY).
   Structure mirrors the HOI prototype home (crossfade hero + marquee,
   featured services, portfolio bento, packages, reviews, CTA), rendered
   in the aria design language. Placeholder data, ready for CMS wiring.
   ===================================================================== */

import {
  Calendar, MessageCircle, ArrowRight, ArrowUpRight, Star, Check, BadgeCheck,
  MapPin, Sparkles, Quote, Heart, Users, Baby, Briefcase, Package as PackageIcon,
  Shirt, type LucideIcon,
} from "lucide-react";

import { Reveal, Stagger, StaggerItem, Tilt } from "./motion";
import { CommonSections } from "./common";
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

const Head = ({ eyebrow, title, desc, center = false }: { eyebrow: string; title: React.ReactNode; desc?: string; center?: boolean }) => (
  <div className={cn("mb-2", center && "text-center")}>
    <Reveal><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--a-green)]">{eyebrow}</p></Reveal>
    <Reveal delay={0.06}><h2 className="font-playfair mt-2 text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-[var(--a-ink)]">{title}</h2></Reveal>
    {desc && <Reveal delay={0.1}><p className={cn("mt-2 max-w-2xl text-sm leading-6 text-[var(--a-body)]", center && "mx-auto")}>{desc}</p></Reveal>}
  </div>
);
const Stars = ({ n = 5 }: { n?: number }) => (
  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} width={14} height={14} className={i < n ? "fill-[var(--a-gold)] text-[var(--a-gold)]" : "text-[var(--a-line)]"} />)}</div>
);

export default function AriaHome({ content }: TemplateHomeProps) {
  return (
    <main className="aria font-inter bg-[var(--a-cream)] text-[var(--a-ink)]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="hero-fade absolute inset-0">
          {HERO_IMGS.map((id) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={id} src={u(id, 1500)} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--a-cream)] via-[var(--a-cream)]/88 to-[var(--a-cream)]/25" />
        <Wrap className="relative pb-10 pt-14 md:pt-20">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--a-green-soft)] px-3 py-1 text-xs font-semibold text-[var(--a-green)]"><BadgeCheck width={13} height={13} /> Verified studio</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#f7efdf] px-3 py-1 text-xs font-semibold text-[var(--a-gold)]"><Star width={13} height={13} className="fill-current" /> 4.9 · 186 clients</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--a-line)] bg-white/70 px-3 py-1 text-xs font-semibold text-[var(--a-body)]"><MapPin width={13} height={13} /> Kolkata · Destination</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-playfair mt-5 text-[clamp(2.1rem,5vw,2.875rem)] font-bold leading-[1.06] text-[var(--a-ink)]">
                Photography that feels like the moment, <span className="font-script text-[38px] md:text-[48px] text-[var(--a-green)]">not just a photo.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[var(--a-body)] md:text-base">Wedding, pre-wedding, fashion, maternity and brand photography — with private galleries, guided booking, and an AI assistant that answers instantly.</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/packages" className="group inline-flex items-center gap-2 rounded-full bg-[var(--a-green-2)] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--a-green-2)]/20 transition hover:-translate-y-0.5 hover:bg-[var(--a-green)]">
                  <Calendar width={17} height={17} /> Check availability <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--a-green)]/40 bg-white/70 px-6 py-3.5 text-sm font-bold text-[var(--a-green)] backdrop-blur transition hover:bg-white">
                  <MessageCircle width={17} height={17} /> Ask the AI assistant
                </a>
              </div>
            </Reveal>
          </div>
          {/* Marquee strip */}
          <Reveal delay={0.3}>
            <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--a-line)] bg-white/40 p-3 backdrop-blur">
              <div className="marquee flex w-max gap-3">
                {[...STRIP, ...STRIP].map((id, i) => (
                  <div key={i} className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={u(id, 300)} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {/* ── Featured services ── */}
      <Wrap className="py-12 md:py-14">
        <Head eyebrow="What we shoot" title={<>Featured services</>} desc="Pick a service to see packages and start a booking." />
        <Stagger className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.name}>
                <Tilt intensity={6} className="h-full">
                  <a href="/services" className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--a-line)] bg-white shadow-sm transition hover:shadow-md">
                    <div className="relative h-32 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.img} alt={s.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--a-green)] shadow"><Icon width={15} height={15} /></span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-[var(--a-ink)]">{s.name}</p>
                        <span className="text-sm font-semibold text-[var(--a-green)]">{s.from}</span>
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

      {/* ── Portfolio highlights ── */}
      <Wrap className="pb-12 md:pb-14">
        <Head eyebrow="Selected work" title={<>Portfolio highlights</>} />
        <div className="mt-8 grid auto-rows-[170px] grid-cols-2 gap-3 md:grid-cols-4">
          {PORTFOLIO.map((id, i) => (
            <Reveal key={id} delay={i * 0.04} className={cn("relative overflow-hidden rounded-2xl", i === 0 && "col-span-2 row-span-2")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u(id, i === 0 ? 900 : 500)} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <a href="/gallery" className="inline-flex items-center gap-2 rounded-full border border-[var(--a-green)]/40 bg-white px-5 py-3 text-sm font-bold text-[var(--a-green)] transition hover:bg-[var(--a-green-soft)]">View full gallery <ArrowRight width={15} height={15} /></a>
        </Reveal>
      </Wrap>

      {/* ── Packages ── */}
      <div className="border-y border-[var(--a-line)] bg-white">
        <Wrap className="py-12 md:py-14">
          <Head eyebrow="Packages" title={<>Clear pricing, no surprises</>} desc="Flexible packages for every occasion and every budget." />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {PACKAGES.map((p) => (
              <Reveal key={p.name}>
                <div className={cn("relative flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm", p.popular ? "border-[var(--a-gold)]/70 ring-2 ring-[var(--a-gold)]/20" : "border-[var(--a-line)]")}>
                  {p.popular && <span className="absolute -top-3 left-6 rounded-full bg-[var(--a-gold)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">Most booked</span>}
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--a-body)]">{p.duration}</p>
                  <h3 className="font-playfair mt-1 text-xl font-extrabold text-[var(--a-ink)]">{p.name}</h3>
                  <p className={cn("mt-2 text-3xl font-bold", p.popular ? "text-[var(--a-gold)]" : "text-[var(--a-ink)]")}>{p.price}</p>
                  <p className="mt-1 text-sm text-[var(--a-body)]">{p.bestFor}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {p.includes.map((x) => (
                      <li key={x} className="flex items-center gap-2 text-sm text-[var(--a-ink)]/80"><Check width={16} height={16} className="shrink-0 text-[var(--a-green)]" /> {x}</li>
                    ))}
                  </ul>
                  <a href="/packages" className={cn("mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition", p.popular ? "bg-[var(--a-gold)] text-white hover:brightness-95" : "border border-[var(--a-green)]/40 text-[var(--a-green)] hover:bg-[var(--a-green-soft)]")}>Choose package <ArrowRight width={15} height={15} /></a>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </div>

      {/* ── Reviews ── */}
      <Wrap className="py-12 md:py-14">
        <Head eyebrow="Reviews" title={<>Loved by recent clients</>} />
        <Stagger className="mt-8 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((t) => (
            <StaggerItem key={t.client}>
              <div className="relative flex h-full flex-col rounded-2xl border border-[var(--a-line)] bg-white p-6 shadow-sm">
                <Quote width={28} height={28} className="text-[var(--a-green-faint)]" fill="currentColor" />
                <p className="mt-2 flex-1 text-[15px] leading-7 text-[var(--a-ink)]/85">{t.text}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-[var(--a-line)] pt-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--a-green-2)] text-sm font-bold text-white">{t.client.slice(0, 1)}</span>
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

      {/* ── CTA ── */}
      <Wrap className="pb-16">
        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-[1.6rem] border border-[var(--a-line)] bg-gradient-to-br from-[var(--a-green-soft)] to-[#eef3f0] p-8 text-center md:p-12">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--a-green)] shadow-sm"><Sparkles width={24} height={24} /></span>
            <h3 className="font-playfair text-2xl font-bold text-[var(--a-ink)] md:text-3xl">Ready to lock your date?</h3>
            <p className="max-w-md text-sm text-[var(--a-body)]">Start a booking now, or ask the AI assistant anything about packages, availability and delivery.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/packages" className="inline-flex items-center gap-2 rounded-full bg-[var(--a-green-2)] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--a-green)]"><Calendar width={17} height={17} /> Start booking</a>
              <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--a-green)]/40 bg-white px-6 py-3.5 text-sm font-bold text-[var(--a-green)] transition hover:bg-white/70"><MessageCircle width={17} height={17} /> Ask AI</a>
            </div>
          </div>
        </Reveal>
      </Wrap>
      <CommonSections content={content} page="home" />
    </main>
  );
}
