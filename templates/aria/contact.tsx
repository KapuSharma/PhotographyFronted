"use client";

/* =====================================================================
   "Aria" template — Contact page (FRONTEND ONLY).
   Placeholder data, ready for CMS wiring.
   ===================================================================== */

import { useState } from "react";
import {
  Phone, Mail, MapPin, Send, Sparkles, ShieldCheck, Camera, Clock, Calendar,
  Heart, ArrowRight, ChevronDown, User, type LucideIcon,
} from "lucide-react";
import { Reveal } from "./motion";
import type { TemplatePageProps } from "@/templates/types";

const HERO_IMG = "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=80";

const SERVICES = ["Wedding", "Pre-Wedding", "Maternity", "Fashion", "Corporate", "Product", "Event"];

const CONTACT = [
  { icon: Phone, label: "+91 98300 00000", sub: "Mon – Sat, 10 AM – 7 PM" },
  { icon: Mail, label: "hello@studio.in", sub: "We reply within 24 hours" },
  { icon: MapPin, label: "Park Street, Kolkata", sub: "West Bengal, India – 700016" },
];

const WHY: { icon: LucideIcon; title: string; sub: string }[] = [
  { icon: Camera, title: "Customised Solutions", sub: "Tailored to your vision and needs." },
  { icon: Clock, title: "Quick Response", sub: "We respond within 24 hours." },
  { icon: Calendar, title: "Easy Booking", sub: "Hassle-free scheduling." },
  { icon: Heart, title: "Personalised Experience", sub: "We care for every moment." },
];

