import Link from "next/link";
import {
  ArrowRight, Calendar, Camera, Heart, Users, Baby, Briefcase, Package as PackageIcon,
  PartyPopper, Shirt, Star, Quote, Check, Clock, ArrowUpRight,
} from "lucide-react";

import type { SiteContent } from "@/templates/types";
import { Reveal, Stagger, StaggerItem, TiltCard, CountUp } from "@/components/site/anim";
import { SectionHeading, Section, CTABand } from "@/components/site/kit";
import { AskAiButton } from "@/components/site/ask-ai-button";
import { Stars } from "@/components/site/stars";
import { stripHtml, plainSummary } from "@/lib/utils";

const CLIENTS = ["TATA", "KPMG", "amazon", "wipro", "airtel", "Deloitte."];

function serviceIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("wed") && n.includes("pre")) return Users;
  if (n.includes("wed")) return Heart;
  if (n.includes("matern")) return Baby;
  if (n.includes("corp")) return Briefcase;
  if (n.includes("prod")) return PackageIcon;
  if (n.includes("fashion")) return Shirt;
  if (n.includes("event")) return PartyPopper;
  return Camera;
}

/* ── Hero ── */
function Hero({ content }: { content: SiteContent }) {
  const h = content.hero;
  const heroImg = h.images[0] || content.portfolio[0]?.src;
  return (
    <section className="hero-cream relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="anim-float-slow absolute right-[6%] top-16 h-52 w-52 rounded-full bg-brand-200/25 blur-3xl" />
        <div className="anim-float absolute left-[10%] bottom-10 h-40 w-40 rounded-full bg-gold-500/10 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-7xl 2xl:max-w-[1500px] items-center gap-10 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-6 md:py-24">
        <div>
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {h.badges.map((b) => (
                <span key={b} className="rounded-full border border-brand-100 bg-white/70 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur">
                  {b}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-title mt-5 text-[clamp(2.4rem,5.5vw,4.4rem)] text-foreground">
              Photography that feels like <span className="script-accent">the moment</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground md:text-lg">{stripHtml(h.subtitle)}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={h.primaryHref || "/booking"}
                className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl"
              >
                <Calendar width={17} height={17} />
                {h.primaryLabel}
                <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              {h.secondaryEnabled ? (
                <AskAiButton
                  label={h.secondaryLabel}
                  className="rounded-full border border-brand-200 bg-white/70 px-6 py-3.5 text-brand-700 backdrop-blur hover:bg-white"
                />
              ) : null}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex gap-8">
              {[
                { v: 1200, s: "+", l: "Projects" },
                { v: 186, s: "+", l: "Happy clients" },
                { v: 4.9, s: "/5", l: "Avg rating" },
              ].map((st) => (
                <div key={st.l}>
                  <div className="display-title text-2xl text-brand-700 md:text-3xl">
                    <CountUp to={st.v} suffix={st.s} />
                  </div>
                  <div className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{st.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative hidden md:block">
          <div className="perspective">
            <TiltCard intensity={7} className="preserve-3d">
              <div className="shine overflow-hidden rounded-[2.2rem] shadow-2xl shadow-brand-900/25 ring-1 ring-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroImg} alt="" className="h-[500px] w-full object-cover" />
              </div>
            </TiltCard>
          </div>
          <div className="anim-float absolute -left-6 bottom-10 max-w-[210px] rotate-[-5deg] rounded-2xl bg-white/95 px-5 py-4 shadow-2xl ring-1 ring-black/5 backdrop-blur">
            <p className="font-script text-[22px] leading-tight text-foreground/80">Let&apos;s tell your story</p>
            <div className="mt-1 flex items-center gap-1"><Stars n={5} /><span className="text-xs font-semibold text-muted-foreground">186+ reviews</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Clients ── */
function Clients() {
  return (
    <div className="tint-green">
    <Section className="!py-14">
      <div className="grid items-center gap-8 rounded-[1.8rem] bg-card px-6 py-8 shadow-sm md:grid-cols-[1fr_2fr] md:px-10">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-600">Our clients</p>
            <h3 className="display-title mt-2 text-2xl text-foreground">Trusted by amazing brands &amp; people</h3>
            <Link href="/gallery" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-700 hover:gap-2 transition-all">
              View all clients <ArrowRight width={15} height={15} />
            </Link>
          </div>
        </Reveal>
        <Stagger className="grid grid-cols-3 gap-6 md:grid-cols-6">
          {CLIENTS.map((c) => (
            <StaggerItem key={c} className="flex items-center justify-center">
              <span className="text-lg font-black tracking-tight text-foreground/40 grayscale transition hover:text-brand-700 hover:grayscale-0 md:text-xl">
                {c}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
    </div>
  );
}

/* ── Services ── */
function Services({ content }: { content: SiteContent }) {
  const sec = content.sections.services;
  return (
    <Section>
      <SectionHeading eyebrow={sec.eyebrow || "Our services"} title={<>What we do <span className="script-accent">best</span></>} desc={sec.desc || "From timeless weddings to stunning portraits, we capture it all."} />
      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.services.map((s) => {
          const Icon = serviceIcon(s.name);
          return (
            <StaggerItem key={s.id}>
              <div className="perspective h-full">
                <TiltCard intensity={6} className="preserve-3d h-full">
                  <Link href={`/services`} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm lift">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition group-hover:bg-brand-600 group-hover:text-white">
                      <Icon width={22} height={22} />
                    </span>
                    <h4 className="mt-4 text-lg font-bold text-foreground">{s.name} Photography</h4>
                    <p className="mt-1.5 flex-1 text-sm leading-6 text-muted-foreground line-clamp-3">{plainSummary(s.desc)}</p>
                    <div className="mt-4 flex items-center justify-between">
                      {s.from ? <span className="text-sm font-bold text-brand-700">From {s.from}</span> : <span />}
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-700 transition group-hover:gap-2">Explore <ArrowUpRight width={15} height={15} /></span>
                    </div>
                  </Link>
                </TiltCard>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

/* ── Reviews ── */
function Reviews({ content }: { content: SiteContent }) {
  const sec = content.sections.reviews;
  return (
    <div className="tint-cream">
      <Section>
        <SectionHeading eyebrow={sec.eyebrow || "What clients say"} title={<>Stories that make us <span className="script-accent">proud</span></>} desc={sec.desc || "Real words from real people who trusted us with their special moments."} />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {content.testimonials.slice(0, 3).map((t, i) => (
            <StaggerItem key={i}>
              <div className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-sm lift">
                <Quote width={30} height={30} className="text-brand-100" />
                <p className="mt-2 text-[15px] leading-7 text-foreground/80">“{stripHtml(t.text)}”</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {t.client.slice(0, 1)}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.client}</div>
                    <div className="text-xs text-muted-foreground">{t.city}</div>
                  </div>
                  <Stars n={t.rating} className="ml-auto" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-8 text-center">
          <Link href="/reviews" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:gap-2.5 transition-all">
            View all reviews <ArrowRight width={15} height={15} />
          </Link>
        </Reveal>
      </Section>
    </div>
  );
}

/* ── Blog ── */
function BlogStrip({ content }: { content: SiteContent }) {
  return (
    <div className="tint-blue">
    <Section>
      <div className="flex items-end justify-between">
        <SectionHeading center={false} eyebrow="Latest from blog" title={<>Tips, ideas &amp; <span className="script-accent">inspiration</span></>} desc="Explore our latest guides to plan better and create beautiful memories." />
        <Reveal className="hidden md:block">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:gap-2.5 transition-all">View all posts <ArrowRight width={15} height={15} /></Link>
        </Reveal>
      </div>
      <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
        {content.blog.slice(0, 3).map((b) => (
          <StaggerItem key={b.title}>
            <Link href={`/blog/${slugify(b.title)}`} className="group block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm lift">
              <div className="shine relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.image} alt={b.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold text-brand-600">{b.date}</div>
                <h4 className="mt-2 text-base font-bold leading-snug text-foreground group-hover:text-brand-700">{b.title}</h4>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground line-clamp-2">{stripHtml(b.excerpt)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-700 transition group-hover:gap-2">Read more <ArrowRight width={14} height={14} /></span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
    </div>
  );
}

/* ── Packages ── */
function Packages({ content }: { content: SiteContent }) {
  const sec = content.sections.packages;
  return (
    <div className="tint-green">
      <Section>
        <SectionHeading eyebrow={sec.eyebrow || "Our packages"} title={<>Packages that fit your <span className="script-accent">needs</span></>} desc={sec.desc || "Flexible packages for every occasion and every budget."} />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {content.packages.map((p) => (
            <StaggerItem key={p.id}>
              <div className={`relative flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm lift ${p.popular ? "border-brand-300 ring-2 ring-brand-200" : "border-border"}`}>
                {p.popular ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">Most popular</span>
                ) : null}
                <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{p.duration}</div>
                <h4 className="mt-1 text-xl font-extrabold text-foreground">{p.name}</h4>
                <div className="mt-3 flex items-end gap-1">
                  <span className="display-title text-3xl text-brand-700">{p.price}</span>
                  <span className="mb-1 text-xs text-muted-foreground">starting from</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.bestFor}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check width={16} height={16} className="mt-0.5 shrink-0 text-brand-600" /> {inc}
                    </li>
                  ))}
                </ul>
                <Link href={`/packages/${p.id}`} className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${p.popular ? "bg-brand-600 text-white hover:bg-brand-700" : "border border-brand-200 text-brand-700 hover:bg-brand-50"}`}>
                  View details <ArrowRight width={15} height={15} />
                </Link>
              </div>
            </StaggerItem>
          ))}
          {/* Custom package */}
          <StaggerItem>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-brand-300 bg-brand-50/40 p-6 lift">
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Tailored for you</div>
                <h4 className="mt-1 text-xl font-extrabold text-foreground">Custom Package</h4>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Tell us your requirements and we&apos;ll craft the perfect package for your day.</p>
              </div>
              <Link href="/contact" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-brand-300 px-5 py-3 text-sm font-bold text-brand-700 transition hover:bg-white">
                Enquire now <ArrowRight width={15} height={15} />
              </Link>
            </div>
          </StaggerItem>
        </Stagger>
      </Section>
    </div>
  );
}

export function HomeView({ content }: { content: SiteContent }) {
  return (
    <main>
      <Hero content={content} />
      <Clients />
      <Services content={content} />
      <Reviews content={content} />
      <BlogStrip content={content} />
      <Packages content={content} />
      <CTABand
        title={content.cta.title || "Let's create something beautiful together"}
        subtitle={content.cta.subtitle}
      />
    </main>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
