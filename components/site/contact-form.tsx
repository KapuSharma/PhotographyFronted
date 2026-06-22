"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const API = process.env.NEXT_PUBLIC_API_URL;

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(6, "Please enter a valid phone"),
  email: z.string().email("Please enter a valid email"),
  service: z.string().min(1),
  message: z.string().min(10, "Tell us a little more about your shoot"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm({ services, domain }: { services: string[]; domain: string | null }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: services[0] },
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    // No tenant domain (e.g. local preview) — accept gracefully without a backend call.
    if (!domain || !API) {
      setSent(true);
      reset();
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${API}/public/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, ...data }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Could not send your enquiry");
      }
      setSent(true);
      reset();
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Could not send your enquiry");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      {sent ? (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          <CheckCircle2 width={16} height={16} />
          Thanks! Your enquiry was received — we&apos;ll be in touch shortly.
        </div>
      ) : null}
      {submitError ? (
        <div className="mb-4 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
          {submitError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Your name" {...register("name")} />
          {errors.name ? (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.name.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+91 " {...register("phone")} />
          {errors.phone ? (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.phone.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@email.com" {...register("email")} />
          {errors.email ? (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.email.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="service">Service</Label>
          <Select id="service" {...register("service")}>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" rows={4} placeholder="Tell us about your shoot..." {...register("message")} />
          {errors.message ? (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.message.message}</p>
          ) : null}
        </div>
      </div>
      <Button type="submit" className="mt-4" disabled={sending}>
        {sending ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
