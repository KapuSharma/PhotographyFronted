"use client";

/* =====================================================================
   "Aria" premium About page — section components (FRONTEND ONLY).
   All content is placeholder data (grouped below), ready for CMS wiring.
   Colors come from the scoped .aria palette (see globals.css):
     --a-green (medium teal-forest) · --a-green-2 (deep) · --a-gold
     --a-cream · --a-ink · --a-body · --a-line
   ===================================================================== */

import { useEffect, useState } from "react";
import {
  Camera, Clock, ShieldCheck, Headphones, Calendar, Users, MapPin, Star,
  Rocket, Building2, Trophy, Heart, Lock, Send, Images, History, MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Reveal, Stagger, StaggerItem, Tilt, Parallax, DrawLine, EASE } from "./motion";
import type { SiteContent } from "@/templates/types";

type WithContent = { content?: SiteContent };

/* CMS icon-key → glyph map for About lists. */
const ABOUT_ICONS: Record<string, LucideIcon> = {
  camera: Camera, clock: Clock, shield: ShieldCheck, headphones: Headphones, calendar: Calendar,
  users: Users, "map-pin": MapPin, mappin: MapPin, star: Star, rocket: Rocket,
  building: Building2, trophy: Trophy, heart: Heart, lock: Lock, history: History, image: Images,
};
const aic = (k?: string): LucideIcon => (k && ABOUT_ICONS[k]) || Camera;

/* Strip any stray HTML from a plain-text value (testimonial quotes). */
const stripHtml = (s: string) => (s || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/\s+/g, " ").trim();

/* ── image helpers (placeholder Unsplash slots) ── */
const u = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const IMG = {
  heroMain: u("1519741497674-611481863552"),
  heroThumbs: [u("1583939003579-730e3918a45a", 500), u("1511795409834-ef04bbd61622", 500), u("1519225421980-715cb0215aed", 500)],
  bts: [u("1516035069371-29a1b244cc32", 700), u("1487412720507-e7ab37603c6f", 700), u("1542291026-7eec264c27ff", 700), u("1507679799987-c73779587ccf", 700), u("1508214751196-bcfd4ca60f91", 700)],
  team: [u("1607346256330-dee7af15f7c5", 600), u("1610216705422-caa3fcb6d158", 600), u("1573496359142-b8d87734a5a2", 600), u("1500648767791-00dcc994a43e", 600)],
  ctaBg: u("1452587925148-ce544e77e70d"),
};

