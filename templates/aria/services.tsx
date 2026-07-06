"use client";

/* =====================================================================
   "Aria" template — Services page (FRONTEND ONLY).
   Placeholder data, ready for CMS wiring.
   ===================================================================== */

import { useState } from "react";
import {
  Camera, Award, Star, Clock, Users, Baby, Briefcase, Package as PackageIcon,
  Shirt, PartyPopper, LayoutGrid, Image as ImageIcon, CheckCircle2, ArrowRight,
  Bookmark, Sparkles, Calendar, type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Reveal, EASE } from "./motion";
import type { TemplatePageProps } from "@/templates/types";

const u = (id: string, w = 700) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* Wedding-rings glyph (lucide has no rings icon). */
const Rings = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}><circle cx="9" cy="15" r="6" stroke="currentColor" strokeWidth="1.7" /><circle cx="15" cy="9" r="6" stroke="currentColor" strokeWidth="1.7" /></svg>
);
/* Drone glyph. */
const Drone = ({ size = 15, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}><circle cx="5" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.5" /><circle cx="19" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.5" /><rect x="8.5" y="10" width="7" height="5" rx="1.4" stroke="currentColor" strokeWidth="1.5" /><path d="M7 8l2 2m8-2l-2 2M12 15v4m-3 0h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
);

const HERO_STATS: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Camera, value: "500+", label: "Projects" }, { icon: Award, value: "8+", label: "Years Exp." },
  { icon: Star, value: "4.9/5", label: "120+ Reviews" }, { icon: Clock, value: "Same Day", label: "Preview" },
];

const TABS: { name: string; icon: React.ComponentType<{ size?: number; className?: string }> | LucideIcon }[] = [
  { name: "All Services", icon: LayoutGrid }, { name: "Wedding", icon: Rings }, { name: "Pre Wedding", icon: Users },
  { name: "Maternity", icon: Baby }, { name: "Corporate", icon: Briefcase }, { name: "Product", icon: PackageIcon },
  { name: "Fashion", icon: Shirt }, { name: "Family", icon: Users }, { name: "Events", icon: PartyPopper },
];

type Svc = {
  name: string; cat: string; rating: string; reviews: string; price: string; features: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>; img: string; thumbs: string[];
  color: string; priceCls: string; btnCls: string; iconCls: string;
};
const SERVICES: Svc[] = [
  { name: "Wedding Photography", cat: "Wedding", rating: "4.9", reviews: "186", price: "₹50,000", icon: Rings,
    features: ["Full Day Coverage (8 Hours)", "2 Professional Photographers", "Premium Album & Box", "300+ Edited Photos", "Drone Coverage"],
    img: u("1519741497674-611481863552"), thumbs: ["1606216794074-73c8a8ff7b0e", "1583939003579-730e3918a45a", "1522673607200-164d1b6ce486"],
    color: "#c8a165", priceCls: "text-[#b98a3e]", btnCls: "bg-[#f6d493] text-[#8a6a2a] hover:bg-[#f2ca7f]", iconCls: "text-[#c8a165]" },
  { name: "Pre-Wedding", cat: "Pre Wedding", rating: "4.8", reviews: "124", price: "₹25,000", icon: Users,
    features: ["2 Locations", "4 Hours Session", "80+ Edited Photos", "Outfit Changes", "Cinematic Highlights"],
    img: u("1522075469751-3a6694fb2f61"), thumbs: ["1520854221256-17451cc331bf", "1518621736915-f3b1c41bfd00", "1465495976277-4387d4b0b4c6"],
    color: "#157a5e", priceCls: "text-[var(--a-green)]", btnCls: "bg-[#a9d4c9] text-[#0e5a44] hover:bg-[#98cbbe]", iconCls: "text-[var(--a-green)]" },
  { name: "Maternity Photography", cat: "Maternity", rating: "4.9", reviews: "98", price: "₹15,000", icon: Baby,
    features: ["2-3 Hours Session", "Indoor / Outdoor", "50+ Edited Photos", "Partner & Family Shots", "Maternity Outfits"],
    img: u("1555252333-9f8e92e65df9"), thumbs: ["1519689680058-324335c77eba", "1584582396689-7c6f9c3a5e1a", "1490725263030-1f0521cec8ec"],
    color: "#d9668a", priceCls: "text-[#d24d76]", btnCls: "bg-[#f5c9d6] text-[#b04a6a] hover:bg-[#f0bccb]", iconCls: "text-[#d9668a]" },
  { name: "Corporate Photography", cat: "Corporate", rating: "4.8", reviews: "76", price: "₹20,000", icon: Briefcase,
    features: ["Headshots", "Team Photos", "Office Branding", "Events Coverage", "High Resolution Images"],
    img: u("1522071820081-009f0129c71c"), thumbs: ["1556761175-5973dc0f32e7", "1600880292203-757bb62b4baf", "1497366216548-37526070297c"],
    color: "#3f6fd0", priceCls: "text-[#3f6fd0]", btnCls: "bg-[#bcd0f2] text-[#2f5bb0] hover:bg-[#aac2ee]", iconCls: "text-[#3f6fd0]" },
  { name: "Product Photography", cat: "Product", rating: "4.9", reviews: "64", price: "₹12,000", icon: PackageIcon,
    features: ["High Resolution Images", "Multiple Angles", "White Background", "Lifestyle Shots", "Fast Delivery"],
    img: u("1523170335258-f5ed11844a49"), thumbs: ["1542291026-7eec264c27ff", "1505740420928-5e560c06d30e", "1600185365483-26d7a4cc7519"],
    color: "#d97b34", priceCls: "text-[#d97b34]", btnCls: "bg-[#f6d0a0] text-[#b56a24] hover:bg-[#f2c68d]", iconCls: "text-[#d97b34]" },
];

