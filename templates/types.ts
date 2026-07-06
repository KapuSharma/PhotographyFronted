import type { ComponentType } from "react";
import type { Photo, Service, Package, Testimonial } from "@/lib/data";

/* =====================================================================
   Template system — shared types.

   A template is a "skin": it RECEIVES content and only decides how it
   looks. The same SiteContent is fed to every template, so switching
   templates never changes or loses content.
   ===================================================================== */

/** A service with its hero photo already resolved (templates stay index-free). */
export type ServiceItem = Service & {
  id: string;
  photo: Photo;
  content: string;
  images: string[];
  /** Card metadata used by richer templates (aria). */
  category?: string;
  rating?: string;
  reviews?: string;
  features?: string[];
};

/** An editable section heading (eyebrow + title + description) with a visibility flag. */
export type SectionHead = { active: boolean; eyebrow: string; title: string; desc: string };

/** A package with its full detail-page content + image gallery. */
export type PackageItem = Package & { content: string; images: string[]; badge?: string; category?: string; description?: string };

/** Icon-tagged stat / feature entries (icon is a key the template maps to a glyph). */
export type IconStat = { icon: string; value: string; label: string };
export type IconFeature = { icon: string; title: string; text: string };
export type LinkedCard = { active: boolean; title: string; subtitle: string; buttonLabel: string; buttonHref: string };

/** Shared "band" heading used by the lower-page common strips. `pages` lists
    the page ids (home, about, gallery, …) this strip renders on. */
export type BandHead = { active: boolean; pages: string[]; eyebrow: string; title: string; paragraph: string; viewAllLabel: string; viewAllHref: string };

/** A structured content block for the blog-post article body. */
export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "checklist"; intro: string; items: { bold: string; text: string }[] }
  | { type: "callout"; tone: "gold" | "pink"; icon: string; text: string }
  | { type: "image"; url: string; alt: string }
  | { type: "deliverables"; items: { icon: string; title: string; sub: string }[] }
  | { type: "quote"; text: string };

/** The 6 lower-page promo strips (rendered by CommonSections). */
export type CommonSectionsContent = {
  clients: BandHead & { logos: string[] };
  stories: BandHead & { items: { text: string; name: string; role: string; avatar: string; rating: number }[] };
  blog: BandHead & { items: { title: string; date: string; img: string; href: string }[] };
  services: BandHead & { items: { icon: string; name: string; desc: string }[] };
  packages: BandHead & { items: { name: string; price: string; note: string; popular: boolean; custom: boolean; features: string[]; img: string; cta: string; href: string }[] };
  contact: {
    active: boolean; pages: string[]; eyebrow: string; heading: string; paragraph: string;
    address: string; phone: string; email: string; hours: string;
    socials: { label: string; url: string }[];
    form: { name: string; email: string; phone: string; subject: string; message: string; submit: string };
  };
};

