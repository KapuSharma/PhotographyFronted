"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, Leaf } from "lucide-react";

import { AskAiButton } from "@/components/site/ask-ai-button";
import { useSiteStore } from "@/store/use-site-store";
import { stripHtml } from "@/lib/utils";
import type { TemplateHomeProps } from "@/templates/types";

/* Alpenglow — "sunlit botanical" bento skin. Self-contained literal styling
   (off-white canvas, deep forest green, sage + amber, rounded cards) so it never
   affects the other templates. Fully content-driven from the shared SiteContent.
   Header, footer and the AI chat widget come from the shared site layout. */

const spring = { type: "spring" as const, stiffness: 120, damping: 18 };
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function AlpenglowHome({ content }: TemplateHomeProps) {
  const { hero, services, portfolio, packages, testimonials, sections, cta, studioName } = content;
  const setChatOpen = useSiteStore((s) => s.setChatOpen);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(portfolio.map((p) => p.category).filter(Boolean)))],
    [portfolio]
  );
  const [selected, setSelected] = useState("All");
  const shown = selected === "All" ? portfolio : portfolio.filter((p) => p.category === selected);

  return (
    <main className="bg-[#FBF9F6] font-sans text-stone-800 selection:bg-[#E8EDE5] selection:text-[#2E4A3E]">
      {/* Sunlit sub-banner */}
      <div className="flex items-center justify-center gap-2 border-b border-emerald-950/25 bg-[#233C31] px-6 py-3 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#E4EDE8]">
        <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-200" />
        <span className="truncate">Authentic portraits captured in sunlight &bull; 48-hour sneak peeks</span>
      </div>

      {/* ---------------- Hero ---------------- */}
      {hero.active && (
        <section id="hero" className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-6 py-12 md:py-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-6 text-left">
              {hero.badges.length > 0 && (
                <span className="inline-block rounded-full bg-[#E8EDE5] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2E4A3E]">
                  {hero.badges.join(" • ")}
                </span>
              )}
              <h1 className="font-serif text-4xl font-black leading-tight tracking-tight text-[#1C3027] md:text-6xl">
                {hero.title}
              </h1>
              {hero.subtitle && <p className="max-w-lg text-lg font-light leading-relaxed text-stone-600">{hero.subtitle}</p>}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href={hero.primaryHref || "/booking"} className="rounded-2xl bg-[#233C31] px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-[#233C31]/10 transition-all hover:bg-[#1c3027]">
                  {hero.primaryLabel || "Inquire for availability"}
                </Link>
                {hero.secondaryEnabled && (
                  <button onClick={() => setChatOpen(true)} className="rounded-2xl border border-[#233C31]/25 px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-[#233C31] transition-all hover:bg-[#E8EDE5]">
                    {hero.secondaryLabel || "Ask the assistant"}
                  </button>
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[hero.images[0], hero.images[1] || hero.images[0]].map((src, i) =>
                src ? (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...spring, delay: 0.1 + i * 0.1 }} className={`rounded-3xl border border-stone-200/85 bg-white p-2 shadow-md ${i === 1 ? "mt-6" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="aspect-[4/5] w-full rounded-2xl object-cover" />
                  </motion.div>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Services (bento tiers) ---------------- */}
      {sections.services.active && (
        <section id="services" className="border-b border-stone-200/60 bg-[#F4F6F3]/50 px-6 py-16">
          <div className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px]">
            <div className="mb-10">
              <span className="block font-sans text-xs font-bold uppercase tracking-widest text-[#2E4A3E]">// {sections.services.eyebrow || "Tiered offerings"}</span>
              <h2 className="mt-1 font-serif text-3xl font-black tracking-tight text-[#1C3027]">{sections.services.title}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((s, idx) => {
                const img = s.images?.[0] || s.photo?.src;
                return (
                <motion.div key={s.id} {...fadeUp} transition={{ ...spring, delay: idx * 0.08 }} whileHover={{ y: -4 }} className="group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
                  {img && (
                    <div className="aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={s.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div className="space-y-2.5">
                      {s.from && <span className="inline-block rounded-full bg-[#E8EDE5] px-3 py-0.5 text-xs font-bold text-[#2E4A3E]">{s.from}</span>}
                      <h3 className="font-serif text-xl font-bold text-[#1C3027]">{s.name}</h3>
                      {s.desc && <p className="text-xs font-semibold leading-6 text-stone-500">{s.desc}</p>}
                    </div>
                    <div className="mt-4 border-t border-stone-100 pt-4">
                      <Link href={`/services/${s.id}`} className="flex items-center gap-1 text-xs font-bold text-[#233C31] hover:underline">
                        Explore this tier <span className="text-[10px]">→</span>
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

      {/* ---------------- Bento gallery + AI chat ---------------- */}
      <section id="concierge" className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Gallery (filterable) */}
          {sections.portfolio.active && (
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8 lg:col-span-7">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-serif text-xl font-bold text-[#1C3027]">{sections.portfolio.title || "Plate Archive"}</h3>
                {categories.length > 1 && (
                  <div className="flex flex-wrap gap-1.5 text-[9px] font-extrabold uppercase tracking-widest">
                    {categories.slice(0, 5).map((cat) => (
                      <button key={cat} onClick={() => setSelected(cat)} className={`rounded-xl px-3 py-1.5 transition-colors ${selected === cat ? "bg-[#233C31] text-white" : "bg-[#F4F6F3] text-stone-500 hover:bg-stone-100"}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <motion.div layout className="grid grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {shown.slice(0, 4).map((p, i) => (
                    <motion.div layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={spring} key={p.src + i} className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-[#FAF9F6] p-1">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-100 shadow-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.src} alt={p.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-2 py-3 text-left">
                        {p.category && <span className="block text-[9px] font-bold uppercase tracking-widest text-stone-400">{p.category}</span>}
                        <span className="mt-0.5 block truncate font-serif text-xs font-black tracking-tight text-stone-700">{p.title}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              <Link href="/gallery" className="mt-5 inline-block text-xs font-bold text-[#233C31] hover:underline">View full gallery →</Link>
            </div>
          )}

          {/* AI assistant card (opens the real chat) */}
          <div className="flex flex-col justify-between rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8 lg:col-span-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-stone-200/50 bg-[#F4F6F3] p-3">
                <span className="text-[10px] font-bold uppercase text-[#2E4A3E]">Aria Virtual Assistant</span>
                <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active</span>
              </div>
              <div className="space-y-3 text-xs leading-normal">
                <div className="max-w-[85%] rounded-2xl border border-stone-100 bg-[#F4F6F3] p-3.5 text-stone-700">Hey there! 🌸 Planning a family, maternity or couples shoot? I can help you check open dates!</div>
                <div className="ml-auto max-w-[85%] rounded-2xl bg-[#233C31] p-3.5 text-white">What does the signature package include?</div>
              </div>
            </div>
            <button onClick={() => setChatOpen(true)} className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#233C31] py-3.5 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#1C3027]">
              Chat with us <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- Packages ---------------- */}
      {sections.packages.active && packages.length > 0 && (
        <section className="border-y border-stone-200/60 bg-[#F4F6F3]/50 px-6 py-16">
          <div className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px]">
            <div className="mb-10">
              <span className="block font-sans text-xs font-bold uppercase tracking-widest text-[#2E4A3E]">// {sections.packages.eyebrow || "Packages"}</span>
              <h2 className="mt-1 font-serif text-3xl font-black tracking-tight text-[#1C3027]">{sections.packages.title}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((p, idx) => (
                <motion.div key={p.id} {...fadeUp} transition={{ ...spring, delay: idx * 0.08 }} className={`flex flex-col rounded-[2rem] border bg-white p-8 shadow-sm ${p.popular ? "border-[#233C31] ring-1 ring-[#233C31]/20" : "border-stone-200"}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-[#1C3027]">{p.name}</h3>
                    {p.popular && <span className="flex items-center gap-1 rounded-full bg-[#E8EDE5] px-2.5 py-1 text-[9px] font-bold uppercase text-[#2E4A3E]"><Leaf className="h-3 w-3" /> Popular</span>}
                  </div>
                  {p.price && <p className="mt-3 text-2xl font-black text-[#233C31]">{p.price}</p>}
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-stone-400">{[p.duration, p.bestFor].filter(Boolean).join(" • ")}</div>
                  {Array.isArray(p.includes) && p.includes.length > 0 && (
                    <ul className="mt-6 space-y-2.5 border-t border-stone-100 pt-6 text-xs font-semibold text-stone-600">
                      {p.includes.map((inc, i) => (
                        <li key={i} className="flex gap-2"><Leaf className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#233C31]" />{inc}</li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto pt-8">
                    <Link href="/booking" className="block rounded-xl bg-[#233C31] py-3.5 text-center text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#1C3027]">Book this tier</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Reviews ---------------- */}
      {sections.reviews.active && testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-6 py-16">
          <div className="mb-10">
            <span className="block font-sans text-xs font-bold uppercase tracking-widest text-[#2E4A3E]">// {sections.reviews.eyebrow || "Loved by clients"}</span>
            <h2 className="mt-1 font-serif text-3xl font-black tracking-tight text-[#1C3027]">{sections.reviews.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ ...spring, delay: i * 0.08 }} className="flex flex-col justify-between rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
                <p className="leading-relaxed text-stone-600">&ldquo;{stripHtml(t.text)}&rdquo;</p>
                <div className="mt-6 border-t border-stone-100 pt-4 text-xs font-bold uppercase tracking-widest text-[#2E4A3E]">
                  {t.client}{t.city ? ` — ${t.city}` : ""}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- CTA ---------------- */}
      {cta.active && (
        <section className="bg-[#F4F6F3]/50 px-6 py-16">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mx-auto max-w-2xl rounded-[2.5rem] border border-stone-200 bg-white p-8 text-center shadow-sm md:p-14">
            <h2 className="font-serif text-3xl font-black text-[#1C3027]">{cta.title}</h2>
            {cta.subtitle && <p className="mx-auto mt-3 max-w-md text-sm text-stone-500">{cta.subtitle}</p>}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/booking" className="rounded-2xl bg-[#233C31] px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1c3027]">Start booking</Link>
              <AskAiButton label="Ask AI" icon="bot" className="rounded-2xl border border-[#233C31]/25 px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-[#233C31] hover:bg-[#E8EDE5]" />
            </div>
          </motion.div>
        </section>
      )}
    </main>
  );
}