const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14 ${className}`}>{children}</section>
);
const cn = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const Stars = ({ n = 5 }: { n?: number }) => (
  <div className="flex gap-0.5">{Array.from({ length: n }).map((_, i) => <Star key={i} width={13} height={13} className="fill-[var(--a-gold)] text-[var(--a-gold)]" />)}</div>
);

export default function AriaServices(_props: TemplatePageProps) {
  const [tab, setTab] = useState("All Services");
  const shown = tab === "All Services" ? SERVICES : SERVICES.filter((s) => s.cat === tab);

  return (
    <main className="aria font-inter bg-[var(--a-cream)] text-[var(--a-ink)]">
      {/* ── Hero ── */}
      <Wrap className="grid items-center gap-8 py-10 lg:grid-cols-[0.85fr_1.4fr] md:py-12">
        {/* Left */}
        <div>
          <Reveal><h1 className="font-playfair text-[clamp(2.625rem,4.6vw,2.875rem)] font-bold text-[var(--a-ink)]">Our Services</h1></Reveal>
          <Reveal delay={0.06}><p className="mt-1 text-lg font-bold text-[var(--a-green)]">Capturing Moments. Creating Stories.</p></Reveal>
          <Reveal delay={0.12}><p className="mt-4 max-w-sm text-[15px] leading-7 text-[var(--a-body)]">Explore our photography services crafted to preserve your most precious moments with artistry and passion.</p></Reveal>
          <Reveal delay={0.16}>
            <div className="mt-7 grid grid-cols-4 gap-3">
              {HERO_STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--a-green-soft)] text-[var(--a-green)]"><Icon width={16} height={16} /></span>
                    <div className="leading-tight"><div className="text-sm font-extrabold text-[var(--a-ink)]">{s.value}</div><div className="text-[10px] text-[var(--a-body)]">{s.label}</div></div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Featured card */}
        <Reveal delay={0.1}>
          <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative grid overflow-hidden rounded-2xl border border-[var(--a-line)] bg-gradient-to-br from-white to-[#faf6ec] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.3)] sm:grid-cols-[1fr_1.05fr]">
            <div className="relative min-h-[190px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u("1519741497674-611481863552", 800)} alt="Wedding Photography" className="h-full w-full object-cover" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-[var(--a-gold)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow"><Star width={11} height={11} className="fill-current" /> Most Popular</span>
            </div>
            <div className="relative p-5">
              <Camera width={64} height={64} className="pointer-events-none absolute -right-2 top-2 text-[var(--a-gold)]/10" />
              <div className="flex items-center gap-2"><Rings size={20} className="text-[var(--a-gold)]" /><h3 className="font-playfair text-lg font-bold text-[var(--a-ink)]">Wedding Photography</h3></div>
              <div className="mt-1 flex items-center gap-2 text-sm"><Stars /><span className="font-bold text-[var(--a-ink)]">4.9</span><span className="text-[var(--a-body)]">(186 Reviews)</span></div>
              <div className="mt-2.5 text-[11px] font-bold uppercase tracking-wide text-[var(--a-body)]">Starting at</div>
              <div className="text-xl font-bold text-[var(--a-green)]">₹50,000</div>
              <p className="mt-1.5 max-w-xs text-sm leading-6 text-[var(--a-body)]">Full-day story coverage with cinematic photography and premium album.</p>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[var(--a-ink)]/80 sm:grid-cols-3">
                <span className="flex items-center gap-1.5"><Clock width={14} height={14} className="text-[var(--a-green)]" /> 8 Hours</span>
                <span className="flex items-center gap-1.5"><Users width={14} height={14} className="text-[var(--a-green)]" /> 2 Photographers</span>
                <span className="flex items-center gap-1.5"><Drone size={15} className="text-[var(--a-green)]" /> Drone</span>
                <span className="flex items-center gap-1.5"><ImageIcon width={14} height={14} className="text-[var(--a-green)]" /> Premium Album</span>
                <span className="col-span-2 flex items-center gap-1.5"><ImageIcon width={14} height={14} className="text-[var(--a-green)]" /> 300+ Edited Photos</span>
              </div>
              <a href="/packages" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--a-green-2)] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--a-green)]">View Package Details <ArrowRight width={15} height={15} /></a>
            </div>
          </motion.div>
        </Reveal>
      </Wrap>

      {/* ── Filter tabs ── */}
      <Wrap>
        <div className="flex flex-wrap items-center gap-1 rounded-2xl border border-[var(--a-line)] bg-white p-2 shadow-sm">
          {TABS.map((t) => {
            const on = t.name === tab;
            const Icon = t.icon;
            return (
              <button key={t.name} onClick={() => setTab(t.name)}
                className={cn("inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition",
                  on ? "bg-[var(--a-green-2)] text-white shadow" : "text-[var(--a-body)] hover:bg-[var(--a-green-soft)]/60 hover:text-[var(--a-green)]")}>
                <Icon size={16} /> {t.name}
              </button>
            );
          })}
        </div>
      </Wrap>

      {/* ── Service cards ── */}
      <Wrap className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {shown.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.article key={s.name} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex flex-col overflow-hidden rounded-2xl border border-[var(--a-line)] bg-white shadow-sm">
                  {/* Image + badges + thumbs */}
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.img} alt={s.name} className="aspect-[4/3] w-full object-cover" />
                    <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow" style={{ color: s.color }}><Icon size={17} /></span>
                    {idx === 0 && <Bookmark width={22} height={22} className="absolute right-3 top-2 fill-[var(--a-gold)] text-[var(--a-gold)]" />}
                    <div className="absolute -bottom-6 left-3 right-3 flex gap-2">
                      {s.thumbs.map((th, i) => (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img key={i} src={u(th, 160)} alt="" className="h-14 w-1/3 rounded-lg border-2 border-white object-cover shadow-sm" />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-4 pb-4 pt-9">
                    <h3 className="font-playfair text-lg font-bold text-[var(--a-ink)]">{s.name}</h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs"><Stars /><span className="font-bold text-[var(--a-ink)]">{s.rating}</span><span className="text-[var(--a-body)]">({s.reviews})</span></div>
                    <div className="mt-3 text-[10px] font-bold uppercase tracking-wide" style={{ color: s.color }}>Starting at</div>
                    <div className={cn("text-2xl font-bold", s.priceCls)}>{s.price}</div>
                    <ul className="mt-3 flex-1 space-y-1.5">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs text-[var(--a-ink)]/80"><CheckCircle2 width={14} height={14} className="mt-0.5 shrink-0 text-[var(--a-body)]/50" /> {f}</li>
                      ))}
                    </ul>
                    <a href="/packages" className={cn("mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-bold transition", s.btnCls)}>View Packages <ArrowRight width={15} height={15} /></a>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
        {shown.length === 0 && <p className="py-16 text-center text-sm text-[var(--a-body)]">No services in this category yet.</p>}
      </Wrap>

      {/* ── Bottom help band ── */}
      <Wrap className="py-10">
        <Reveal>
          <div className="grid gap-4 rounded-2xl border border-[var(--a-line)] bg-[#f6f7f5] p-5 md:grid-cols-2 md:p-6">
            <div className="flex items-center justify-between gap-4 md:border-r md:border-[var(--a-line)] md:pr-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[var(--a-green)] shadow-sm"><Sparkles width={19} height={19} /></span>
                <div><h4 className="text-sm font-bold text-[var(--a-ink)]">Not sure which package suits you?</h4><p className="text-xs text-[var(--a-body)]">Let our AI assistant help you find the perfect photography package.</p></div>
              </div>
              <a href="#" className="inline-flex shrink-0 items-center rounded-lg border border-[var(--a-green)]/40 bg-white px-4 py-2.5 text-xs font-bold text-[var(--a-green)] transition hover:bg-[var(--a-green-soft)]">Ask AI Assistant</a>
            </div>
            <div className="flex items-center justify-between gap-4 md:pl-2">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[var(--a-green)] shadow-sm"><Calendar width={19} height={19} /></span>
                <div><h4 className="text-sm font-bold text-[var(--a-ink)]">Need a custom package?</h4><p className="text-xs text-[var(--a-body)]">Let&apos;s discuss your requirements and create something perfect for you.</p></div>
              </div>
              <a href="/contact" className="inline-flex shrink-0 items-center rounded-lg border border-[var(--a-green)]/40 bg-white px-4 py-2.5 text-xs font-bold text-[var(--a-green)] transition hover:bg-[var(--a-green-soft)]">Book a Consultation</a>
            </div>
          </div>
        </Reveal>
      </Wrap>
    </main>
  );
}