const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14 ${className}`}>{children}</section>
);
const field = "w-full rounded-lg border border-[var(--a-line)] bg-white px-3.5 py-2.5 text-sm text-[var(--a-ink)] outline-none transition placeholder:text-[var(--a-body)]/60 focus:border-[var(--a-green)]/60 focus:ring-2 focus:ring-[var(--a-green)]/15";
const label = "mb-1 block text-xs font-semibold text-[var(--a-ink)]";

export default function AriaContact(_props: TemplatePageProps) {
  const [msg, setMsg] = useState("");

  return (
    <main className="aria font-inter bg-[var(--a-cream)] text-[var(--a-ink)]">
      {/* ── Hero (overlay banner, blog/reviews style) ── */}
      <section className="relative h-[230px] w-full overflow-hidden bg-[#f1e8db] sm:h-[260px] md:h-[290px]">
        {/* Full-bleed flatlay, anchored right; the left fades to cream for the text. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMG} alt="Every picture tells a story. Let's tell yours." className="absolute inset-0 h-full w-full object-cover object-right" />
        {/* Left→right readability gradient, matched to the hero's warm cream. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f1e8db] via-[#f1e8db]/85 to-transparent md:via-[#f1e8db]/70" />
        {/* Content overlay, aligned to the site grid */}
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full w-full max-w-[1200px] items-center px-5 sm:px-6 lg:px-8 xl:max-w-[1360px] xl:px-10 2xl:max-w-[1560px] 2xl:px-14">
            <div className="max-w-xl">
              <Reveal><p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--a-green)]">Get In Touch</p></Reveal>
              <Reveal delay={0.06}>
                <h1 className="font-playfair mt-3 text-[2.4rem] font-bold leading-[1.15] text-[var(--a-ink)] md:text-[2.75rem]">
                  Let&apos;s create something<br /><em className="font-script text-[38px] font-normal normal-case not-italic leading-none text-[var(--a-green)] md:text-[48px]">beautiful together</em>
                </h1>
              </Reveal>
              <Reveal delay={0.12}><p className="mt-4 max-w-md text-[15px] leading-7 text-[var(--a-body)]">Have a question or ready to book your session? We&apos;d love to hear from you.</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form + Get in touch (pulled up to overlap the hero banner) ── */}
      <Wrap className="relative z-10 -mt-6 grid items-stretch gap-6 md:-mt-8 lg:grid-cols-[1.55fr_1fr]">
        {/* Enquiry form */}
        <Reveal className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-[var(--a-line)] bg-white p-6 shadow-sm md:p-7">
            <h2 className="font-playfair text-[1.375rem] font-bold text-[var(--a-ink)]">Send us an enquiry</h2>
            <span className="mt-2 block h-0.5 w-10 rounded bg-[var(--a-green)]" />
            <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label}>Full name *</label>
                  <div className="relative">
                    <User width={16} height={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--a-body)]/55" />
                    <input className={`${field} !pl-10`} placeholder="Your name" />
                  </div>
                </div>
                <div>
                  <label className={label}>Phone *</label>
                  <div className="relative">
                    <Phone width={16} height={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--a-body)]/55" />
                    <input className={`${field} !pl-10`} placeholder="Your phone number" />
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label}>Email *</label>
                  <div className="relative">
                    <Mail width={16} height={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--a-body)]/55" />
                    <input type="email" className={`${field} !pl-10`} placeholder="you@email.com" />
                  </div>
                </div>
                <div>
                  <label className={label}>Service *</label>
                  <div className="relative">
                    <select className={`${field} appearance-none pr-9`} defaultValue=""><option value="" disabled>Select a service</option>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select>
                    <ChevronDown width={16} height={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--a-body)]" />
                  </div>
                </div>
              </div>
              <div>
                <label className={label}>Message *</label>
                <div className="relative">
                  <textarea rows={3} maxLength={500} value={msg} onChange={(e) => setMsg(e.target.value)} className={`${field} resize-none`} placeholder="Tell us about your shoot, requirements, date, location or any special request..." />
                  <span className="absolute bottom-2.5 right-3 text-xs text-[var(--a-body)]/70">{msg.length}/500</span>
                </div>
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[var(--a-green-2)] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--a-green)]">
                <Send width={16} height={16} /> Send enquiry
              </button>
              <p className="flex items-center gap-1.5 text-xs text-[var(--a-body)]"><ShieldCheck width={14} height={14} className="text-[var(--a-green)]" /> We respect your privacy. Your information is safe with us.</p>
            </form>
          </div>
        </Reveal>

        {/* Get in touch — flex column so items + CRM note spread to match the
            form card's height instead of bunching at the top. */}
        <Reveal delay={0.08} className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-[var(--a-line)] bg-white p-6 shadow-sm md:p-7">
            <h2 className="font-playfair text-[1.375rem] font-bold text-[var(--a-ink)]">Get in touch</h2>
            <span className="mt-2 block h-0.5 w-10 rounded bg-[var(--a-green)]" />
            <ul className="mt-6 flex flex-1 flex-col justify-center gap-5">
              {CONTACT.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label} className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--a-green-soft)] text-[var(--a-green)]"><Icon width={21} height={21} /></span>
                    <div><div className="text-base font-bold text-[var(--a-ink)]">{c.label}</div><div className="mt-0.5 text-sm text-[var(--a-body)]">{c.sub}</div></div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-[var(--a-green-soft)]/70 p-4">
              <Sparkles width={18} height={18} className="mt-0.5 shrink-0 text-[var(--a-green)]" />
              <p className="text-sm leading-6 text-[var(--a-ink)]"><span className="font-bold text-[var(--a-green)]">Every enquiry creates a CRM lead</span> automatically (SRST-RT-WB / FR-CRM-1).</p>
            </div>
          </div>
        </Reveal>
      </Wrap>

      {/* ── Why reach out + map ── */}
      <Wrap className="pt-4">
        <Reveal>
          <div className="grid gap-6 rounded-2xl border border-[var(--a-line)] bg-[#f6f7f5] p-6 lg:grid-cols-2 lg:p-8">
            <div>
              <h3 className="text-base font-bold text-[var(--a-ink)]">Why reach out to us?</h3>
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {WHY.map((w) => {
                  const Icon = w.icon;
                  return (
                    <div key={w.title} className="text-center">
                      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--a-green-soft)] text-[var(--a-green)]"><Icon width={20} height={20} /></span>
                      <div className="mt-3 text-sm font-bold text-[var(--a-ink)]">{w.title}</div>
                      <p className="mt-1 text-xs text-[var(--a-body)]">{w.sub}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Map */}
            <div className="relative min-h-[240px] overflow-hidden rounded-xl bg-[#dfe6e2]">
              <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(#cdd8d2 1px,transparent 1px),linear-gradient(90deg,#cdd8d2 1px,transparent 1px)", backgroundSize: "38px 38px" }} />
              <div className="absolute left-[64%] top-[42%]"><MapPin width={34} height={34} className="text-[var(--a-green-2)] drop-shadow" fill="currentColor" /></div>
              <div className="absolute left-4 top-4 max-w-[240px] rounded-xl bg-white p-4 shadow-lg">
                <div className="text-sm font-bold text-[var(--a-ink)]">High On Innovation Photography Studio</div>
                <div className="mt-1 text-xs text-[var(--a-body)]">Park Street, Kolkata, West Bengal 700016</div>
                <a href="#" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[var(--a-green)]">Get directions <ArrowRight width={13} height={13} /></a>
              </div>
            </div>
          </div>
        </Reveal>
      </Wrap>

      {/* ── CTA band ── */}
      <Wrap className="py-8">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-[var(--a-green-soft)] to-[#eef3f0] px-6 py-6 md:flex-row md:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--a-green)] shadow-sm"><Calendar width={20} height={20} /></span>
              <div>
                <h4 className="text-base font-bold text-[var(--a-ink)]">Ready to capture your story?</h4>
                <p className="text-sm text-[var(--a-body)]">Book your session today and let&apos;s create memories that last forever.</p>
              </div>
            </div>
            <a href="#" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[var(--a-green-2)] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--a-green)]">Book your session <ArrowRight width={16} height={16} /></a>
          </div>
        </Reveal>
      </Wrap>
    </main>
  );
}
