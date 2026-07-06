import Link from "next/link";
import {
  Camera, Clock, ShieldCheck, Headphones, Rocket, Building2, Users, Trophy,
  Star, Heart, Lock, Calendar, MapPin, Send, type LucideIcon,
} from "lucide-react";

import { Reveal, Stagger, StaggerItem, TiltCard, CountUp, Parallax } from "@/components/site/anim";
import { SectionHeading, Section } from "@/components/site/kit";
import { AskAiButton } from "@/components/site/ask-ai-button";
import { Stars } from "@/components/site/stars";
import { stripHtml } from "@/lib/utils";
import type { Testimonial } from "@/lib/data";

/* =====================================================================
   About page — section components.
   Content that exists in the CMS (intro copy, portfolio images, stats,
   testimonials) is passed in as props. Sections the CMS has no schema
   for yet (team, journey milestones, why-us, the CTA photo) use the
   clearly-labelled PLACEHOLDER constants below — swap these for CMS
   data once the schema exists.

   NOTE: plain <img> is intentional. This is a multi-tenant template;
   image hosts are arbitrary tenant/CDN domains resolved at runtime, so
   they can't be whitelisted for next/image's remotePatterns.
   ===================================================================== */

type StatItem = { num: number; suffix: string; label: string };

/* ── PLACEHOLDER data (fill from CMS later) ── */
const HERO_FEATURES: { icon: LucideIcon; label: string }[] = [
  { icon: Camera, label: "Natural & Editorial Photography" },
  { icon: Clock, label: "Fast Turnaround & Private Delivery" },
  { icon: ShieldCheck, label: "100% Secure Online Gallery" },
  { icon: Headphones, label: "Personalized Consultation" },
];

const TIMELINE: { year: string; icon: LucideIcon; text: string }[] = [
  { year: "2016", icon: Rocket, text: "Started as a small team of passionate photographers." },
  { year: "2018", icon: Building2, text: "Opened our studio and started serving clients across Kolkata." },
  { year: "2020", icon: Users, text: "Expanded our team and travelled across India for projects." },
  { year: "2023", icon: Camera, text: "Reached 1000+ projects and a 4.9/5 client rating." },
  { year: "2026", icon: Trophy, text: "Continuing our journey to create timeless memories." },
];

