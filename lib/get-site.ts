import { headers } from "next/headers";

import { PHOTOS, type Photo } from "@/lib/data";
import { getSiteContent } from "@/lib/site-content";
import { DEFAULT_TEMPLATE, TEMPLATES } from "@/templates/registry";
import type { SiteContent } from "@/templates/types";

/* =====================================================================
   Server-side site resolver.

   Decides which tenant this request is for (by domain), fetches their
   template + content from the backend, and merges it over the mock data
   so anything the backend doesn't provide still renders.

   Falls back to mock content whenever there is no domain / no backend /
   the request fails — so the site always renders.
   ===================================================================== */

export type ResolvedSite = {
  template: string;
  content: SiteContent;
  accentColor: string | null;
  logoUrl: string | null;
  domain: string | null;
  source: "backend" | "mock";
  assistant: { name: string; greeting: string };
};

const API = process.env.NEXT_PUBLIC_API_URL; // e.g. http://localhost:5000/api
// Optional dev override so you can test a real tenant from localhost.
const PREVIEW_DOMAIN = process.env.NEXT_PUBLIC_PREVIEW_DOMAIN;

async function resolveDomain(searchDomain?: string): Promise<string | null> {
  if (searchDomain) return searchDomain;
  if (PREVIEW_DOMAIN) return PREVIEW_DOMAIN;

  const h = await headers();
  // Set by middleware from ?domain= or the real host (works in layouts too).
  const fromMiddleware = h.get("x-tenant-domain");
  if (fromMiddleware) return fromMiddleware;

  const hostname = (h.get("host") || "").split(":")[0];
  // Local hosts have no tenant — use mock content.
  if (!hostname || hostname === "localhost" || hostname === "127.0.0.1") return null;
  return hostname;
}

// Guard against unusable seed values (black/white/empty) so accent theming
// never makes the site look broken.
function isUsableColor(c?: string | null): c is string {
  if (!c) return false;
  const v = c.trim().toLowerCase();
  return v !== "" && v !== "#000000" && v !== "#000" && v !== "#ffffff" && v !== "#fff";
}

