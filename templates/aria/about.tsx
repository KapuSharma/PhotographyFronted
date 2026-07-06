import {
  AboutHero, StatsBar, Journey, Team, BehindScenes, WhyUs, Testimonials, CtaFooter,
} from "./sections";
import type { TemplatePageProps } from "@/templates/types";

/* Aria — About page.
   FRONTEND ONLY for now: sections use placeholder data (see ./sections.tsx).
   The `content` prop is part of the template page contract and will be used
   when this template is wired to the CMS. */
export default function AriaAbout(_props: TemplatePageProps) {
  return (
    <main className="aria font-inter bg-[var(--a-cream)] text-[var(--a-ink)]">
      <AboutHero />
      <StatsBar />
      <Journey />
      <Team />
      <BehindScenes />
      <WhyUs />
      <Testimonials />
      <CtaFooter />
    </main>
  );
}
