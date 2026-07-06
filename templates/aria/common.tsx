"use client";

/* =====================================================================
   "Aria" template — COMMON lower-page sections (FRONTEND ONLY).
   Reusable across pages; each will become an individually CMS-toggleable
   block (show/hide) when wired. Placeholder data below.
   Uses the scoped .aria palette + shared motion primitives.
   ===================================================================== */

import {
  Heart, Users, Baby, Briefcase, Package as PackageIcon, PartyPopper,
  Quote, Star, ArrowRight, Check, MapPin, Phone, Mail, Clock, Send,
  type LucideIcon,
} from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "./motion";
import type { SiteContent } from "@/templates/types";

type WithContent = { content?: SiteContent };
const u = (id: string, w = 600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* CMS icon-key → glyph map for the services strip. */
const CS_ICONS: Record<string, LucideIcon> = { heart: Heart, users: Users, baby: Baby, briefcase: Briefcase, package: PackageIcon, party: PartyPopper };
const csic = (k?: string): LucideIcon => (k && CS_ICONS[k]) || Heart;

/* ── placeholder data ── */
const CLIENTS = ["TATA", "KPMG", "amazon", "wipro", "airtel", "Deloitte."];
const STORIES = [
  { text: "High On Innovation captured our wedding so beautifully. Every moment was natural and full of emotions. Highly recommended!", name: "Rahul & Priya", role: "Wedding Client", avatar: u("1607346256330-dee7af15f7c5", 150), rating: 5 },
  { text: "Professional team, creative ideas and great communication. The photos turned out even better than we imagined!", name: "Ankit Mehra", role: "Corporate Client", avatar: u("1500648767791-00dcc994a43e", 150), rating: 5 },
  { text: "Loved the entire experience! They made us feel so comfortable and the pictures are simply timeless.", name: "Sneha Kapoor", role: "Maternity Client", avatar: u("1573496359142-b8d87734a5a2", 150), rating: 5 },
];
const BLOG = [
  { title: "Top 10 Pre-Wedding Shoot Locations in India", date: "May 20, 2024", img: u("1583939003579-730e3918a45a", 300) },
  { title: "What to Wear for Your Maternity Shoot", date: "May 15, 2024", img: u("1529626455594-4ff0802cfb7e", 300) },
  { title: "How to Prepare for Your Wedding Photoshoot", date: "May 10, 2024", img: u("1519741497674-611481863552", 300) },
];
const SERVICES: { icon: LucideIcon; name: string; desc: string }[] = [
  { icon: Heart, name: "Wedding Photography", desc: "Complete wedding coverage with beautiful storytelling." },
  { icon: Users, name: "Pre-Wedding Photography", desc: "Romantic shoots that celebrate your love story." },
  { icon: Baby, name: "Maternity Photography", desc: "Elegant and heartfelt maternity sessions just for you." },
  { icon: Briefcase, name: "Corporate Photography", desc: "Professional imagery for your brand and team." },
  { icon: PackageIcon, name: "Product Photography", desc: "High-quality images that make your products shine." },
  { icon: PartyPopper, name: "Event Photography", desc: "Candid moments from your special events." },
];
const PACKAGES: { name: string; price: string; note: string; popular?: boolean; custom?: boolean; features: string[]; img?: string; cta: string }[] = [
  { name: "Silver Package", price: "₹25,000", note: "Starting from", features: ["4 Hours Coverage", "1 Photographer", "100+ Edited Photos", "Online Gallery"], img: u("1519741497674-611481863552", 500), cta: "View Details" },
  { name: "Gold Package", price: "₹45,000", note: "Starting from", popular: true, features: ["8 Hours Coverage", "2 Photographers", "300+ Edited Photos", "Premium Album"], img: u("1583939003579-730e3918a45a", 500), cta: "View Details" },
  { name: "Platinum Package", price: "₹75,000", note: "Starting from", features: ["12 Hours Coverage", "2 Photographers", "500+ Edited Photos", "Premium Album + Box"], img: u("1511795409834-ef04bbd61622", 500), cta: "View Details" },
  { name: "Custom Package", price: "", note: "Tailored for you", custom: true, features: [], cta: "Enquire Now" },
];
const CONTACT = {
  address: "123, Park Street, Salt Lake, Kolkata – 700091, India",
  phone: "+91 98765 43210",
  email: "hello@highoninnovation.com",
  hours: "Mon – Sat: 10:00 AM – 7:00 PM",
};

/* ── shared bits ── */
const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14 ${className}`}>{children}</section>
);
const Eyebrow = ({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "gold" | "blue" }) => (
  <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${tone === "gold" ? "text-[var(--a-gold)]" : tone === "blue" ? "text-[#3b6ea5]" : "text-[var(--a-green)]"}`}>{children}</p>
);
const Title = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-playfair mt-2 text-[clamp(1.6rem,2.6vw,2.1rem)] font-bold leading-tight text-[var(--a-ink)]">{children}</h2>
);
const ViewAll = ({ children, tone = "green", href = "#" }: { children: React.ReactNode; tone?: "green" | "gold" | "blue"; href?: string }) => (
  <a href={href} className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5 ${tone === "gold" ? "text-[var(--a-gold)]" : tone === "blue" ? "text-[#3b6ea5]" : "text-[var(--a-green)]"}`}>{children} <ArrowRight width={15} height={15} /></a>
);
/* Each section is a rounded, contained panel (gaps show the page bg between them). */
const Band = ({ children, bg }: { children: React.ReactNode; bg: string }) => (
  <Wrap>
    <div style={{ background: bg }} className="grid gap-8 rounded-2xl px-6 py-10 md:grid-cols-[0.85fr_2.3fr] md:items-center md:gap-10 md:px-10 md:py-11">{children}</div>
  </Wrap>
);

/* ── 1. Our Clients ── */
export function ClientsSection({ content }: WithContent) {
  const d = content?.commonSections?.clients;
  const logos = d?.logos?.length ? d.logos : CLIENTS;
  return (
    <Band bg="#f3f4f5">
      <Reveal>
        <Eyebrow>{d?.eyebrow || "Our Clients"}</Eyebrow>
        <Title>{d?.title || "Trusted by amazing brands & people"}</Title>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--a-body)]">{d?.paragraph || "Proud to work with some of the most inspiring brands and wonderful people."}</p>
        <ViewAll href={d?.viewAllHref || "#"}>{d?.viewAllLabel || "View all clients"}</ViewAll>
      </Reveal>
      <Stagger className="flex flex-wrap items-center justify-between gap-y-6 md:border-l md:border-[var(--a-line)] md:pl-10">
        {logos.map((c) => (
          <StaggerItem key={c} className="w-1/3 text-center md:w-auto md:flex-1">
            <span className="text-lg font-black tracking-tight text-[var(--a-ink)]/40 transition hover:text-[var(--a-green)] md:text-xl">{c}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </Band>
  );
}

/* ── 2. Stories / Testimonials ── */
export function StoriesSection({ content }: WithContent) {
  const d = content?.commonSections?.stories;
  const items = d?.items?.length ? d.items : STORIES;
  return (
    <Band bg="#faf5ec">
      <Reveal>
        <Eyebrow tone="gold">{d?.eyebrow || "What Our Clients Say"}</Eyebrow>
        <Title>{d?.title || "Stories that make us proud"}</Title>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--a-body)]">{d?.paragraph || "Real words from real people who trusted us with their special moments."}</p>
        <ViewAll tone="gold" href={d?.viewAllHref || "/reviews"}>{d?.viewAllLabel || "View all reviews"}</ViewAll>
      </Reveal>
      <Stagger className="grid gap-4 sm:grid-cols-3">
        {items.map((s) => (
          <StaggerItem key={s.name}>
            <div className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm">
              <Quote width={26} height={26} className="text-[var(--a-gold)]" />
              <p className="mt-2 flex-1 text-[13px] leading-6 text-[var(--a-body)]">{s.text}</p>
              <div className="mt-4 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.avatar} alt={s.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-bold text-[var(--a-ink)]">{s.name}</div>
                  <div className="text-xs text-[var(--a-body)]">{s.role}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5 text-[var(--a-gold)]">{Array.from({ length: s.rating }).map((_, i) => <Star key={i} width={14} height={14} className="fill-current" />)}</div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Band>
  );
}

/* ── 3. Latest from Blog ── */
export function BlogSection({ content }: WithContent) {
  const d = content?.commonSections?.blog;
  const items = d?.items?.length ? d.items : BLOG;
  return (
    <Band bg="#eef3f6">
      <Reveal>
        <Eyebrow tone="blue">{d?.eyebrow || "Latest from Blog"}</Eyebrow>
        <Title>{d?.title || "Tips, ideas & inspiration for your next shoot"}</Title>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--a-body)]">{d?.paragraph || "Explore our latest blogs and guides to plan better and create beautiful memories."}</p>
        <ViewAll tone="blue" href={d?.viewAllHref || "/blog"}>{d?.viewAllLabel || "View all posts"}</ViewAll>
      </Reveal>
      <Stagger className="grid gap-5 sm:grid-cols-3 md:border-l md:border-[var(--a-line)] md:pl-10">
        {items.map((b) => (
          <StaggerItem key={b.title}>
            <a href={(b as { href?: string }).href || "#"} className="group flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.img} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
              <div>
                <h4 className="text-[13px] font-bold leading-snug text-[var(--a-ink)] group-hover:text-[#3b6ea5]">{b.title}</h4>
                <div className="mt-1 text-[11px] text-[var(--a-body)]">{b.date}</div>
                <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-[#3b6ea5]">Read more <ArrowRight width={12} height={12} /></span>
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Band>
  );
}

/* ── 4. Our Services ── */
export function ServicesSection({ content }: WithContent) {
  const d = content?.commonSections?.services;
  const items = d?.items?.length ? d.items.map((s) => ({ Icon: csic(s.icon), name: s.name, desc: s.desc })) : SERVICES.map((s) => ({ Icon: s.icon, name: s.name, desc: s.desc }));
  return (
    <Band bg="#f3f4f5">
      <Reveal>
        <Eyebrow>{d?.eyebrow || "Our Services"}</Eyebrow>
        <Title>{d?.title || "What we do best"}</Title>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--a-body)]">{d?.paragraph || "From timeless weddings to stunning portraits, we capture it all."}</p>
        <ViewAll href={d?.viewAllHref || "/services"}>{d?.viewAllLabel || "View all services"}</ViewAll>
      </Reveal>
      <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((s) => (
          <StaggerItem key={s.name}>
            <div className="h-full rounded-2xl bg-white p-4 text-center shadow-sm transition hover:-translate-y-1">
              <s.Icon width={26} height={26} strokeWidth={1.5} className="mx-auto text-[var(--a-green)]" />
              <h4 className="mt-3 text-xs font-bold leading-tight text-[var(--a-ink)]">{s.name}</h4>
              <p className="mt-1.5 text-[11px] leading-4 text-[var(--a-body)]">{s.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Band>
  );
}

/* ── 5. Our Packages ── */
export function PackagesSection({ content }: WithContent) {
  const d = content?.commonSections?.packages;
  const items = d?.items?.length ? d.items : PACKAGES;
  return (
    <Band bg="#faf5ec">
      <Reveal>
        <Eyebrow tone="gold">{d?.eyebrow || "Our Packages"}</Eyebrow>
        <Title>{d?.title || "Packages that fit your needs"}</Title>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--a-body)]">{d?.paragraph || "Flexible packages for every occasion and every budget."}</p>
        <ViewAll tone="gold" href={d?.viewAllHref || "/packages"}>{d?.viewAllLabel || "View all packages"}</ViewAll>
      </Reveal>
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <StaggerItem key={p.name}>
            <div className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm ${p.popular ? "border-[var(--a-green)]/40 ring-2 ring-[var(--a-green)]/15" : "border-[var(--a-line)]"}`}>
              {p.img ? (
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt="" className="h-full w-full object-cover" />
                  {p.popular ? <span className="absolute left-2 top-2 rounded-md bg-[var(--a-green)] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">Most Popular</span> : null}
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-4">
                <h4 className="text-sm font-extrabold text-[var(--a-ink)]">{p.name}</h4>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--a-body)]">{p.note}</div>
                {p.price ? <div className="text-lg font-extrabold text-[var(--a-gold)]">{p.price}</div> : null}
                {p.custom ? (
                  <p className="mt-2 flex-1 text-xs leading-5 text-[var(--a-body)]">Tell us your requirements and we&apos;ll create the perfect package for you.</p>
                ) : (
                  <ul className="mt-3 flex-1 space-y-1.5">
                    {p.features.map((f) => <li key={f} className="flex items-center gap-1.5 text-[11px] text-[var(--a-body)]"><Check width={12} height={12} className="text-[var(--a-green)]" /> {f}</li>)}
                  </ul>
                )}
                <a href={(p as { href?: string }).href || "#"} className={`mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-bold transition ${p.popular ? "bg-[var(--a-green-2)] text-white hover:bg-[var(--a-green)]" : "border border-[var(--a-green)]/40 text-[var(--a-green)] hover:bg-[var(--a-green)] hover:text-white"}`}>{p.cta}</a>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Band>
  );
}

