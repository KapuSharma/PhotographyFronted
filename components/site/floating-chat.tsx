"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bot, Send, X, Calendar, Phone, RotateCcw, ClipboardList, Images } from "lucide-react";

import { useSiteStore } from "@/store/use-site-store";

/* Floating "Ask AI" assistant — Groq-backed and grounded in the studio's own
   content. Features: studio greeting/name, rich-text replies, streamed typing,
   quick actions (book / packages / call / WhatsApp), lead capture, and retry. */

const API = process.env.NEXT_PUBLIC_API_URL;

const DEFAULT_GREETING =
  "Hi! 👋 I'm the studio assistant. Ask me about our services, packages, pricing, delivery timelines or how to book — happy to help!";
const INITIAL_SUGGESTIONS = ["What packages do you offer?", "Are you free in December?", "How fast is delivery?"];

type ChatMessage = { id: number; role: "user" | "assistant"; content: string };

// ---- tenant resolution (server domain wins; then URL / preview env / host) ----
function resolveDomain(serverDomain?: string | null): string {
  if (serverDomain) return serverDomain;
  if (typeof window !== "undefined") {
    const q = new URLSearchParams(window.location.search).get("domain");
    if (q) return q.trim();
  }
  if (process.env.NEXT_PUBLIC_PREVIEW_DOMAIN) return process.env.NEXT_PUBLIC_PREVIEW_DOMAIN;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host && host !== "localhost" && host !== "127.0.0.1") return host;
  }
  return "";
}

// ---- minimal, XSS-safe rich-text: **bold**, [label](url), bare urls, bullets ----
function renderInline(text: string, key: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))|((?:https?:\/\/|www\.)[^\s)]+)/g;
  let last = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      out.push(<strong key={`${key}-b${i}`}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("[")) {
      const lm = /\[([^\]]+)\]\(([^)]+)\)/.exec(tok);
      if (lm) out.push(<a key={`${key}-l${i}`} href={lm[2]} target="_blank" rel="noreferrer" className="font-semibold text-brand-600 underline">{lm[1]}</a>);
    } else {
      const href = tok.startsWith("http") ? tok : `https://${tok}`;
      out.push(<a key={`${key}-u${i}`} href={href} target="_blank" rel="noreferrer" className="font-semibold text-brand-600 underline">{tok}</a>);
    }
    last = m.index + tok.length;
    i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function RichText({ text }: { text: string }) {
  const lines = text.split(/\n/);
  const blocks: React.ReactNode[] = [];
  let list: React.ReactNode[] = [];
  const flush = (k: string) => { if (list.length) { blocks.push(<ul key={`ul${k}`} className="list-disc space-y-0.5 pl-4">{list}</ul>); list = []; } };
  lines.forEach((line, idx) => {
    const t = line.trim();
    const b = /^[-*•]\s+(.*)/.exec(t);
    if (b) { list.push(<li key={`li${idx}`}>{renderInline(b[1], `li${idx}`)}</li>); }
    else { flush(String(idx)); if (t) blocks.push(<p key={`p${idx}`}>{renderInline(t, `p${idx}`)}</p>); }
  });
  flush("end");
  return <div className="space-y-1.5">{blocks}</div>;
}

// Streamed reveal of the latest assistant message.
function Typewriter({ text, onDone, onTick }: { text: string; onDone: () => void; onTick: () => void }) {
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (n >= text.length) { if (!done.current) { done.current = true; onDone(); } return; }
    const step = Math.max(2, Math.round(text.length / 90));
    const id = setTimeout(() => { setN((v) => Math.min(text.length, v + step)); onTick(); }, 16);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, text]);
  return <RichText text={text.slice(0, n)} />;
}