export async function getSite(opts?: { domain?: string }): Promise<ResolvedSite> {
  const mock = getSiteContent();
  const domain = await resolveDomain(opts?.domain);

  if (!API || !domain) {
    return { template: DEFAULT_TEMPLATE, content: mock, accentColor: null, logoUrl: null, domain: null, source: "mock", assistant: { name: "", greeting: "" } };
  }

  try {
    // Dev: always fetch fresh so dashboard changes show immediately.
    // Prod: cache briefly (public content changes rarely).
    const cacheOpts: RequestInit =
      process.env.NODE_ENV === "production"
        ? { next: { revalidate: 60 } }
        : { cache: "no-store" };
    const res = await fetch(`${API}/public/site?domain=${encodeURIComponent(domain)}`, cacheOpts);
    if (!res.ok) throw new Error(`backend ${res.status}`);
    const data = await res.json();

    const template =
      data.template && data.template in TEMPLATES ? (data.template as string) : DEFAULT_TEMPLATE;

    // Backend CMS provides hero JSON + the Service table; merge over mock.
    const heroData = (data.siteContent?.hero ?? {}) as Record<string, unknown>;
    const strArr = (v: unknown, fallback: string[]) =>
      Array.isArray(v) && v.length ? (v as string[]) : fallback;
    const hero = {
      active: heroData.active !== false,
      badges: strArr(heroData.badges, mock.hero.badges),
      title: (heroData.title as string) || mock.hero.title,
      subtitle: (heroData.subtitle as string) || mock.hero.subtitle,
      primaryLabel: (heroData.primaryLabel as string) || mock.hero.primaryLabel,
      primaryHref: (heroData.primaryHref as string) || mock.hero.primaryHref,
      secondaryEnabled: heroData.secondaryEnabled !== false,
      secondaryLabel: (heroData.secondaryLabel as string) || mock.hero.secondaryLabel,
      images: strArr(heroData.images, mock.hero.images),
      marqueeEnabled: heroData.marqueeEnabled !== false,
      marqueeImages: strArr(heroData.marqueeImages, mock.hero.marqueeImages),
    };
    const dbServices = Array.isArray(data.services) ? data.services : [];
    const services = dbServices.length
      ? dbServices.map((s: Record<string, unknown>, i: number) => {
          const imgs = Array.isArray(s.images) ? (s.images as string[]).filter(Boolean) : [];
          return {
            id: (s.id as string) || `svc-${i}`,
            name: (s.name as string) || "Service",
            from:
              (s.price as string) ||
              (s.startingPrice ? `₹${s.startingPrice}` : ""),
            desc: (s.description as string) || "",
            img: i % PHOTOS.length,
            photo: imgs[0] ? ({ id: `s${i}`, title: (s.name as string) || "", category: "", src: imgs[0] } as Photo) : PHOTOS[i % PHOTOS.length],
            content: (s.content as string) || "",
            images: imgs,
          };
        })
      : mock.services;

    const dbPackages = Array.isArray(data.packages) ? data.packages : [];
    const packages = dbPackages.length
      ? dbPackages.map((p: Record<string, unknown>, i: number) => ({
          id: (p.id as string) || `pkg-${i}`,
          name: (p.name as string) || "Package",
          price: (p.price as string) || "",
          duration: (p.duration as string) || "",
          bestFor: (p.bestFor as string) || "",
          popular: Boolean(p.popular),
          includes: Array.isArray(p.includes) ? (p.includes as string[]) : [],
          content: (p.content as string) || "",
          images: Array.isArray(p.images) ? (p.images as string[]).filter(Boolean) : [],
        }))
      : mock.packages;

    const dbReviews = Array.isArray(data.testimonials) ? data.testimonials : [];
    const testimonials = dbReviews.length
      ? dbReviews.map((r: Record<string, unknown>) => ({
          client: (r.client as string) || "",
          city: (r.city as string) || "",
          rating: typeof r.rating === "number" ? (r.rating as number) : 5,
          text: (r.text as string) || "",
          avatar: (r.avatar as string) || "",
        }))
      : mock.testimonials;

    const dbGallery = Array.isArray(data.gallery) ? data.gallery : [];
    const portfolio = dbGallery.length
      ? dbGallery
          .filter((g: Record<string, unknown>) => g.url)
          .map((g: Record<string, unknown>, i: number) => ({
            id: `g-${i}`,
            title: (g.title as string) || "",
            category: (g.category as string) || "",
            src: g.url as string,
          }))
      : mock.portfolio;

    const catData = (data.siteContent?.galleryCategories ?? {}) as Record<string, unknown>;
    const galleryCategories =
      Array.isArray(catData.list) && catData.list.length
        ? (catData.list as string[])
        : mock.galleryCategories;

    const ctaData = (data.siteContent?.cta ?? {}) as Record<string, unknown>;
    const cta = {
      active: ctaData.active !== false,
      title: (ctaData.title as string) || mock.cta.title,
      subtitle: (ctaData.subtitle as string) || mock.cta.subtitle,
    };

    const secData = (data.siteContent?.sections ?? {}) as Record<string, Record<string, unknown>>;
    const mergeHead = (key: "services" | "portfolio" | "packages" | "reviews") => {
      const s = secData[key] || {};
      const m = mock.sections[key];
      return {
        active: s.active !== false,
        eyebrow: (s.eyebrow as string) ?? m.eyebrow,
        title: (s.title as string) || m.title,
        desc: (s.desc as string) ?? m.desc,
      };
    };
    const sections = {
      services: mergeHead("services"),
      portfolio: mergeHead("portfolio"),
      packages: mergeHead("packages"),
      reviews: mergeHead("reviews"),
    };

    const aboutData = (data.siteContent?.about ?? {}) as Record<string, unknown>;
    const intro = (aboutData.intro ?? {}) as Record<string, unknown>;
    const statsData = (aboutData.stats ?? {}) as Record<string, unknown>;
    // Support the old flat shape ({ title, tagline, body, facts }) as a fallback.
    const about = {
      intro: {
        active: intro.active !== false,
        title: (intro.title as string) || (aboutData.title as string) || mock.about.intro.title,
        tagline: (intro.tagline as string) || (aboutData.tagline as string) || mock.about.intro.tagline,
        body: (intro.body as string) || (aboutData.body as string) || mock.about.intro.body,
        image: (intro.image as string) || mock.about.intro.image,
      },
      stats: {
        active: statsData.active !== false,
        items:
          Array.isArray(statsData.items) && statsData.items.length
            ? (statsData.items as { label: string; value: string }[])
            : Array.isArray(aboutData.facts) && aboutData.facts.length
              ? (aboutData.facts as { label: string; value: string }[])
              : mock.about.stats.items,
      },
    };

    const dbBlog = Array.isArray(data.blogPosts) ? data.blogPosts : [];
    const blog = dbBlog.length
      ? dbBlog.map((b: Record<string, unknown>, i: number) => ({
          title: (b.title as string) || "",
          date: (b.date as string) || "",
          excerpt: (b.excerpt as string) || "",
          image: (b.imageUrl as string) || PHOTOS[i % PHOTOS.length].src,
        }))
      : mock.blog;

    const headerData = (data.siteContent?.header ?? {}) as Record<string, unknown>;
    const header = {
      tagline: (headerData.tagline as string) || mock.header.tagline,
      bookLabel: (headerData.bookLabel as string) || mock.header.bookLabel,
    };

    const footerData = (data.siteContent?.footer ?? {}) as Record<string, unknown>;
    const footerLinks = Array.isArray(footerData.links)
      ? (footerData.links as { label?: string; href?: string }[])
          .map((l) => ({ label: (l.label || "").trim(), href: (l.href || "").trim() }))
          .filter((l) => l.label && l.href)
      : mock.footer.links;
    const footerSocials = Array.isArray(footerData.socials)
      ? (footerData.socials as { label?: string; url?: string }[])
          .map((s) => ({ label: (s.label || "").trim(), url: (s.url || "").trim() }))
          .filter((s) => s.label && s.url)
      : mock.footer.socials;
    const footer = {
      description: (footerData.description as string) || mock.footer.description,
      brandTagline: (footerData.brandTagline as string) || mock.footer.brandTagline,
      linksTitle: (footerData.linksTitle as string) || mock.footer.linksTitle,
      links: footerLinks,
      contactTitle: (footerData.contactTitle as string) || mock.footer.contactTitle,
      showContact: footerData.showContact !== undefined ? Boolean(footerData.showContact) : mock.footer.showContact,
      socialTitle: (footerData.socialTitle as string) || mock.footer.socialTitle,
      socials: footerSocials,
      copyright: (footerData.copyright as string) || mock.footer.copyright,
    };

    const contactData = (data.siteContent?.contact ?? {}) as Record<string, unknown>;
    const contact = {
      title: (contactData.title as string) || mock.contact.title,
      tagline: (contactData.tagline as string) || mock.contact.tagline,
      phone: (contactData.phone as string) || mock.contact.phone,
      email: (contactData.email as string) || mock.contact.email,
      address: (contactData.address as string) || mock.contact.address,
      note: (contactData.note as string) || mock.contact.note,
    };

    const content: SiteContent = {
      ...mock,
      studioName: data.studioName || mock.studioName,
      hero,
      services,
      packages,
      testimonials,
      portfolio,
      galleryCategories,
      sections,
      cta,
      about,
      contact,
      blog,
      header,
      footer,
    };

    const aiCfg = (data.aiConfig ?? {}) as Record<string, unknown>;
    return {
      template,
      content,
      accentColor: isUsableColor(data.accentColor) ? data.accentColor : null,
      logoUrl: (data.logoUrl as string) || null,
      domain,
      source: "backend",
      assistant: {
        name: (aiCfg.aiAssistantName as string) || "",
        greeting: (aiCfg.greetingMessage as string) || "",
      },
    };
  } catch {
    // Backend down or no such domain — render mock so the site never breaks.
    return { template: DEFAULT_TEMPLATE, content: mock, accentColor: null, logoUrl: null, domain: null, source: "mock", assistant: { name: "", greeting: "" } };
  }
}