/* ── placeholder data ── */
const HERO_FEATURES: { icon: LucideIcon; label: string }[] = [
  { icon: Camera, label: "Natural & Editorial Photography" },
  { icon: History, label: "Fast Turnaround & Private Delivery" },
  { icon: ShieldCheck, label: "100% Secure Online Gallery" },
  { icon: Headphones, label: "Personalized Consultation" },
];
const STATS: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Calendar, value: "2016", label: "Since" },
  { icon: Users, value: "186+", label: "Happy Clients" },
  { icon: MapPin, value: "20+", label: "Cities Covered" },
  { icon: Camera, value: "1200+", label: "Projects Completed" },
  { icon: Star, value: "4.9/5", label: "Google Rating" },
];
const JOURNEY: { year: string; icon: LucideIcon; text: string }[] = [
  { year: "2016", icon: Rocket, text: "Started as a small team of passionate photographers." },
  { year: "2018", icon: Building2, text: "Opened our studio and started serving clients across Kolkata." },
  { year: "2020", icon: Users, text: "Expanded our team and travelled across India for projects." },
  { year: "2023", icon: Camera, text: "Reached 1000+ projects and a 4.9/5 client rating." },
  { year: "2026", icon: Trophy, text: "Continuing our journey to create timeless memories." },
];
const TEAM: { name: string; role: string; img: string }[] = [
  { name: "Prem Kumar", role: "Founder & Creative Director", img: IMG.team[0] },
  { name: "Arjun Das", role: "Lead Photographer", img: IMG.team[1] },
  { name: "Ananya Bose", role: "Photo Editor", img: IMG.team[2] },
  { name: "Rohit Shaw", role: "Cinematographer", img: IMG.team[3] },
];
const WHY: { icon: LucideIcon; tint: string; title: string; text: string }[] = [
  { icon: Camera, tint: "text-[var(--a-ink)]", title: "Creative Storytelling", text: "We don't just take photos, we tell your story through powerful images." },
  { icon: Star, tint: "text-[var(--a-ink)]", title: "Premium Quality", text: "High-end gear, professional editing and attention to every detail." },
  { icon: Clock, tint: "text-[var(--a-ink)]", title: "Fast Delivery", text: "Quick turnaround with a smooth and transparent workflow." },
  { icon: Heart, tint: "text-rose-500", title: "Personalized Experience", text: "Every client is unique. We tailor each shoot to your vision." },
  { icon: Lock, tint: "text-[var(--a-ink)]", title: "Private & Secure", text: "Your memories are safe with a private gallery and secure delivery." },
];
const TESTIMONIALS: { name: string; role: string; quote: string; avatar: string; rating: number }[] = [
  { name: "Rahul & Priya", role: "Wedding", quote: "Aria Studio captured our wedding so beautifully. Every moment was natural and full of emotions. Highly recommend!", avatar: IMG.team[3], rating: 5 },
  { name: "Sneha Kapoor", role: "Maternity", quote: "The pictures turned out stunning! They made us feel so comfortable throughout the shoot.", avatar: IMG.team[2], rating: 5 },
  { name: "Ankit Mehra", role: "Corporate", quote: "Professional team, amazing creativity and super fast delivery. Couldn't have asked for more!", avatar: IMG.team[0], rating: 5 },
  { name: "Nupur Sen", role: "Maternity", quote: "Calm, guided and so well planned. The gallery arrived ahead of time and looked gorgeous.", avatar: IMG.team[2], rating: 5 },
  { name: "Aisha & Rohan", role: "Wedding", quote: "The private gallery and quick sneak peek were a lovely touch. They captured exactly how it felt.", avatar: IMG.team[1], rating: 5 },
  { name: "Nexa Store", role: "Product", quote: "Clean product shots that lifted our store listings. Fast turnaround and easy booking.", avatar: IMG.team[0], rating: 5 },
  { name: "Megha & Arjun", role: "Pre-Wedding", quote: "Magical pre-wedding shoot. They made us feel so at ease in front of the camera.", avatar: IMG.team[1], rating: 5 },
  { name: "Diya Sharma", role: "Fashion", quote: "Beyond expectations — great styling suggestions and perfect lighting throughout.", avatar: IMG.team[2], rating: 5 },
  { name: "Rohit Agarwal", role: "Event", quote: "Highly professional with creative ideas. Our event photos were absolutely fantastic.", avatar: IMG.team[3], rating: 5 },
];

