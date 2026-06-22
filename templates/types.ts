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
};

/** An editable section heading (eyebrow + title + description) with a visibility flag. */
export type SectionHead = { active: boolean; eyebrow: string; title: string; desc: string };

/** A package with its full detail-page content + image gallery. */
export type PackageItem = Package & { content: string; images: string[] };

/** The single content box handed to every template. */
export type SiteContent = {
  studioName: string;
  hero: {
    active: boolean;
    badges: string[];
    title: string;
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
    intro: { active: boolean; title: string; tagline: string; body: string; image: string };
    stats: { active: boolean; items: { label: string; value: string }[] };
  };
  contact: { title: string; tagline: string; phone: string; email: string; address: string; note: string };
  blog: { title: string; date: string; excerpt: string; image: string }[];
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
};

/** Props every template's page components accept. */
export type TemplateHomeProps = { content: SiteContent };

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

/** A registered template = its manifest + the components it renders. */
export type Template = {
  manifest: TemplateManifest;
  Home: ComponentType<TemplateHomeProps>;
};
