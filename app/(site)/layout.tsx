import type { CSSProperties } from "react";
import { headers } from "next/headers";

import { getSite } from "@/lib/get-site";
import { TEMPLATES } from "@/templates/registry";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingChat } from "@/components/site/floating-chat";
import { MobileActionBar } from "@/components/site/mobile-action-bar";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  // Resolves the tenant from the request (middleware sets x-tenant-domain).
  const { content, accentColor, logoUrl, template, domain, assistant } = await getSite();

  // A ?previewTemplate= override (from the dashboard) wins, so the live preview
  // themes every page. Otherwise use the tenant's saved template.
  const h = await headers();
  const preview = h.get("x-preview-template");
  const activeTemplate = preview && preview in TEMPLATES ? preview : template;

  // Per-tenant accent applied site-wide (header, footer, and every page).
  const accentStyle = accentColor
    ? ({
        "--brand-500": accentColor,
        "--brand-600": accentColor,
        "--brand-700": accentColor,
        "--primary": accentColor,
        "--ring": accentColor,
      } as CSSProperties)
    : undefined;

  return (
    <div
      data-template={activeTemplate}
      className="flex min-h-screen flex-col bg-background text-foreground"
      style={accentStyle}
    >
      <SiteHeader
        studioName={content.studioName}
        logoUrl={logoUrl}
        tagline={content.header.tagline}
        bookLabel={content.header.bookLabel}
      />
      {/* pb-24 keeps content clear of the mobile action bar */}
      <div className="flex-1 pb-24 md:pb-0">{children}</div>
      <SiteFooter
        studioName={content.studioName}
        logoUrl={logoUrl}
        contact={content.contact}
        footer={content.footer}
      />
      <FloatingChat
        domain={domain}
        assistantName={assistant.name}
        greeting={assistant.greeting}
        phone={content.contact.phone}
      />
      <MobileActionBar />
    </div>
  );
}