export function FloatingChat({
  domain,
  assistantName,
  greeting,
  phone,
}: {
  domain?: string | null;
  assistantName?: string;
  greeting?: string;
  phone?: string;
}) {
  const chatOpen = useSiteStore((s) => s.chatOpen);
  const setChatOpen = useSiteStore((s) => s.setChatOpen);

  const title = (assistantName || "").trim() || "Studio Assistant";
  const greet = (greeting || "").trim() || DEFAULT_GREETING;

  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 0, role: "assistant", content: greet }]);
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingId, setTypingId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // lead capture
  const [leadOpen, setLeadOpen] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [leadSending, setLeadSending] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);
  const pendingSug = useRef<string[]>([]);

  const scrollToBottom = () => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages, loading, leadOpen]);
  useEffect(() => { if (chatOpen) setTimeout(() => inputRef.current?.focus(), 50); }, [chatOpen]);
  // Close on Escape
  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setChatOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chatOpen, setChatOpen]);

  async function runAssistant(history: ChatMessage[]) {
    setLoading(true);
    setErrorMsg(null);
    setSuggestions([]);
    try {
      const tenant = resolveDomain(domain);
      if (!tenant) throw new Error("Couldn't identify the studio — please reload and try again.");
      const res = await fetch(`${API}/public/ask-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: tenant, messages: history.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || `Request failed (${res.status}).`);
      const id = idRef.current++;
      pendingSug.current = Array.isArray(data.suggestions) ? data.suggestions.slice(0, 3) : [];
      setMessages((prev) => [...prev, { id, role: "assistant", content: data.reply || "Sorry, could you rephrase that?" }]);
      setTypingId(id);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Couldn't reach the assistant.");
    } finally {
      setLoading(false);
    }
  }

  function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next = [...messages, { id: idRef.current++, role: "user" as const, content }];
    setMessages(next);
    setInput("");
    runAssistant(next);
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!lead.name.trim() || !lead.email.trim() || leadSending) return;
    setLeadSending(true);
    setLeadError(null);
    try {
      const tenant = resolveDomain(domain);
      if (!tenant) throw new Error("Couldn't identify the studio.");
      const res = await fetch(`${API}/public/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: tenant,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          message: "Requested a callback via the AI assistant.",
          source: "AI Assistant",
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || "Couldn't submit. Please try again.");
      const name = lead.name.trim().split(" ")[0];
      setLeadOpen(false);
      setLead({ name: "", email: "", phone: "" });
      setMessages((prev) => [...prev, { id: idRef.current++, role: "assistant", content: `Thanks ${name}! 📞 The studio has your details and will reach out shortly.` }]);
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLeadSending(false);
    }
  }

  const waDigits = (phone || "").replace(/[^0-9]/g, "");

  if (!chatOpen) {
    return (
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition hover:brightness-110"
      >
        <Bot width={18} height={18} />
        Ask AI
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-[min(72vh,580px)] w-[calc(100vw-32px)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600/10 text-brand-600">
            <Bot width={18} height={18} />
          </span>
          <div className="leading-tight">
            <div className="text-sm">{title}</div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
            </div>
          </div>
        </div>
        <button onClick={() => setChatOpen(false)} className="text-muted-foreground transition hover:text-foreground" aria-label="Close chat">
          <X width={18} height={18} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        {messages.map((m) =>
          m.role === "assistant" ? (
            <div key={m.id} className="max-w-[90%] rounded-2xl rounded-tl-sm bg-muted p-3 text-foreground">
              {m.id === typingId ? (
                <Typewriter
                  text={m.content}
                  onTick={scrollToBottom}
                  onDone={() => { setSuggestions(pendingSug.current); setTypingId(null); }}
                />
              ) : (
                <RichText text={m.content} />
              )}
            </div>
          ) : (
            <div key={m.id} className="ml-auto max-w-[90%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-brand-600 p-3 text-white">
              {m.content}
            </div>
          )
        )}

        {loading && (
          <div className="flex max-w-[90%] items-center gap-1.5 rounded-2xl rounded-tl-sm bg-muted px-4 py-3.5" aria-label="Assistant is typing">
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
          </div>
        )}

        {errorMsg && !loading && (
          <div className="rounded-2xl rounded-tl-sm border border-red-200 bg-red-50 p-3 text-red-700">
            <p>{errorMsg}</p>
            <button onClick={() => runAssistant(messages)} className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-red-700 underline">
              <RotateCcw width={13} height={13} /> Try again
            </button>
          </div>
        )}
      </div>

      {/* Suggestion chips */}
      {suggestions.length > 0 && !loading && !leadOpen && (
        <div className="flex flex-wrap gap-2 px-4 pb-1">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => send(s)}
              className="rounded-full border border-brand-600/30 bg-brand-600/5 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-600/10"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Lead capture form */}
      {leadOpen ? (
        <form onSubmit={submitLead} className="space-y-2 border-t border-border p-3">
          <p className="text-xs font-bold text-foreground">Get a callback — leave your details</p>
          {leadError && <p className="text-xs font-medium text-red-600">{leadError}</p>}
          <input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Your name *" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-brand-400" />
          <input type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} placeholder="Email *" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-brand-400" />
          <input value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} placeholder="Phone" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-brand-400" />
          <div className="flex gap-2">
            <button type="submit" disabled={leadSending} className="flex-1 rounded-lg bg-brand-600 py-2 text-xs font-bold text-white disabled:opacity-50">{leadSending ? "Sending…" : "Send"}</button>
            <button type="button" onClick={() => setLeadOpen(false)} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-muted-foreground">Cancel</button>
          </div>
        </form>
      ) : (
        <>
          {/* Quick actions */}
          <div className="flex flex-nowrap gap-1.5 overflow-x-auto border-t border-border px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Link href="/booking" className="flex shrink-0 items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-[11px] font-semibold text-foreground transition hover:bg-brand-50 hover:text-brand-700"><Calendar width={13} height={13} /> Book</Link>
            <Link href="/packages" className="flex shrink-0 items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-[11px] font-semibold text-foreground transition hover:bg-brand-50 hover:text-brand-700"><Images width={13} height={13} /> Packages</Link>
            <button onClick={() => { setLeadError(null); setLeadOpen(true); }} className="flex shrink-0 items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-[11px] font-semibold text-foreground transition hover:bg-brand-50 hover:text-brand-700"><ClipboardList width={13} height={13} /> Callback</button>
            {waDigits && <a href={`tel:${phone}`} className="flex shrink-0 items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-[11px] font-semibold text-foreground transition hover:bg-brand-50 hover:text-brand-700"><Phone width={13} height={13} /> Call</a>}
            {waDigits && <a href={`https://wa.me/${waDigits}`} target="_blank" rel="noreferrer" className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 transition hover:bg-emerald-100">WhatsApp</a>}
          </div>

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-border p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              aria-label="Type your message"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
            <button type="submit" disabled={!input.trim() || loading} aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition hover:brightness-110 disabled:opacity-40">
              <Send width={16} height={16} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