/* ── 6. Contact ── */
const Social = ({ children, href = "#" }: { children: React.ReactNode; href?: string }) => (
  <a href={href} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--a-green)] shadow-sm ring-1 ring-[var(--a-line)] transition hover:bg-[var(--a-green)] hover:text-white">{children}</a>
);
const SOCIAL_GLYPH: Record<string, string> = { facebook: "f", instagram: "I", whatsapp: "W", pinterest: "P", twitter: "t", youtube: "Y", linkedin: "in" };
export function ContactSection({ content }: WithContent) {
  const d = content?.commonSections?.contact;
  const c = { address: d?.address || CONTACT.address, phone: d?.phone || CONTACT.phone, email: d?.email || CONTACT.email, hours: d?.hours || CONTACT.hours };
  const socials = d?.socials?.length ? d.socials : [{ label: "Facebook", url: "#" }, { label: "Instagram", url: "#" }, { label: "WhatsApp", url: "#" }, { label: "Pinterest", url: "#" }];
  const f = d?.form;
  const input = "w-full rounded-lg border border-[var(--a-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--a-ink)] outline-none placeholder:text-[var(--a-body)]/70 focus:border-[var(--a-green)]";
  return (
    <Wrap>
      <div style={{ background: "#eef3f6" }} className="grid gap-10 rounded-2xl px-6 py-10 md:grid-cols-2 md:px-10 md:py-12">
        <Reveal>
          <Eyebrow tone="blue">{d?.eyebrow || "Contact Us"}</Eyebrow>
          <h2 className="font-playfair mt-2 text-[clamp(1.7rem,2.8vw,2.3rem)] font-bold leading-tight text-[var(--a-ink)]">{d?.heading || "Let's capture something beautiful together"}</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-[var(--a-body)]">{d?.paragraph || "We would love to hear from you. Reach out to discuss your ideas and bookings."}</p>
          <ul className="mt-6 space-y-3.5 text-sm text-[var(--a-body)]">
            <li className="flex items-start gap-3"><MapPin width={17} height={17} className="mt-0.5 text-[var(--a-green)]" /> {c.address}</li>
            <li className="flex items-center gap-3"><Phone width={17} height={17} className="text-[var(--a-green)]" /> {c.phone}</li>
            <li className="flex items-center gap-3"><Mail width={17} height={17} className="text-[var(--a-green)]" /> {c.email}</li>
            <li className="flex items-center gap-3"><Clock width={17} height={17} className="text-[var(--a-green)]" /> {c.hours}</li>
          </ul>
          <div className="mt-6 flex gap-2.5">
            {socials.map((s, i) => (
              <Social key={i} href={s.url || "#"}><span className="text-sm font-bold">{SOCIAL_GLYPH[(s.label || "").toLowerCase()] || (s.label || "?").charAt(0)}</span></Social>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="rounded-2xl bg-white p-6 shadow-sm" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={input} placeholder={f?.name || "Your Name"} />
              <input className={input} type="email" placeholder={f?.email || "Your Email"} />
              <input className={input} placeholder={f?.phone || "Your Phone"} />
              <input className={input} placeholder={f?.subject || "Subject"} />
            </div>
            <textarea rows={5} className={`${input} mt-4`} placeholder={f?.message || "Tell us about your requirement"} />
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--a-green-2)] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--a-green)]">
              {f?.submit || "Send Message"} <Send width={15} height={15} />
            </button>
          </form>
        </Reveal>
      </div>
    </Wrap>
  );
}

/* All common sections in order (each will become CMS-toggleable). */
export function CommonSections({ content, page = "gallery" }: WithContent & { page?: string }) {
  const cs = content?.commonSections;
  // A strip shows on a page when it's active AND its `pages` list includes it.
  // With no CMS content (mock), everything defaults to the gallery page.
  const on = (s?: { active: boolean; pages?: string[] }) =>
    s ? s.active !== false && (s.pages || ["gallery"]).includes(page) : page === "gallery";
  const strips: React.ReactNode[] = [];
  if (on(cs?.clients)) strips.push(<ClientsSection key="clients" content={content} />);
  if (on(cs?.stories)) strips.push(<StoriesSection key="stories" content={content} />);
  if (on(cs?.blog)) strips.push(<BlogSection key="blog" content={content} />);
  if (on(cs?.services)) strips.push(<ServicesSection key="services" content={content} />);
  if (on(cs?.packages)) strips.push(<PackagesSection key="packages" content={content} />);
  if (on(cs?.contact)) strips.push(<ContactSection key="contact" content={content} />);
  if (strips.length === 0) return null;
  return <div className="space-y-5 py-5">{strips}</div>;
}
