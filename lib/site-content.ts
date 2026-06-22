import { PHOTOS, SERVICES, PACKAGES, TESTIMONIALS, GALLERY_CATEGORIES, BLOG } from "@/lib/data";
import type { SiteContent } from "@/templates/types";

/* =====================================================================
   The "content box".

   Today it is assembled from the local mock data (lib/data.ts). Later,
   this is the ONE function to swap so it returns content fetched from
   the backend (SiteContent JSON, by domain) — templates won't change.
   ===================================================================== */

const HERO_IMGS = [0, 2, 1, 6];
const PORTFOLIO = [0, 2, 3, 4, 6, 7];

export function getSiteContent(): SiteContent {
  return {
    studioName: "Aria Studio",
    hero: {
      active: true,
      badges: ["Verified studio", "4.9 · 186 clients", "Kolkata · Destination"],
      title: "Photography that feels like the moment, not just a photo.",
      subtitle:
        "Wedding, pre-wedding, fashion, maternity and brand photography — with private galleries, guided booking, and an AI assistant that answers instantly.",
      primaryLabel: "Check availability",
      primaryHref: "/booking",
      secondaryEnabled: true,
      secondaryLabel: "Ask the AI assistant",
      images: HERO_IMGS.map((i) => PHOTOS[i].src),
      marqueeEnabled: true,
      marqueeImages: [...PHOTOS, ...PHOTOS].map((p) => p.src),
    },
    services: SERVICES.slice(0, 6).map((s, i) => ({
      ...s,
      id: `svc-${i}`,
      photo: PHOTOS[s.img],
      content: `${s.desc} Get in touch to plan your ${s.name.toLowerCase()} shoot — we'll guide you through the whole process from booking to delivery.`,
      images: [PHOTOS[s.img].src, PHOTOS[(s.img + 1) % PHOTOS.length].src, PHOTOS[(s.img + 2) % PHOTOS.length].src],
    })),
    portfolio: PORTFOLIO.map((i) => PHOTOS[i]),
    galleryCategories: GALLERY_CATEGORIES.filter((c) => c !== "All"),
    packages: PACKAGES.map((p, i) => ({
      ...p,
      content: `${p.bestFor}. The ${p.name} package (${p.duration}) includes everything you need — get in touch to tailor it to your day.`,
      images: [PHOTOS[i % PHOTOS.length].src, PHOTOS[(i + 2) % PHOTOS.length].src, PHOTOS[(i + 4) % PHOTOS.length].src],
    })),
    testimonials: TESTIMONIALS,
    sections: {
      services: { active: true, eyebrow: "What we shoot", title: "Featured services", desc: "Pick a service to see packages and start a booking." },
      portfolio: { active: true, eyebrow: "Selected work", title: "Portfolio highlights", desc: "" },
      packages: { active: true, eyebrow: "Packages", title: "Clear pricing, no surprises", desc: "" },
      reviews: { active: true, eyebrow: "Reviews", title: "Loved by recent clients", desc: "" },
    },
    cta: {
      active: true,
      title: "Ready to lock your date?",
      subtitle:
        "Start a booking now, or ask the AI assistant anything about packages, availability and delivery.",
    },
    about: {
      intro: {
        active: true,
        title: "About Aria Studio",
        tagline: "A boutique studio focused on natural, editorial photography.",
        body: "Aria Studio is a small team of photographers based in Kolkata, shooting weddings, pre-weddings, fashion, maternity and brand work across India. We focus on calm, guided sessions and fast, private delivery. Every project gets a private online gallery and a clear timeline so you always know what happens next.",
        image: PHOTOS[5].src,
      },
      stats: {
        active: true,
        items: [
          { label: "Since", value: "2016" },
          { label: "Clients", value: "186+" },
          { label: "Cities", value: "20+" },
        ],
      },
    },
    contact: {
      title: "Contact",
      tagline: "Send an enquiry — it lands straight in the studio's CRM as a new lead.",
      phone: "+91 98300 00000",
      email: "hello@ariastudio.in",
      address: "Park Street, Kolkata",
      note: "Every enquiry creates a CRM lead automatically.",
    },
    blog: BLOG.map((b) => ({
      title: b.title,
      date: b.date,
      excerpt: b.excerpt,
      image: PHOTOS[b.img].src,
    })),
    header: { tagline: "Photography Studio", bookLabel: "Book now" },
    footer: {
      description:
        "Wedding, pre-wedding, fashion, maternity and brand photography — with private galleries, guided booking, and an AI assistant that answers instantly.",
      brandTagline: "Photography Studio",
      linksTitle: "Explore",
      links: [],
      contactTitle: "Contact",
      showContact: true,
      socialTitle: "Follow us",
      socials: [
        { label: "Instagram", url: "https://instagram.com" },
        { label: "Facebook", url: "https://facebook.com" },
      ],
      copyright: "",
    },
  };
}
