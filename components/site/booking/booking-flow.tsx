"use client";

import { useMemo, useState } from "react";
import { Check, CheckCircle2, ChevronLeft, ChevronRight, Clock, CreditCard, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatINR, parseINR } from "@/lib/currency";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/site/section-title";

type Svc = { id: string; name: string; from?: string; desc?: string; photo?: { src?: string } };
type Pkg = { id: string; name: string; price?: string; duration?: string; popular?: boolean; includes?: string[] };

const API = process.env.NEXT_PUBLIC_API_URL;
const STEPS = ["Service", "Package", "Date", "Details", "Confirm"];
const SLOTS = ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM"];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Booking window: earliest = today + LEAD_DAYS, latest = today + HORIZON_DAYS.
const LEAD_DAYS = 1;
const HORIZON_DAYS = 120;

const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const prettyDate = (iso: string) => {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

export function BookingFlow({ services, packages, domain }: { services: Svc[]; packages: Pkg[]; domain: string | null }) {
  const [step, setStep] = useState(0);
  const [serviceName, setServiceName] = useState("");
  const [pkgId, setPkgId] = useState(packages[1]?.id || packages[0]?.id || "");
  const [dateStr, setDateStr] = useState("");
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const minDate = useMemo(() => { const d = new Date(today); d.setDate(d.getDate() + LEAD_DAYS); return d; }, [today]);
  const maxDate = useMemo(() => { const d = new Date(today); d.setDate(d.getDate() + HORIZON_DAYS); return d; }, [today]);
  const [view, setView] = useState(() => ({ y: today.getFullYear(), m: today.getMonth() }));

  const currentPkg = packages.find((p) => p.id === pkgId) || packages[0];
  const pkgPrice = currentPkg?.price || "";
  const advance = pkgPrice ? formatINR(Math.round(parseINR(pkgPrice) * 0.2)) : "—";

  // ----- calendar maths -----
  const startOffset = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const viewIdx = view.y * 12 + view.m;
  const minIdx = today.getFullYear() * 12 + today.getMonth();
  const maxIdx = maxDate.getFullYear() * 12 + maxDate.getMonth();
  const canPrev = viewIdx > minIdx;
  const canNext = viewIdx < maxIdx;
  const shiftMonth = (delta: number) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };

  async function submit() {
    setSubmitting(true);
    setError("");
    try {
      if (!domain) throw new Error("Couldn't identify the studio — please reload the page and try again.");
      const res = await fetch(`${API}/public/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain,
          service: serviceName,
          packageName: currentPkg?.name,
          date: dateStr,
          slot,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          estimatedValue: pkgPrice ? parseINR(pkgPrice) : undefined,
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || "Couldn't submit your booking. Please try again.");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <SectionTitle
        eyebrow="Booking"
        title="Book without the back-and-forth"
        desc="Service first, then package, date, details — then pay an advance or request a soft hold."
      />

      {/* Stepper */}
      <div className="mb-6 flex items-center">
        {STEPS.map((label, i) => (
          <div key={label} className={cn("flex items-center", i < STEPS.length - 1 && "flex-1")}>
            <button
              onClick={() => i <= step && setStep(i)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition",
                i <= step ? "bg-brand-600 text-white" : "bg-muted text-muted-foreground"
              )}
              aria-label={`Step ${label}`}
            >
              {i < step ? <Check width={16} height={16} /> : i + 1}
            </button>
            {i < STEPS.length - 1 ? <div className={cn("mx-2 h-0.5 flex-1", i < step ? "bg-brand-500" : "bg-border")} /> : null}
          </div>
        ))}
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <div className="min-h-[420px] p-6">
            {/* Step 0 — Service */}
            {step === 0 ? (
              <>
                <h3 className="text-lg font-extrabold text-foreground">What are you booking?</h3>
                <p className="mt-1 text-sm text-muted-foreground">Choose a service to continue.</p>
                {services.length === 0 ? (
                  <p className="mt-6 text-sm text-muted-foreground">No services available yet. Please use the Contact page.</p>
                ) : (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setServiceName(s.name); setStep(1); }}
                        className={cn(
                          "overflow-hidden rounded-2xl border text-left transition hover:shadow-md",
                          serviceName === s.name ? "border-brand-400 ring-2 ring-brand-100" : "border-border"
                        )}
                      >
                        <div className="h-32 overflow-hidden bg-muted">
                          {s.photo?.src ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={s.photo.src} alt={s.name} className="h-full w-full object-cover" />
                          ) : null}
                        </div>
                        <div className="p-3">
                          <p className="font-bold text-foreground">{s.name}</p>
                          {s.from ? <p className="text-sm text-brand-600">from {s.from}</p> : null}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : null}

            {/* Step 1 — Package */}
            {step === 1 ? (
              <>
                <h3 className="text-lg font-extrabold text-foreground">Select a package</h3>
                {packages.length === 0 ? (
                  <p className="mt-6 text-sm text-muted-foreground">No packages set up yet — you can still continue.</p>
                ) : (
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {packages.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { setPkgId(p.id); setStep(2); }}
                        className={cn(
                          "rounded-2xl border p-5 text-left transition hover:shadow-md",
                          pkgId === p.id ? "border-brand-400 ring-2 ring-brand-100" : "border-border"
                        )}
                      >
                        {p.popular ? <Badge tone="teal">Most booked</Badge> : null}
                        {p.duration ? <p className="mt-2 text-sm text-muted-foreground">{p.duration}</p> : null}
                        <p className="mt-1 font-extrabold text-foreground">{p.name}</p>
                        {p.price ? <p className="mt-1 text-2xl font-extrabold text-brand-600">{p.price}</p> : null}
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-5">
                  <Button variant="ghost" onClick={() => setStep(2)}>Skip / continue</Button>
                </div>
              </>
            ) : null}

            {/* Step 2 — Date & time */}
            {step === 2 ? (
              <>
                <h3 className="text-lg font-extrabold text-foreground">Pick date &amp; time</h3>
                <p className="mt-1 text-sm text-muted-foreground">Available dates only. Soft holds last 24 hours.</p>
                <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_240px]">
                  <div className="rounded-2xl border border-border p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-bold text-foreground">{MONTHS[view.m]} {view.y}</p>
                      <div className="flex gap-1">
                        <button
                          onClick={() => canPrev && shiftMonth(-1)}
                          disabled={!canPrev}
                          aria-label="Previous month"
                          className="rounded-lg p-1 text-muted-foreground transition hover:bg-muted disabled:opacity-30"
                        >
                          <ChevronLeft width={18} height={18} />
                        </button>
                        <button
                          onClick={() => canNext && shiftMonth(1)}
                          disabled={!canNext}
                          aria-label="Next month"
                          className="rounded-lg p-1 text-muted-foreground transition hover:bg-muted disabled:opacity-30"
                        >
                          <ChevronRight width={18} height={18} />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-muted-foreground">
                      {WEEKDAYS.map((d) => <span key={d}>{d}</span>)}
                    </div>
                    <div className="mt-2 grid grid-cols-7 gap-1.5">
                      {Array.from({ length: startOffset }, (_, i) => <span key={`b${i}`} />)}
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                        const cell = new Date(view.y, view.m, day); cell.setHours(0, 0, 0, 0);
                        const iso = ymd(cell);
                        const off = cell < minDate || cell > maxDate;
                        const sel = dateStr === iso;
                        return (
                          <button
                            key={day}
                            disabled={off}
                            onClick={() => setDateStr(iso)}
                            className={cn(
                              "aspect-square rounded-lg text-sm font-semibold transition",
                              sel ? "bg-brand-600 text-white"
                                : off ? "cursor-not-allowed text-muted-foreground/40"
                                : "text-foreground hover:bg-muted"
                            )}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-foreground">Available slots</p>
                    {!dateStr ? (
                      <p className="text-sm text-muted-foreground">Select a date to see times.</p>
                    ) : (
                      SLOTS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSlot(s)}
                          className={cn(
                            "w-full rounded-xl border px-4 py-2.5 text-left text-sm font-semibold transition",
                            slot === s ? "border-brand-400 bg-brand-50 text-brand-700" : "border-border text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {s}
                        </button>
                      ))
                    )}
                    <Button className="mt-2 w-full" disabled={!dateStr || !slot} onClick={() => setStep(3)}>Continue</Button>
                  </div>
                </div>
              </>
            ) : null}

            {/* Step 3 — Details */}
            {step === 3 ? (
              <>
                <h3 className="text-lg font-extrabold text-foreground">Your details</h3>
                <p className="mt-1 text-sm text-muted-foreground">So we can confirm your booking.</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Full name *</span>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Suhana Sen"
                      className="mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Email *</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      className="mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Phone</span>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 …"
                      className="mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Anything we should know?</span>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Location, theme, references…"
                      className="mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                </div>
                <div className="mt-5 flex gap-3">
                  <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                  <Button disabled={!form.name.trim() || !form.email.trim()} onClick={() => setStep(4)}>Continue</Button>
                </div>
              </>
            ) : null}

            {/* Step 4 — Confirm */}
            {step === 4 ? (
              <>
                <h3 className="text-lg font-extrabold text-foreground">Confirm request</h3>
                <div className="mt-5 divide-y divide-border rounded-2xl border border-border">
                  {([
                    ["Service", serviceName || "—"],
                    ["Package", currentPkg?.name || "—"],
                    ["Date", prettyDate(dateStr)],
                    ["Time", slot || "—"],
                    ["Name", form.name],
                    ["Estimated value", pkgPrice || "—"],
                    ["Advance (20%)", advance],
                  ] as [string, string][]).map(([k, v]) => (
                    <div key={k} className="flex justify-between px-4 py-3 text-sm">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-semibold text-foreground">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Button disabled={submitting} onClick={submit}>
                    <CreditCard width={16} height={16} />
                    {submitting ? "Processing…" : "Pay advance"}
                  </Button>
                  <Button variant="ghost" disabled={submitting} onClick={submit}>
                    <Clock width={16} height={16} />
                    24h soft hold
                  </Button>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Online advance payment is coming soon — for now this sends your request and the studio confirms within 24 hours.
                </p>
              </>
            ) : null}
          </div>
        </Card>

        {/* Live summary */}
        <Card>
          <div className="p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Live summary</p>
            <h3 className="mt-1 font-extrabold text-foreground">{serviceName || "Your booking"}</h3>
            <div className="mt-4 space-y-2 text-sm">
              {([
                ["Package", currentPkg?.name || "—"],
                ["Date", prettyDate(dateStr)],
                ["Time", slot || "—"],
                ["Price", pkgPrice || "—"],
              ] as [string, string][]).map(([k, v]) => (
                <div key={k} className="flex justify-between rounded-lg bg-muted px-3 py-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-semibold text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Thank-you message after submitting */}
      {done ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setDone(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-sm rounded-3xl bg-neutral-950 p-8 text-center text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDone(false)} aria-label="Close" className="absolute right-4 top-4 text-white/50 transition hover:text-white">
              <X width={20} height={20} />
            </button>
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2 width={34} height={34} className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">Thank you!</h3>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Your booking request for{" "}
              <span className="font-semibold text-white">{prettyDate(dateStr)} · {slot}</span>{" "}
              is in. We&apos;ve received it and the studio will confirm within 24 hours — see you at the shoot!
            </p>
            <button onClick={() => setDone(false)} className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-bold text-neutral-950 transition hover:bg-white/90">
              Done
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