/* ── shared bits ── */
function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--a-green)]">{children}</span>
      <span className="h-[2px] w-9 bg-[var(--a-gold)]" />
    </div>
  );
}
function Heading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`font-playfair text-[clamp(1.8rem,3.2vw,2.6rem)] font-bold leading-tight text-[var(--a-ink)] ${className}`}>{children}</h2>;
}
/** Centered eyebrow + serif heading + gold underline. */
function SectionHead({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return (
    <div className="text-center">
      <Reveal><Eyebrow center>{eyebrow}</Eyebrow></Reveal>
      <Reveal delay={0.06}><Heading className="mt-3">{title}</Heading></Reveal>
      <Reveal delay={0.12}><span className="mx-auto mt-4 block h-[3px] w-16 rounded-full bg-[var(--a-gold)]" /></Reveal>
    </div>
  );
}

/* Brand social glyphs (lucide has no brand icons) — inline SVG. */
type SvgProps = { className?: string };
const IgIcon = ({ className }: SvgProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.8" /><circle cx="17.2" cy="6.8" r="1.05" fill="currentColor" stroke="none" /></svg>
);
const FbIcon = ({ className }: SvgProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M13.5 21v-7.5h2.4l.4-2.9h-2.8V8.7c0-.8.2-1.4 1.4-1.4h1.5V4.7c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.1v2.9h2.4V21z" /></svg>
);
const TwIcon = ({ className }: SvgProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.6.8-2.5 1a3.9 3.9 0 0 0-6.7 3.6A11 11 0 0 1 4 4.7a3.9 3.9 0 0 0 1.2 5.2c-.6 0-1.2-.2-1.7-.4a3.9 3.9 0 0 0 3.1 3.8c-.5.2-1.1.2-1.6.1a3.9 3.9 0 0 0 3.6 2.7A7.9 7.9 0 0 1 2 17.7 11 11 0 0 0 8 19.5c7.1 0 11-5.9 11-11v-.5c.8-.6 1.4-1.3 2-2.1z" /></svg>
);
const SOCIALS = [IgIcon, FbIcon, TwIcon];
function AriaBtn({ variant, children, icon: Icon, iconBox, href = "#" }: { variant: "solid" | "outline" | "gold"; children: React.ReactNode; icon?: LucideIcon; iconBox?: boolean; href?: string }) {
  const styles =
    variant === "solid" ? "bg-[var(--a-green-2)] text-white hover:bg-[var(--a-green)]"
    : variant === "gold" ? "bg-[var(--a-gold)] text-white hover:brightness-95"
    : "border border-[var(--a-green)]/30 bg-white text-[var(--a-green-2)] hover:bg-[var(--a-green-2)] hover:text-white";
  const boxCls = variant === "outline" ? "bg-[var(--a-green)]/10 group-hover:bg-white/20" : "bg-white/15";
  return (
    <motion.a href={href} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
      className={`group inline-flex items-center gap-2.5 rounded-lg px-6 py-3.5 text-sm font-semibold transition-colors ${styles}`}>
      {Icon ? (
        iconBox
          ? <span className={`flex h-6 w-6 items-center justify-center rounded-md ${boxCls}`}><Icon width={14} height={14} /></span>
          : <Icon width={17} height={17} />
      ) : null}
      {children}
    </motion.a>
  );
}
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14 ${className}`}>{children}</section>
);

/* ── 1. Hero ── */
export function AboutHero({ content }: WithContent) {
  const intro = content?.about?.intro;
  const body = stripHtml(intro?.body || "") || "Aria Studio is a boutique photography studio based in Kolkata. We specialize in weddings, pre-weddings, maternity, fashion and brand photography across India. Our goal is simple — to capture your real emotions with creativity, care and perfection.";
  const heroImg = intro?.image || IMG.heroMain;
  const eyebrow = intro?.eyebrow || "About Us";
  const hTop = intro?.headlineTop || "We Capture Moments";
  const hMain = intro?.headlineMain || "That Last";
  const hAccent = intro?.headlineAccent || "Forever.";
  const features = intro?.features?.length ? intro.features.map((f) => ({ Icon: aic(f.icon), label: f.label })) : HERO_FEATURES.map((f) => ({ Icon: f.icon, label: f.label }));
  const thumbs = intro?.thumbs?.length ? intro.thumbs : IMG.heroThumbs;
  return (
    <section className="relative overflow-hidden bg-[var(--a-cream)]">
      <Section className="grid items-center gap-10 py-10 md:grid-cols-2 md:gap-12 md:py-14 lg:gap-16 xl:gap-20">
        <div>
          <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-playfair mt-5 text-[clamp(2.4rem,4.8vw,3.7rem)] font-bold leading-[1.08] text-[var(--a-ink)]">
              {hTop} <br className="hidden md:block" />{hMain} <span className="italic text-[var(--a-gold)]">{hAccent}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-lg text-[15px] leading-7 text-[var(--a-body)]">{body}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-4">
              <AriaBtn variant="solid" icon={Images} iconBox href={intro?.primaryHref || "/gallery"}>{intro?.primaryLabel || "View Portfolio"}</AriaBtn>
              <AriaBtn variant="outline" icon={Send} iconBox href={intro?.secondaryHref || "/contact"}>{intro?.secondaryLabel || "Contact Us"}</AriaBtn>
            </div>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-2 gap-y-7 sm:grid-cols-4 sm:divide-x sm:divide-[var(--a-line)]">
            {features.map((f) => (
              <StaggerItem key={f.label} className="flex flex-col items-center gap-2.5 px-4 text-center">
                <f.Icon width={26} height={26} strokeWidth={1.6} className="text-[var(--a-gold)]" />
                <span className="text-[11px] font-semibold leading-tight text-[var(--a-body)]">{f.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* right: parallax hero image + 3 thumbnails tucked under */}
        <div className="relative">
          <div className="pointer-events-none absolute -right-2 -top-8 h-16 w-24 opacity-70"
            style={{ backgroundImage: "radial-gradient(circle, var(--a-gold) 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }} />
          <div className="aria-perspective">
            <Tilt intensity={6} scale={1.02} lift={false} className="aria-preserve-3d">
              <Parallax distance={26}>
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={heroImg} alt="Our team capturing a moment" className="h-[300px] w-full object-cover sm:h-[430px] lg:h-[500px] xl:h-[540px]" />
                  </div>
                  <div className="absolute inset-x-3 -bottom-7 z-10 grid grid-cols-3 gap-3">
                    {thumbs.map((src, i) => (
                      <div key={i} className="overflow-hidden rounded-xl shadow-xl ring-[3px] ring-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="h-[88px] w-full object-cover sm:h-[112px] lg:h-[128px]" />
                      </div>
                    ))}
                  </div>
                </div>
              </Parallax>
            </Tilt>
          </div>
        </div>
      </Section>
    </section>
  );
}

/* ── 2. Stats bar ── */
export function StatsBar({ content }: WithContent) {
  const items = content?.about?.stats?.items?.length
    ? content.about.stats.items.map((it, i) => ({ icon: STATS[i % STATS.length].icon, value: it.value, label: it.label }))
    : STATS;
  return (
    <Section className="py-6">
      <Reveal>
        <div className="grid grid-cols-2 gap-y-6 rounded-2xl border border-[var(--a-line)] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(14,90,68,0.25)] sm:grid-cols-3 md:grid-cols-5 md:divide-x md:divide-[var(--a-line)] md:p-7">
          {items.map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-2 md:justify-center md:px-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--a-green-soft)] text-[var(--a-green)]"><s.icon width={19} height={19} /></span>
              <div>
                <div className="font-playfair text-2xl font-bold leading-none text-[var(--a-ink)]">{s.value}</div>
                <div className="mt-1 text-[11px] font-medium text-[var(--a-body)]">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 3. Our Journey ── */
export function Journey({ content }: WithContent) {
  const j = content?.about?.journey;
  const eyebrow = j?.eyebrow || "Our Journey";
  const title = j?.title || "From Passion to Purpose";
  const items = j?.items?.length ? j.items.map((it) => ({ year: it.year, Icon: aic(it.icon), text: it.text })) : JOURNEY.map((it) => ({ year: it.year, Icon: it.icon, text: it.text }));
  return (
    <Section className="py-10 md:py-12">
      <SectionHead eyebrow={eyebrow} title={title} />
      <div className="relative mt-16">
        <DrawLine className="absolute left-[10%] right-[10%] top-8 hidden border-[var(--a-gold)]/40 md:block" />
        <Stagger className="grid gap-10 md:grid-cols-5">
          {items.map((t, i) => {
            const gold = i % 2 === 0;
            const Icon = t.Icon;
            return (
              <StaggerItem key={`${t.year}-${i}`} className="relative text-center">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ring-8 ring-[var(--a-cream)] ${gold ? "bg-[#f4ecdc] text-[var(--a-gold)]" : "bg-[var(--a-green-soft)] text-[var(--a-green)]"}`}>
                  <Icon width={24} height={24} />
                </div>
                <div className="mt-4 font-playfair text-lg font-bold text-[var(--a-ink)]">{t.year}</div>
                <p className="mx-auto mt-1.5 max-w-[180px] text-sm leading-6 text-[var(--a-body)]">{t.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}