/** The single content box handed to every template. */
export type SiteContent = {
  studioName: string;
  hero: {
    active: boolean;
    badges: string[];
    title: string;
    /** Handwritten-script accent line woven into the headline (aria). */
    accent: string;
    subtitle: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryEnabled: boolean;
    secondaryLabel: string;
    images: string[];
    marqueeEnabled: boolean;
    marqueeImages: string[];
  };
  services: ServiceItem[];
  portfolio: Photo[];
  galleryCategories: string[];
  packages: PackageItem[];
  testimonials: Testimonial[];
  sections: {
    services: SectionHead;
    portfolio: SectionHead;
    packages: SectionHead;
    reviews: SectionHead;
  };
  cta: { active: boolean; title: string; subtitle: string };
  about: {
    intro: {
      active: boolean; title: string; tagline: string; body: string; image: string;
      eyebrow: string; headlineTop: string; headlineMain: string; headlineAccent: string;
      thumbs: string[];
      features: { icon: string; label: string }[];
      primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string;
    };
    stats: { active: boolean; items: { label: string; value: string }[] };
    journey: { active: boolean; eyebrow: string; title: string; items: { year: string; icon: string; text: string }[] };
    team: { active: boolean; eyebrow: string; title: string; members: { name: string; role: string; img: string }[] };
    behindScenes: { active: boolean; eyebrow: string; title: string; images: string[] };
    whyUs: { active: boolean; eyebrow: string; title: string; items: { icon: string; title: string; text: string }[] };
    testimonials: { active: boolean; eyebrow: string; title: string };
    cta: { active: boolean; heading: string; subtitle: string; primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string; bgImage: string };
  };
  contact: {
    eyebrow: string; title: string; accent: string; tagline: string;
    phone: string; email: string; address: string; note: string;
    phoneSub: string; emailSub: string; addressSub: string; detailsHeading: string;
    why: { icon: string; title: string; sub: string }[];
    form: {
      heading: string; nameLabel: string; namePh: string; phoneLabel: string; phonePh: string;
      emailLabel: string; emailPh: string; serviceLabel: string; servicePh: string;
      messageLabel: string; messagePh: string; submit: string; privacy: string;
    };
    map: { studioName: string; address: string; directionsLabel: string; directionsHref: string };
    cta: { active: boolean; heading: string; subtitle: string; buttonLabel: string; buttonHref: string };
  };
  blog: { title: string; date: string; excerpt: string; image: string; category?: string; author?: string; authorImg?: string; readTime?: string; views?: string; tags?: string[]; body?: ArticleBlock[] }[];
  header: { tagline: string; bookLabel: string };
  footer: {
    description: string;
    brandTagline: string;
    linksTitle: string;
    links: { label: string; href: string }[];
    contactTitle: string;
    showContact: boolean;
    socialTitle: string;
    socials: { label: string; url: string }[];
    copyright: string;
  };

  /* ── Per-page content sections (aria) ── */
  galleryPage: {
    hero: { active: boolean; eyebrow: string; title: string; subtitle: string; stats: IconStat[] };
    features: { active: boolean; items: IconFeature[] };
    cta: LinkedCard;
  };
  servicesPage: {
    hero: { active: boolean; title: string; tagline: string; subtitle: string; stats: IconStat[] };
    featured: { active: boolean; badge: string; serviceId: string; buttonLabel: string; buttonHref: string };
    help: { active: boolean; items: { icon: string; title: string; text: string; buttonLabel: string; buttonHref: string }[] };
    cardButton: { label: string; href: string };
  };
  reviewsPage: {
    hero: { active: boolean; eyebrow: string; title: string; accent: string; subtitle: string; image: string };
    summary: { active: boolean; rating: string; count: string; quote: string; quoteAuthor: string; breakdown: { star: number; percent: number }[] };
    video: { active: boolean; thumbnail: string; name: string; role: string; duration: string; heading: string; subtitle: string; stats: { value: string; label: string }[] };
    viewMore: { label: string; href: string };
    photoReviews: { active: boolean; heading: string; subtitle: string; viewAllLabel: string; viewAllHref: string; images: string[] };
    reviewOn: { active: boolean; heading: string; subtitle: string; google: { label: string; url: string }; facebook: { label: string; url: string } };
    cta: { active: boolean; heading: string; subtitle: string; buttonLabel: string; buttonHref: string };
  };
  blogPage: {
    hero: { active: boolean; eyebrow: string; title: string; accent: string; subtitle: string; image: string };
    newsletter: { active: boolean; title: string; subtitle: string; buttonLabel: string; placeholder: string };
    popular: { active: boolean; heading: string; viewAllLabel: string; viewAllHref: string; items: { title: string; date: string; img: string; href: string }[] };
    suggest: { active: boolean; title: string; subtitle: string; buttonLabel: string; buttonHref: string };
  };
  packagesPage: {
    hero: { active: boolean; eyebrow: string; title: string; subtitle: string };
    consultation: LinkedCard;
    sectionHeading: { subtitle: string; ratingValue: string; ratingCount: string };
    cardButtons: { primaryLabel: string; secondaryLabel: string };
  };
  commonSections: CommonSectionsContent;
  blogPostPage: {
    author: { name: string; bio: string; avatar: string };
    sidebar: {
      searchPlaceholder: string;
      categories: { name: string; icon: string; count: string }[];
      tags: string[];
      cta: { heading: string; subtitle: string; buttonLabel: string; buttonHref: string };
    };
    related: { heading: string; viewAllLabel: string; viewAllHref: string; items: { category: string; date: string; title: string; read: string; img: string; href: string }[] };
  };
};

/** Props every template's Home accepts. */
export type TemplateHomeProps = { content: SiteContent };

/** Props for template full-page components (About, Gallery, …). Content is
    optional so a template can be built frontend-first with placeholder data
    and wired to the CMS later. */
export type TemplatePageProps = { content?: SiteContent };

/** Display metadata for a template (used by the registry + dashboard gallery). */
export type TemplateManifest = {
  slug: string;
  name: string;
  description: string;
  /** Path to a preview thumbnail under /public. */
  thumbnail: string;
  /** Representative accent colour (hex) for chips / preview dots. */
  accent: string;
};

/** A registered template = its manifest + the page components it renders.
    Home is optional so a template can be built page-by-page. Add the other
    full-page slots as each template implements them. */
export type Template = {
  manifest: TemplateManifest;
  Home?: ComponentType<TemplateHomeProps>;
  About?: ComponentType<TemplatePageProps>;
  Gallery?: ComponentType<TemplatePageProps>;
  Services?: ComponentType<TemplatePageProps>;
  Packages?: ComponentType<TemplatePageProps>;
  Blog?: ComponentType<TemplatePageProps>;
  Reviews?: ComponentType<TemplatePageProps>;
  Contact?: ComponentType<TemplatePageProps>;
};