const TEAM: { name: string; role: string; img: string }[] = [
  { name: "Prem Kumar", role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&w=600&q=80" },
  { name: "Arjun Das", role: "Lead Photographer", img: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?auto=format&fit=crop&w=600&q=80" },
  { name: "Ananya Bose", role: "Photo Editor", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
  { name: "Rohit Shaw", role: "Cinematographer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
];

const WHY: { icon: LucideIcon; tint: string; title: string; text: string }[] = [
  { icon: Camera, tint: "text-brand-600", title: "Creative Storytelling", text: "We don't just take photos, we tell your story through powerful images." },
  { icon: Star, tint: "text-brand-600", title: "Premium Quality", text: "High-end gear, professional editing and attention to every detail." },
  { icon: Clock, tint: "text-brand-600", title: "Fast Delivery", text: "Quick turnaround with a smooth and transparent workflow." },
  { icon: Heart, tint: "text-rose-500", title: "Personalized Experience", text: "Every client is unique. We tailor each shoot to your vision." },
  { icon: Lock, tint: "text-brand-600", title: "Private & Secure", text: "Your memories are safe with a private gallery and secure delivery." },
];

const CTA_PHOTO = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80";
const STAT_ICONS: LucideIcon[] = [Calendar, Users, MapPin, Camera, Star];

function SocialDots() {
  return (
    <div className="mt-3 flex justify-center gap-2">
      {["I", "f", "t"].map((s) => (
        <span key={s} className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground transition hover:bg-brand-700 hover:text-white">{s}</span>
      ))}
    </div>
  );
}

/* ── 1. Hero ── */
export function AboutHero({ body, image, thumbs }: { body: string; image: string; thumbs: string[] }) {
  return (
    <section className="hero-cream relative overflow-hidden">
      <div className="relative mx-auto grid max-w-7xl 2xl:max-w-[1500px] items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20 lg:gap-16">
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">About Us</p>
              <span className="h-px w-9 bg-gold-500" />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-title mt-5 text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[1.08] text-brand-900">
              We Capture Moments <br className="hidden md:block" />That Last <span className="script-accent text-gold-500">Forever.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="rich-content mt-6 max-w-lg text-[15px] leading-7 text-muted-foreground" dangerouslySetInnerHTML={{ __html: body }} />
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/gallery" className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-700/25 transition hover:-translate-y-0.5 hover:bg-brand-800">
                <Camera width={17} height={17} /> View Portfolio
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-7 py-3.5 text-sm font-bold text-brand-700 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
                <Send width={16} height={16} /> Contact Us
              </Link>
            </div>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-border">
            {HERO_FEATURES.map((f) => (
              <StaggerItem key={f.label} className="flex flex-col items-center gap-2.5 px-3 py-2 text-center">
                <f.icon width={26} height={26} strokeWidth={1.6} className="text-gold-500" />
                <span className="text-[11px] font-semibold leading-tight text-muted-foreground">{f.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Parallax speed={18} className="relative">
          <div
            className="pointer-events-none absolute -right-2 -top-9 h-16 w-28 opacity-80"
            style={{ backgroundImage: "radial-gradient(circle, var(--gold-500) 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }}
          />
          <div className="perspective">
            <TiltCard intensity={4} glare={false} className="preserve-3d">
              <div className="relative">
                {/* main image */}
                <div className="shine overflow-hidden rounded-[1.4rem] shadow-2xl shadow-brand-900/25 ring-1 ring-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="Studio at work" className="h-[340px] w-full object-cover sm:h-[430px]" />
                </div>
                {/* 3 thumbnails tucked directly under the image, slightly overlapping */}
                <div className="relative z-10 -mt-14 grid grid-cols-3 gap-3 px-2 sm:-mt-16">
                  {thumbs.map((t, i) => (
                    <div key={i} className="shine overflow-hidden rounded-2xl shadow-xl ring-[3px] ring-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t} alt="" className="h-[96px] w-full object-cover sm:h-[116px]" />
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>
        </Parallax>
      </div>
    </section>
  );
}

/* ── 2. Stats bar ── */
export function StatsBar({ items }: { items: StatItem[] }) {
  return (
    <Section className="!py-12">
      <Reveal>
        <div className="grid grid-cols-2 gap-y-6 rounded-[1.4rem] border border-border bg-card p-6 shadow-sm sm:grid-cols-3 md:grid-cols-5 md:divide-x md:divide-border md:p-6">
          {items.map((s, i) => {
            const Icon = STAT_ICONS[i] ?? Star;
            return (
              <div key={s.label} className="flex items-center gap-3 px-2 md:justify-center md:px-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600"><Icon width={19} height={19} /></span>
                <div>
                  <div className="display-title text-2xl leading-none text-foreground"><CountUp to={s.num} suffix={s.suffix} /></div>
                  <div className="mt-1 text-[11px] font-semibold text-muted-foreground">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 3. Journey timeline ── */
export function JourneyTimeline() {
  return (
    <Section className="!pt-4">
      <SectionHeading eyebrow="Our journey" title="From Passion to Purpose" />
      <div className="relative mt-14">
        <div className="absolute left-[10%] right-[10%] top-8 hidden border-t-2 border-dotted border-brand-200 md:block" />
        <Stagger className="grid gap-8 md:grid-cols-5">
          {TIMELINE.map((t, i) => {
            const gold = i % 2 === 0;
            const Icon = t.icon;
            return (
              <StaggerItem key={t.year} className="relative text-center">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full shadow-md ring-8 ring-background ${gold ? "bg-cream-100 text-gold-500" : "bg-brand-50 text-brand-600"}`}>
                  <Icon width={24} height={24} />
                </div>
                <div className="mt-4 text-lg font-extrabold text-foreground">{t.year}</div>
                <p className="mx-auto mt-1.5 max-w-[180px] text-sm leading-6 text-muted-foreground">{t.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}

/* ── 4. Team ── */
export function TeamGrid() {
  return (
    <Section className="!pt-8">
      <SectionHeading eyebrow="Meet the team" title="The People Behind the Lens" />
      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((m) => (
          <StaggerItem key={m.name}>
            <div className="perspective">
              <TiltCard intensity={6} glare={false} className="preserve-3d">
                <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm lift">
                  <div className="shine relative aspect-[4/3.3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.img} alt={m.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5 text-center">
                    <div className="text-base font-bold text-foreground">{m.name}</div>
                    <div className="text-xs text-brand-600">{m.role}</div>
                    <SocialDots />
                  </div>
                </div>
              </TiltCard>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ── 5. Behind the scenes (middle image emphasized) ── */
export function BehindScenes({ images }: { images: string[] }) {
  return (
    <Section className="!pt-8">
      <SectionHeading eyebrow="Behind the scenes" title="Where Magic Happens" />
      <Stagger className="mt-12 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 md:grid-cols-[1fr_1fr_1.35fr_1fr_1fr]">
        {images.map((src, i) => (
          <StaggerItem key={i} className={i === 2 ? "col-span-2 sm:col-span-1" : ""}>
            <div className={`shine group overflow-hidden rounded-2xl shadow-sm ${i === 2 ? "aspect-[5/4] md:shadow-lg" : "aspect-[5/4]"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ── 6. Why choose us ── */
export function WhyUs() {
  return (
    <Section className="!pt-8">
      <SectionHeading eyebrow="Why clients choose us" title="The HOI Difference" />
      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {WHY.map((w) => {
          const Icon = w.icon;
          return (
            <StaggerItem key={w.title}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition hover:border-brand-200 lift">
                <Icon width={26} height={26} className={`mx-auto ${w.tint}`} />
                <h4 className="mt-4 text-sm font-bold text-foreground">{w.title}</h4>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{w.text}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

/* ── 7. Client love ── */
export function ClientLove({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Section className="!pt-8">
      <SectionHeading eyebrow="Client love" title="What Our Clients Say" />
      <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.slice(0, 3).map((t, i) => (
          <StaggerItem key={i}>
            <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm lift">
              <Stars n={t.rating} className="justify-center" />
              <p className="mt-4 text-center text-[14px] leading-7 text-foreground/80">“{stripHtml(t.text)}”</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">{t.client.slice(0, 1)}</span>
                <div>
                  <div className="text-sm font-bold text-foreground">{t.client}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="mt-8 flex items-center justify-center gap-2">
        {[0, 1, 2].map((d) => (
          <span key={d} className={`h-2 rounded-full transition-all ${d === 0 ? "w-6 bg-brand-700" : "w-2 bg-brand-200"}`} />
        ))}
      </Reveal>
    </Section>
  );
}

/* ── 8. CTA banner ── */
export function AboutCta() {
  return (
    <section className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 pb-8 md:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 px-6 py-10 md:px-12 md:py-12">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CTA_PHOTO} alt="" className="h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-800 via-brand-800/70 to-transparent" />
          </div>
          <div className="relative max-w-xl">
            <h3 className="display-title text-2xl text-white md:text-[2.1rem]">Let&apos;s Create Beautiful Memories Together</h3>
            <p className="mt-2 text-sm text-white/70">Have a project in mind? Let&apos;s talk about how we can bring your vision to life.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/booking" className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-95">
                <Camera width={16} height={16} /> Book a Consultation
              </Link>
              <AskAiButton label="Chat with AI Assistant" icon="bot" className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-white hover:bg-white/20" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
