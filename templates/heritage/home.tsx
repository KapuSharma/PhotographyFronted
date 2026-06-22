"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Calendar, Send } from "lucide-react";

import { AskAiButton } from "@/components/site/ask-ai-button";
import { useSiteStore } from "@/store/use-site-store";
import { stripHtml } from "@/lib/utils";
import type { TemplateHomeProps } from "@/templates/types";

/* Heritage Elegance — warm ivory "fine-art museum archive" skin.
   Self-contained literal styling (ivory / charcoal / amber, serif + mono) so it
   never affects the other templates. Fully content-driven: the same SiteContent
   that feeds Aurora/Noir feeds this, so switching templates never loses content.
   Header, footer and the AI chat widget come from the shared site layout. */

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function HeritageHome({ content }: TemplateHomeProps) {
  const { hero, services, portfolio, packages, testimonials, sections, cta, studioName } = content;
  const setChatOpen = useSiteStore((s) => s.setChatOpen);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(portfolio.map((p) => p.category).filter(Boolean)))],
    [portfolio]
  );
  const [selected, setSelected] = useState("All");
  const shown = selected === "All" ? portfolio : portfolio.filter((p) => p.category === selected);

  return (
    <main className="bg-[#FBF9F4] font-serif text-[#1C1816] selection:bg-amber-100 selection:text-amber-900">
      {/* Editorial sub-banner */}
      <div className="flex items-center justify-center gap-2 border-b border-amber-950/10 bg-[#1C1816] px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[#EBE6DF]">
        <span className="animate-pulse text-amber-500">◆</span>
        <span className="truncate">{studioName} Archive &bull; Legacy Storytelling &bull; Archival RAW Curation</span>
        <span className="animate-pulse text-amber-500">◆</span>
      </div>

      {/* ---------------- Hero ---------------- */}
      {hero.active && (
        <section id="hero" className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-6 py-12 md:py-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="space-y-6 text-left">
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-amber-800">
                <span>◈</span> <span>{studioName}</span> <span>◈</span>
              </div>
              <h1 className="text-4xl font-extralight leading-[1.1] tracking-tight text-[#1C1816] md:text-6xl">
                {hero.title}
              </h1>
              {hero.subtitle && (
                <p className="max-w-lg text-lg font-light italic leading-relaxed text-stone-600">&ldquo;{hero.subtitle}&rdquo;</p>
              )}
              {hero.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-stone-500">
                  {hero.badges.map((b, i) => (
                    <span key={i} className="border border-stone-300 px-3 py-1.5">{b}</span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-4 pt-2 font-mono">
                <Link href={hero.primaryHref || "/booking"} className="bg-amber-800 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-[#FBF9F4] transition-all hover:bg-[#1C1816]">
                  {hero.primaryLabel || "Determine Availability"}
                </Link>
                {hero.secondaryEnabled && (
                  <button onClick={() => setChatOpen(true)} className="border border-stone-300 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-[#1C1816] transition-all hover:border-amber-800 hover:text-amber-800">
                    {hero.secondaryLabel || "Ask the assistant"}
                  </button>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.15 }} className="relative">
              <div className="group relative border border-stone-300 bg-white p-4 shadow-xl">
                <div className="aspect-[4/5] overflow-hidden border border-stone-100 bg-stone-50">
                  {hero.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={hero.images[0]} alt="" className="h-full w-full object-cover filter sepia-[8%] transition-transform duration-[1200ms] group-hover:scale-[1.02]" />
                  )}
                </div>
                <div className="mt-4 border-t border-stone-100 pt-3 text-center">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#7C756F]">// PORTFOLIO ARCHIVES &mdash; {studioName}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ---------------- Services ---------------- */}
      {sections.services.active && (
        <section id="services" className="border-b border-stone-200 bg-[#FAF6EE] px-6 py-16">
          <div className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px]">
            <div className="mb-10">
              <span className="block font-mono text-xs font-bold uppercase tracking-widest text-amber-800">// 01.{(sections.services.eyebrow || "Services").toUpperCase().replace(/\s+/g, "_")}</span>
              <h2 className="mt-1 text-3xl font-extralight tracking-tight text-[#1C1816]">{sections.services.title}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((s, idx) => {
                const img = s.images?.[0] || s.photo?.src;
                return (
                <motion.div key={s.id} {...fadeUp} transition={{ duration: 0.6, delay: idx * 0.1 }} className="group flex flex-col justify-between border border-stone-200 bg-white p-4 shadow-sm">
                  {img && (
                    <div className="mb-5 aspect-[4/3] overflow-hidden border border-stone-100 bg-stone-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={s.name} className="h-full w-full object-cover filter sepia-[5%] transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between px-4 pb-4">
                    <div className="space-y-4">
                      {s.from && <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-800">From {s.from}</span>}
                      <h3 className="text-xl font-normal tracking-wide text-[#1C1816]">{s.name}</h3>
                      {s.desc && <p className="text-xs font-light italic leading-relaxed text-stone-500">&ldquo;{s.desc}&rdquo;</p>}
                    </div>
                    <div className="mt-6 border-t border-stone-100 pt-6">
                      <Link href={`/services/${s.id}`} className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#1C1816] transition-colors hover:text-amber-800">
                        Explore service <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Portfolio plates (filterable) ---------------- */}
      {sections.portfolio.active && (
        <section id="gallery" className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-6 py-16">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="block font-mono text-xs font-bold uppercase tracking-widest text-amber-800">// 02.PORTFOLIO_PLATES</span>
              <h2 className="mt-1 text-3xl font-extralight tracking-tight text-[#1C1816]">{sections.portfolio.title}</h2>
            </div>
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2 font-mono text-[9px] font-bold uppercase tracking-wider">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setSelected(cat)} className={`border px-4 py-2 transition-colors ${selected === cat ? "border-[#1C1816] bg-[#1C1816] text-[#FBF9F4]" : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {shown.map((p, index) => (
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={p.src + index} className="group flex flex-col justify-between border border-stone-200 bg-white p-3 shadow-sm">
                  <div>
                    <div className="relative aspect-square overflow-hidden border border-stone-100 bg-stone-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.src} alt={p.title} className="h-full w-full object-cover filter sepia-[5%] transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="mt-3 text-left">
                      {p.category && <span className="block font-mono text-[9px] font-bold uppercase tracking-wider text-stone-400">{p.category}</span>}
                      <span className="mt-1 block truncate font-sans text-xs font-light text-[#1C1816]">{p.title}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2 font-mono text-[7.5px] uppercase tracking-widest text-stone-400">
                    <span>PLATE No. {index + 101}</span>
                    <span>50MM F/1.2 &bull; RAW</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="mt-8">
            <Link href="/gallery" className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-800 hover:text-[#1C1816]">View full archive →</Link>
          </div>
        </section>
      )}

      {/* ---------------- Packages ---------------- */}
      {sections.packages.active && packages.length > 0 && (
        <section className="border-b border-stone-200 bg-[#FAF6EE] px-6 py-16">
          <div className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px]">
            <div className="mb-10">
              <span className="block font-mono text-xs font-bold uppercase tracking-widest text-amber-800">// 03.INVESTMENT_TIERS</span>
              <h2 className="mt-1 text-3xl font-extralight tracking-tight text-[#1C1816]">{sections.packages.title}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((p, idx) => (
                <motion.div key={p.id} {...fadeUp} transition={{ duration: 0.6, delay: idx * 0.08 }} className={`flex flex-col border bg-white p-8 shadow-sm ${p.popular ? "border-amber-800" : "border-stone-200"}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-normal tracking-wide text-[#1C1816]">{p.name}</h3>
                    {p.popular && <span className="bg-amber-800 px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-widest text-[#FBF9F4]">Signature</span>}
                  </div>
                  {p.price && <p className="mt-3 font-mono text-2xl font-light text-amber-800">{p.price}</p>}
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-stone-400">
                    {[p.duration, p.bestFor].filter(Boolean).join(" • ")}
                  </div>
                  {Array.isArray(p.includes) && p.includes.length > 0 && (
                    <ul className="mt-6 space-y-2.5 border-t border-stone-100 pt-6 text-xs font-light text-stone-600">
                      {p.includes.map((inc, i) => (
                        <li key={i} className="flex gap-2"><span className="text-amber-800">—</span>{inc}</li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto pt-8">
                    <Link href="/booking" className="block bg-[#1C1816] py-3.5 text-center font-mono text-[9px] font-bold uppercase tracking-widest text-[#FBF9F4] transition-colors hover:bg-amber-900">Reserve this tier</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- AI concierge (opens the real chat) ---------------- */}
      <section className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-6 py-16">
        <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <span className="block font-mono text-xs font-bold uppercase tracking-widest text-amber-800">// 04.AI_CURATION</span>
            <h2 className="text-3xl font-extralight tracking-tight text-[#1C1816]">Aria Curation Concierge</h2>
            <p className="font-light italic leading-relaxed text-stone-600">
              &ldquo;We encourage absolute, immediate transparency. Interact with our digital curation assistant to clarify investment tiers, deposit regulations and available season blocks.&rdquo;
            </p>
            <AskAiButton label="Open the concierge" icon="bot" className="border border-stone-300 bg-transparent px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1C1816] hover:border-amber-800 hover:text-amber-800" />
          </div>
          <div className="relative border border-stone-200 bg-white p-6 shadow-md">
            <div className="pointer-events-none absolute inset-1 border border-stone-100" />
            <div className="mb-4 flex items-center justify-between border-b border-stone-200 pb-3 font-mono text-[9px] font-bold uppercase tracking-wider text-stone-400">
              <span>Curation Assistant [AI Agent]</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> State: Online</span>
            </div>
            <div className="space-y-3.5 text-[11px] leading-relaxed">
              <div className="border border-stone-200 bg-[#FBF9F4] p-4 font-serif italic text-stone-800">Good day. I can check available openings, verify custom rates, or explore package options for you.</div>
              <div className="ml-auto max-w-[80%] bg-amber-800 p-4 text-[#FBF9F4]">What is included in the signature wedding tier?</div>
            </div>
            <button onClick={() => setChatOpen(true)} className="mt-4 flex w-full items-center justify-center gap-2 bg-[#1C1816] py-3 font-mono text-[9px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-amber-900">
              Start a conversation <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ---------------- Reviews ---------------- */}
      {sections.reviews.active && testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-6 py-16">
          <div className="mb-10">
            <span className="block font-mono text-xs font-bold uppercase tracking-widest text-amber-800">// 05.CLIENT_LEDGER</span>
            <h2 className="mt-1 text-3xl font-extralight tracking-tight text-[#1C1816]">{sections.reviews.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }} className="flex flex-col justify-between border border-stone-200 bg-white p-8 shadow-sm">
                <p className="font-serif italic leading-relaxed text-stone-700">&ldquo;{stripHtml(t.text)}&rdquo;</p>
                <div className="mt-6 border-t border-stone-100 pt-4 font-mono text-[9px] font-bold uppercase tracking-widest text-stone-500">
                  {t.client}{t.city ? ` — ${t.city}` : ""}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- CTA ---------------- */}
      {cta.active && (
        <section className="bg-[#FAF6EE] px-6 py-16">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="mx-auto max-w-3xl border border-stone-200 bg-white p-10 text-center shadow-sm md:p-14">
            <span className="block font-mono text-xs font-bold uppercase tracking-widest text-amber-800">// 06.RESERVE</span>
            <h2 className="mt-3 text-3xl font-extralight tracking-tight text-[#1C1816]">{cta.title}</h2>
            {cta.subtitle && <p className="mx-auto mt-3 max-w-md text-sm font-light italic text-stone-500">{cta.subtitle}</p>}
            <div className="mt-8 flex flex-wrap justify-center gap-4 font-mono">
              <Link href="/booking" className="flex items-center gap-2 bg-[#1C1816] px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-amber-900">
                <Calendar className="h-4 w-4" /> Start booking
              </Link>
              <button onClick={() => setChatOpen(true)} className="border border-stone-300 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-[#1C1816] transition-colors hover:border-amber-800 hover:text-amber-800">
                Ask the AI
              </button>
            </div>
          </motion.div>
        </section>
      )}
    </main>
  );
}
