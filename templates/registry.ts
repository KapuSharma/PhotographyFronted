import type { Template } from "@/templates/types";
import { auroraManifest } from "@/templates/aurora/manifest";
import AuroraHome from "@/templates/aurora/home";
import { noirManifest } from "@/templates/noir/manifest";
import NoirHome from "@/templates/noir/home";
import { heritageManifest } from "@/templates/heritage/manifest";
import HeritageHome from "@/templates/heritage/home";
import { alpenglowManifest } from "@/templates/alpenglow/manifest";
import AlpenglowHome from "@/templates/alpenglow/home";
import { ariaManifest } from "@/templates/aria/manifest";
import AriaAbout from "@/templates/aria/about";
import AriaGallery from "@/templates/aria/gallery";
import AriaPackages from "@/templates/aria/packages";
import AriaContact from "@/templates/aria/contact";
import AriaReviews from "@/templates/aria/reviews";
import AriaBlog from "@/templates/aria/blog";
import AriaServices from "@/templates/aria/services";
import AriaHome from "@/templates/aria/home";

/* =====================================================================
   Template registry — the "phone book".
   Add a new template by registering one entry here. Everything else
   (public site rendering, dashboard gallery) reads from this list.
   ===================================================================== */

export const DEFAULT_TEMPLATE = "aurora";

export const TEMPLATES: Record<string, Template> = {
  aurora: { manifest: auroraManifest, Home: AuroraHome },
  noir: { manifest: noirManifest, Home: NoirHome },
  heritage: { manifest: heritageManifest, Home: HeritageHome },
  alpenglow: { manifest: alpenglowManifest, Home: AlpenglowHome },
  // "aria" — new premium template, built page-by-page (frontend first).
  aria: { manifest: ariaManifest, Home: AriaHome, About: AriaAbout, Gallery: AriaGallery, Packages: AriaPackages, Contact: AriaContact, Reviews: AriaReviews, Blog: AriaBlog, Services: AriaServices },
};

/** All templates as an array — handy for the dashboard gallery. */
export const TEMPLATE_LIST: Template[] = Object.values(TEMPLATES);

/** Resolve a slug to a template, falling back to the default. */
export function getTemplate(slug?: string | null): Template {
  return (slug && TEMPLATES[slug]) || TEMPLATES[DEFAULT_TEMPLATE];
}