/* ── 4. Meet the Team ── */
export function Team({ content }: WithContent) {
  const t = content?.about?.team;
  const eyebrow = t?.eyebrow || "Meet the Team";
  const title = t?.title || "The People Behind the Lens";
  const members = t?.members?.length ? t.members : TEAM;
  return (
    <Section className="py-10 md:py-12">
      <SectionHead eyebrow={eyebrow} title={title} />
      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((m, mi) => (
          <StaggerItem key={`${m.name}-${mi}`}>
            <div className="aria-perspective">
              <Tilt intensity={8} className="aria-preserve-3d">
                <div className="overflow-hidden rounded-2xl border border-[var(--a-line)] bg-white shadow-sm">
                  <div className="aspect-[4/3.3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.img} alt={m.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5 text-center">
                    <div className="font-playfair text-lg font-bold text-[var(--a-ink)]">{m.name}</div>
                    <div className="text-xs font-medium text-[var(--a-green)]">{m.role}</div>
                    <div className="mt-3 flex justify-center gap-2">
                      {SOCIALS.map((Ic, i) => (
                        <a key={i} href="#" aria-label="social link" className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.04] text-[var(--a-body)] transition hover:bg-[var(--a-green-2)] hover:text-white">
                          <Ic className="h-[15px] w-[15px]" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ── 5. Behind the Scenes ── */
export function BehindScenes({ content }: WithContent) {
  const b = content?.about?.behindScenes;
  const eyebrow = b?.eyebrow || "Behind the Scenes";
  const title = b?.title || "Where Magic Happens";
  const images = b?.images?.length ? b.images : IMG.bts;
  return (
    <Section className="py-10 md:py-12">
      <SectionHead eyebrow={eyebrow} title={title} />
      <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {images.map((src, i) => (
          <StaggerItem key={i}>
            <div className="aspect-[16/11] overflow-hidden rounded-2xl shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img src={src} alt="" whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease: EASE }} className="h-full w-full object-cover" />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ── 6. Why Choose Us ── */
export function WhyUs({ content }: WithContent) {
  const w0 = content?.about?.whyUs;
  const eyebrow = w0?.eyebrow || "Why Clients Choose Us";
  const title = w0?.title || "The Aria Difference";
  const items = w0?.items?.length ? w0.items.map((it) => ({ Icon: aic(it.icon), tint: "text-[var(--a-ink)]", title: it.title, text: it.text })) : WHY.map((it) => ({ Icon: it.icon, tint: it.tint, title: it.title, text: it.text }));
  return (
    <Section className="py-10 md:py-12">
      <SectionHead eyebrow={eyebrow} title={title} />
      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((w, wi) => (
          <StaggerItem key={`${w.title}-${wi}`}>
            <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full rounded-2xl border border-[var(--a-line)] bg-white p-6 text-center shadow-sm">
              <span className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--a-green-soft)] ${w.tint}`}>
                <w.Icon width={22} height={22} strokeWidth={1.6} />
              </span>
              <h4 className="mt-4 text-sm font-bold text-[var(--a-ink)]">{w.title}</h4>
              <p className="mt-2 text-xs leading-5 text-[var(--a-body)]">{w.text}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ── 7. Testimonials (carousel) ── */
export function Testimonials({ content }: WithContent) {
  const list = content?.testimonials?.length
    ? content.testimonials.map((t, i) => ({
        name: t.client || "Client",
        role: t.city || "",
        quote: stripHtml(t.text || ""),
        rating: typeof t.rating === "number" ? t.rating : 5,
        avatar: t.avatar || TESTIMONIALS[i % TESTIMONIALS.length].avatar,
      }))
    : TESTIMONIALS;
  const perPage = 3;
  const pages = Array.from({ length: Math.ceil(list.length / perPage) }, (_, i) => list.slice(i * perPage, i * perPage + perPage));
  const [page, setPage] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPage((p) => (p + 1) % pages.length), 5500);
    return () => clearInterval(t);
  }, [pages.length]);

  const tHead = content?.about?.testimonials;
  return (
    <Section className="py-10 md:py-12">
      <SectionHead eyebrow={tHead?.eyebrow || "Client Love"} title={tHead?.title || "What Our Clients Say"} />

      <div className="relative mt-14">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={page}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="grid gap-5 md:grid-cols-3">
              {pages[page].map((t, i) => (
                <div key={i} className="flex h-full flex-col rounded-2xl border border-[var(--a-line)] bg-white p-6 shadow-sm">
                  <div className="flex justify-center gap-0.5 text-[var(--a-gold)]">
                    {Array.from({ length: t.rating }).map((_, i) => <Star key={i} width={16} height={16} className="fill-current" />)}
                  </div>
                  <p className="mt-4 flex-1 text-center text-[14px] leading-7 text-[var(--a-body)]">“{t.quote}”</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-[var(--a-line)] pt-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-bold text-[var(--a-ink)]">{t.name}</div>
                      <div className="text-xs text-[var(--a-body)]">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* dot pagination */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {pages.map((_, i) => (
            <button key={i} onClick={() => setPage(i)} aria-label={`Go to page ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === page ? "w-6 bg-[var(--a-green-2)]" : "w-2 bg-[var(--a-green-dim)]"}`} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── 8. CTA footer ── */
export function CtaFooter({ content }: WithContent) {
  const c = content?.about?.cta;
  return (
    <Section className="pb-10 pt-2">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-[var(--a-green-2)] px-6 py-11 md:px-12">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c?.bgImage || IMG.ctaBg} alt="" className="h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--a-green-2), var(--a-green-2) 45%, transparent)" }} />
          </div>
          <div className="relative max-w-xl">
            <h3 className="font-playfair text-2xl font-bold text-white md:text-[2.1rem]">{c?.heading || "Let's Create Beautiful Memories Together"}</h3>
            <p className="mt-3 text-sm leading-6 text-white/70">{c?.subtitle || "Have a project in mind? Let's talk about how we can bring your vision to life."}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <AriaBtn variant="gold" icon={Calendar} iconBox href={c?.primaryHref || "/contact"}>{c?.primaryLabel || "Book a Consultation"}</AriaBtn>
              <motion.a href={c?.secondaryHref || "/contact"} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 rounded-lg border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/20">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/15"><MessageCircle width={14} height={14} /></span>
                {c?.secondaryLabel || "Chat with AI Assistant"}
              </motion.a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
