import { headers } from "next/headers";

import { PHOTOS, symbolFromCurrency, type Photo } from "@/lib/data";
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

    // Shared merge helpers.
    const asObj = (v: unknown) => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});
    const arrOr = <T,>(v: unknown, fallback: T[]): T[] => (Array.isArray(v) && v.length ? (v as T[]) : fallback);

    // Backend CMS provides hero JSON + the Service table; merge over mock.
    const heroData = (data.siteContent?.hero ?? {}) as Record<string, unknown>;
    const strArr = (v: unknown, fallback: string[]) =>
      Array.isArray(v) && v.length ? (v as string[]) : fallback;
    const hero = {
      active: heroData.active !== false,
      badges: strArr(heroData.badges, mock.hero.badges),
      title: (heroData.title as string) || mock.hero.title,
      accent: (heroData.accent as string) || mock.hero.accent,
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
            fromMax: (s.priceMax as string) || "",
            desc: (s.description as string) || "",
            img: i % PHOTOS.length,
            photo: imgs[0] ? ({ id: `s${i}`, title: (s.name as string) || "", category: (s.category as string) || "", src: imgs[0] } as Photo) : PHOTOS[i % PHOTOS.length],
            content: (s.content as string) || "",
            images: imgs,
            category: (s.category as string) || "",
            rating: (s.rating as string) || "",
            reviews: (s.reviews as string) || "",
            features: Array.isArray(s.features) ? (s.features as string[]).filter(Boolean) : [],
          };
        })
      : mock.services;

    const dbPackages = Array.isArray(data.packages) ? data.packages : [];
    const packages = dbPackages.length
      ? dbPackages.map((p: Record<string, unknown>, i: number) => ({
          id: (p.id as string) || `pkg-${i}`,
          name: (p.name as string) || "Package",
          price: (p.price as string) || "",
          priceMax: (p.priceMax as string) || "",
          duration: (p.duration as string) || "",
          bestFor: (p.bestFor as string) || "",
          popular: Boolean(p.popular),
          includes: Array.isArray(p.includes) ? (p.includes as string[]) : [],
          content: (p.content as string) || "",
          images: Array.isArray(p.images) ? (p.images as string[]).filter(Boolean) : [],
          badge: (p.badge as string) || "",
          category: (p.category as string) || "",
          description: (p.description as string) || "",
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
    const aJourney = asObj(aboutData.journey), aTeam = asObj(aboutData.team), aBts = asObj(aboutData.behindScenes), aWhy = asObj(aboutData.whyUs), aTest = asObj(aboutData.testimonials), aCta = asObj(aboutData.cta);
    const mAbout = mock.about;
    const about = {
      intro: {
        active: intro.active !== false,
        title: (intro.title as string) || (aboutData.title as string) || mAbout.intro.title,
        tagline: (intro.tagline as string) || (aboutData.tagline as string) || mAbout.intro.tagline,
        body: (intro.body as string) || (aboutData.body as string) || mAbout.intro.body,
        image: (intro.image as string) || mAbout.intro.image,
        eyebrow: (intro.eyebrow as string) || mAbout.intro.eyebrow,
        headlineTop: (intro.headlineTop as string) || mAbout.intro.headlineTop,
        headlineMain: (intro.headlineMain as string) || mAbout.intro.headlineMain,
        headlineAccent: (intro.headlineAccent as string) || mAbout.intro.headlineAccent,
        thumbs: arrOr(intro.thumbs, mAbout.intro.thumbs),
        features: arrOr(intro.features, mAbout.intro.features),
        primaryLabel: (intro.primaryLabel as string) || mAbout.intro.primaryLabel,
        primaryHref: (intro.primaryHref as string) || mAbout.intro.primaryHref,
        secondaryLabel: (intro.secondaryLabel as string) || mAbout.intro.secondaryLabel,
        secondaryHref: (intro.secondaryHref as string) || mAbout.intro.secondaryHref,
      },
      stats: {
        active: statsData.active !== false,
        items:
          Array.isArray(statsData.items) && statsData.items.length
            ? (statsData.items as { label: string; value: string }[])
            : Array.isArray(aboutData.facts) && aboutData.facts.length
              ? (aboutData.facts as { label: string; value: string }[])
              : mAbout.stats.items,
      },
      journey: {
        active: aJourney.active !== false,
        eyebrow: (aJourney.eyebrow as string) || mAbout.journey.eyebrow,
        title: (aJourney.title as string) || mAbout.journey.title,
        items: arrOr(aJourney.items, mAbout.journey.items),
      },
      team: {
        active: aTeam.active !== false,
        eyebrow: (aTeam.eyebrow as string) || mAbout.team.eyebrow,
        title: (aTeam.title as string) || mAbout.team.title,
        members: arrOr(aTeam.members, mAbout.team.members),
      },
      behindScenes: {
        active: aBts.active !== false,
        eyebrow: (aBts.eyebrow as string) || mAbout.behindScenes.eyebrow,
        title: (aBts.title as string) || mAbout.behindScenes.title,
        images: arrOr(aBts.images, mAbout.behindScenes.images),
      },
      whyUs: {
        active: aWhy.active !== false,
        eyebrow: (aWhy.eyebrow as string) || mAbout.whyUs.eyebrow,
        title: (aWhy.title as string) || mAbout.whyUs.title,
        items: arrOr(aWhy.items, mAbout.whyUs.items),
      },
      testimonials: {
        active: aTest.active !== false,
        eyebrow: (aTest.eyebrow as string) || mAbout.testimonials.eyebrow,
        title: (aTest.title as string) || mAbout.testimonials.title,
      },
      cta: {
        active: aCta.active !== false,
        heading: (aCta.heading as string) || mAbout.cta.heading,
        subtitle: (aCta.subtitle as string) || mAbout.cta.subtitle,
        primaryLabel: (aCta.primaryLabel as string) || mAbout.cta.primaryLabel,
        primaryHref: (aCta.primaryHref as string) || mAbout.cta.primaryHref,
        secondaryLabel: (aCta.secondaryLabel as string) || mAbout.cta.secondaryLabel,
        secondaryHref: (aCta.secondaryHref as string) || mAbout.cta.secondaryHref,
        bgImage: (aCta.bgImage as string) || mAbout.cta.bgImage,
      },
    };

    const dbBlog = Array.isArray(data.blogPosts) ? data.blogPosts : [];
    const blog = dbBlog.length
      ? dbBlog.map((b: Record<string, unknown>, i: number) => ({
          title: (b.title as string) || "",
          date: (b.date as string) || "",
          excerpt: (b.excerpt as string) || "",
          image: (b.imageUrl as string) || PHOTOS[i % PHOTOS.length].src,
          category: (b.category as string) || "",
          author: (b.author as string) || "",
          authorImg: (b.authorImg as string) || "",
          readTime: (b.readTime as string) || "",
          views: (b.views as string) || "",
          tags: Array.isArray(b.tags) ? (b.tags as string[]) : [],
          body: Array.isArray(b.body) ? (b.body as SiteContent["blog"][number]["body"]) : [],
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
      eyebrow: (contactData.eyebrow as string) || mock.contact.eyebrow,
      title: (contactData.title as string) || mock.contact.title,
      accent: (contactData.accent as string) || mock.contact.accent,
      tagline: (contactData.tagline as string) || mock.contact.tagline,
      phone: (contactData.phone as string) || mock.contact.phone,
      email: (contactData.email as string) || mock.contact.email,
      address: (contactData.address as string) || mock.contact.address,
      note: (contactData.note as string) || mock.contact.note,
      phoneSub: (contactData.phoneSub as string) || mock.contact.phoneSub,
      emailSub: (contactData.emailSub as string) || mock.contact.emailSub,
      addressSub: (contactData.addressSub as string) || mock.contact.addressSub,
      detailsHeading: (contactData.detailsHeading as string) || mock.contact.detailsHeading,
      why: Array.isArray(contactData.why) && contactData.why.length
        ? (contactData.why as { icon?: string; title?: string; sub?: string }[]).map((w) => ({ icon: w.icon || "camera", title: w.title || "", sub: w.sub || "" }))
        : mock.contact.why,
      form: { ...mock.contact.form, ...asObj(contactData.form) },
      map: { ...mock.contact.map, ...asObj(contactData.map) },
      cta: {
        active: asObj(contactData.cta).active !== false,
        heading: (asObj(contactData.cta).heading as string) || mock.contact.cta.heading,
        subtitle: (asObj(contactData.cta).subtitle as string) || mock.contact.cta.subtitle,
        buttonLabel: (asObj(contactData.cta).buttonLabel as string) || mock.contact.cta.buttonLabel,
        buttonHref: (asObj(contactData.cta).buttonHref as string) || mock.contact.cta.buttonHref,
      },
    };

    // ── Per-page content sections (merge backend blob over mock defaults) ──
    const gpD = asObj(data.siteContent?.galleryPage);
    const gpHero = asObj(gpD.hero), gpFeat = asObj(gpD.features), gpCta = asObj(gpD.cta);
    const galleryPage = {
      hero: {
        active: gpHero.active !== false,
        eyebrow: (gpHero.eyebrow as string) || mock.galleryPage.hero.eyebrow,
        title: (gpHero.title as string) || mock.galleryPage.hero.title,
        subtitle: (gpHero.subtitle as string) || mock.galleryPage.hero.subtitle,
        stats: arrOr(gpHero.stats, mock.galleryPage.hero.stats),
      },
      features: { active: gpFeat.active !== false, items: arrOr(gpFeat.items, mock.galleryPage.features.items) },
      cta: {
        active: gpCta.active !== false,
        title: (gpCta.title as string) || mock.galleryPage.cta.title,
        subtitle: (gpCta.subtitle as string) || mock.galleryPage.cta.subtitle,
        buttonLabel: (gpCta.buttonLabel as string) || mock.galleryPage.cta.buttonLabel,
        buttonHref: (gpCta.buttonHref as string) || mock.galleryPage.cta.buttonHref,
      },
    };

    const spD = asObj(data.siteContent?.servicesPage);
    const spHero = asObj(spD.hero), spFeat = asObj(spD.featured), spHelp = asObj(spD.help);
    const servicesPage = {
      hero: {
        active: spHero.active !== false,
        title: (spHero.title as string) || mock.servicesPage.hero.title,
        tagline: (spHero.tagline as string) || mock.servicesPage.hero.tagline,
        subtitle: (spHero.subtitle as string) || mock.servicesPage.hero.subtitle,
        stats: arrOr(spHero.stats, mock.servicesPage.hero.stats),
      },
      featured: {
        active: spFeat.active !== false, badge: (spFeat.badge as string) || mock.servicesPage.featured.badge, serviceId: (spFeat.serviceId as string) || "",
        buttonLabel: (spFeat.buttonLabel as string) || mock.servicesPage.featured.buttonLabel,
        buttonHref: (spFeat.buttonHref as string) || mock.servicesPage.featured.buttonHref,
      },
      help: { active: spHelp.active !== false, items: arrOr(spHelp.items, mock.servicesPage.help.items) },
      cardButton: { ...mock.servicesPage.cardButton, ...asObj(spD.cardButton) },
    };

    const rpD = asObj(data.siteContent?.reviewsPage);
    const rpHero = asObj(rpD.hero), rpSum = asObj(rpD.summary), rpVid = asObj(rpD.video), rpVM = asObj(rpD.viewMore), rpPhoto = asObj(rpD.photoReviews), rpOn = asObj(rpD.reviewOn), rpCta = asObj(rpD.cta);
    const mRP = mock.reviewsPage;
    const reviewsPage = {
      hero: {
        active: rpHero.active !== false,
        eyebrow: (rpHero.eyebrow as string) || mRP.hero.eyebrow,
        title: (rpHero.title as string) || mRP.hero.title,
        accent: (rpHero.accent as string) || mRP.hero.accent,
        subtitle: (rpHero.subtitle as string) || mRP.hero.subtitle,
        image: (rpHero.image as string) || mRP.hero.image,
      },
      summary: {
        active: rpSum.active !== false,
        rating: (rpSum.rating as string) || mRP.summary.rating,
        count: (rpSum.count as string) || mRP.summary.count,
        quote: (rpSum.quote as string) || mRP.summary.quote,
        quoteAuthor: (rpSum.quoteAuthor as string) || mRP.summary.quoteAuthor,
        breakdown: arrOr(rpSum.breakdown, mRP.summary.breakdown),
      },
      video: {
        active: rpVid.active !== false,
        thumbnail: (rpVid.thumbnail as string) || mRP.video.thumbnail,
        name: (rpVid.name as string) || mRP.video.name,
        role: (rpVid.role as string) || mRP.video.role,
        duration: (rpVid.duration as string) || mRP.video.duration,
        heading: (rpVid.heading as string) || mRP.video.heading,
        subtitle: (rpVid.subtitle as string) || mRP.video.subtitle,
        stats: arrOr(rpVid.stats, mRP.video.stats),
      },
      viewMore: { label: (rpVM.label as string) || mRP.viewMore.label, href: (rpVM.href as string) || mRP.viewMore.href },
      photoReviews: {
        active: rpPhoto.active !== false,
        heading: (rpPhoto.heading as string) || mRP.photoReviews.heading,
        subtitle: (rpPhoto.subtitle as string) || mRP.photoReviews.subtitle,
        viewAllLabel: (rpPhoto.viewAllLabel as string) || mRP.photoReviews.viewAllLabel,
        viewAllHref: (rpPhoto.viewAllHref as string) || mRP.photoReviews.viewAllHref,
        images: arrOr(rpPhoto.images, mRP.photoReviews.images),
      },
      reviewOn: {
        active: rpOn.active !== false,
        heading: (rpOn.heading as string) || mRP.reviewOn.heading,
        subtitle: (rpOn.subtitle as string) || mRP.reviewOn.subtitle,
        google: { ...mRP.reviewOn.google, ...asObj(rpOn.google) },
        facebook: { ...mRP.reviewOn.facebook, ...asObj(rpOn.facebook) },
      },
      cta: {
        active: rpCta.active !== false,
        heading: (rpCta.heading as string) || mRP.cta.heading,
        subtitle: (rpCta.subtitle as string) || mRP.cta.subtitle,
        buttonLabel: (rpCta.buttonLabel as string) || mRP.cta.buttonLabel,
        buttonHref: (rpCta.buttonHref as string) || mRP.cta.buttonHref,
      },
    };

    const blpD = asObj(data.siteContent?.blogPage);
    const blpHero = asObj(blpD.hero), blpNews = asObj(blpD.newsletter), blpPop = asObj(blpD.popular), blpSug = asObj(blpD.suggest);
    const blogPage = {
      hero: {
        active: blpHero.active !== false,
        eyebrow: (blpHero.eyebrow as string) || mock.blogPage.hero.eyebrow,
        title: (blpHero.title as string) || mock.blogPage.hero.title,
        accent: (blpHero.accent as string) || mock.blogPage.hero.accent,
        subtitle: (blpHero.subtitle as string) || mock.blogPage.hero.subtitle,
        image: (blpHero.image as string) || mock.blogPage.hero.image,
      },
      newsletter: {
        active: blpNews.active !== false,
        title: (blpNews.title as string) || mock.blogPage.newsletter.title,
        subtitle: (blpNews.subtitle as string) || mock.blogPage.newsletter.subtitle,
        buttonLabel: (blpNews.buttonLabel as string) || mock.blogPage.newsletter.buttonLabel,
        placeholder: (blpNews.placeholder as string) || mock.blogPage.newsletter.placeholder,
      },
      popular: {
        active: blpPop.active !== false,
        heading: (blpPop.heading as string) || mock.blogPage.popular.heading,
        viewAllLabel: (blpPop.viewAllLabel as string) || mock.blogPage.popular.viewAllLabel,
        viewAllHref: (blpPop.viewAllHref as string) || mock.blogPage.popular.viewAllHref,
        items: arrOr(blpPop.items, mock.blogPage.popular.items),
      },
      suggest: {
        active: blpSug.active !== false,
        title: (blpSug.title as string) || mock.blogPage.suggest.title,
        subtitle: (blpSug.subtitle as string) || mock.blogPage.suggest.subtitle,
        buttonLabel: (blpSug.buttonLabel as string) || mock.blogPage.suggest.buttonLabel,
        buttonHref: (blpSug.buttonHref as string) || mock.blogPage.suggest.buttonHref,
      },
    };

    const pkpD = asObj(data.siteContent?.packagesPage);
    const pkpHero = asObj(pkpD.hero), pkpCons = asObj(pkpD.consultation);
    const packagesPage = {
      hero: {
        active: pkpHero.active !== false,
        eyebrow: (pkpHero.eyebrow as string) || mock.packagesPage.hero.eyebrow,
        title: (pkpHero.title as string) || mock.packagesPage.hero.title,
        subtitle: (pkpHero.subtitle as string) || mock.packagesPage.hero.subtitle,
      },
      consultation: {
        active: pkpCons.active !== false,
        title: (pkpCons.title as string) || mock.packagesPage.consultation.title,
        subtitle: (pkpCons.subtitle as string) || mock.packagesPage.consultation.subtitle,
        buttonLabel: (pkpCons.buttonLabel as string) || mock.packagesPage.consultation.buttonLabel,
        buttonHref: (pkpCons.buttonHref as string) || mock.packagesPage.consultation.buttonHref,
      },
      sectionHeading: { ...mock.packagesPage.sectionHeading, ...asObj(pkpD.sectionHeading) },
      cardButtons: { ...mock.packagesPage.cardButtons, ...asObj(pkpD.cardButtons) },
    };

    // ── Common lower-page strips ──
    const csD = asObj(data.siteContent?.commonSections);
    const mCS = mock.commonSections;
    const bh = (src: Record<string, unknown>, m: { pages: string[]; eyebrow: string; title: string; paragraph: string; viewAllLabel: string; viewAllHref: string }) => ({
      active: src.active !== false,
      pages: Array.isArray(src.pages) ? (src.pages as string[]) : m.pages,
      eyebrow: (src.eyebrow as string) || m.eyebrow,
      title: (src.title as string) || m.title,
      paragraph: (src.paragraph as string) || m.paragraph,
      viewAllLabel: (src.viewAllLabel as string) || m.viewAllLabel,
      viewAllHref: (src.viewAllHref as string) || m.viewAllHref,
    });
    const csClients = asObj(csD.clients), csStories = asObj(csD.stories), csBlog = asObj(csD.blog), csServices = asObj(csD.services), csPackages = asObj(csD.packages), csContact = asObj(csD.contact);
    const commonSections = {
      clients: { ...bh(csClients, mCS.clients), logos: arrOr(csClients.logos, mCS.clients.logos) },
      stories: { ...bh(csStories, mCS.stories), items: arrOr(csStories.items, mCS.stories.items) },
      blog: { ...bh(csBlog, mCS.blog), items: arrOr(csBlog.items, mCS.blog.items) },
      services: { ...bh(csServices, mCS.services), items: arrOr(csServices.items, mCS.services.items) },
      packages: { ...bh(csPackages, mCS.packages), items: arrOr(csPackages.items, mCS.packages.items) },
      contact: {
        active: csContact.active !== false,
        pages: Array.isArray(csContact.pages) ? (csContact.pages as string[]) : mCS.contact.pages,
        eyebrow: (csContact.eyebrow as string) || mCS.contact.eyebrow,
        heading: (csContact.heading as string) || mCS.contact.heading,
        paragraph: (csContact.paragraph as string) || mCS.contact.paragraph,
        address: (csContact.address as string) || mCS.contact.address,
        phone: (csContact.phone as string) || mCS.contact.phone,
        email: (csContact.email as string) || mCS.contact.email,
        hours: (csContact.hours as string) || mCS.contact.hours,
        socials: arrOr(csContact.socials, mCS.contact.socials),
        form: { ...mCS.contact.form, ...asObj(csContact.form) },
      },
    };

    // ── Blog-post shared config (author, sidebar, related) ──
    const bppD = asObj(data.siteContent?.blogPostPage);
    const bppAuthor = asObj(bppD.author), bppSide = asObj(bppD.sidebar), bppRel = asObj(bppD.related);
    const mBPP = mock.blogPostPage;
    const blogPostPage = {
      author: { name: (bppAuthor.name as string) || mBPP.author.name, bio: (bppAuthor.bio as string) || mBPP.author.bio, avatar: (bppAuthor.avatar as string) || mBPP.author.avatar },
      sidebar: {
        searchPlaceholder: (bppSide.searchPlaceholder as string) || mBPP.sidebar.searchPlaceholder,
        categories: arrOr(bppSide.categories, mBPP.sidebar.categories),
        tags: arrOr(bppSide.tags, mBPP.sidebar.tags),
        cta: { ...mBPP.sidebar.cta, ...asObj(bppSide.cta) },
      },
      related: {
        heading: (bppRel.heading as string) || mBPP.related.heading,
        viewAllLabel: (bppRel.viewAllLabel as string) || mBPP.related.viewAllLabel,
        viewAllHref: (bppRel.viewAllHref as string) || mBPP.related.viewAllHref,
        items: arrOr(bppRel.items, mBPP.related.items),
      },
    };

    const content: SiteContent = {
      ...mock,
      studioName: data.studioName || mock.studioName,
      currencySymbol: symbolFromCurrency((data.currency as string) || null) || mock.currencySymbol,
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
      galleryPage,
      servicesPage,
      reviewsPage,
      blogPage,
      packagesPage,
      commonSections,
      blogPostPage,
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
