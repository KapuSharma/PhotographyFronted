"use client";

import { useEffect } from "react";

import { getTemplate, TEMPLATES } from "@/templates/registry";
import { useSiteStore } from "@/store/use-site-store";
import type { SiteContent } from "@/templates/types";

/* Renders the resolved template on the server (SEO + no flash), while still
   allowing a client-side override (the floating switcher / ?previewTemplate).
   Displayed template = override ?? serverTemplate.
   (Per-tenant accent is applied site-wide by the layout.) */
export function HomeRenderer({
  serverTemplate,
  content,
}: {
  serverTemplate: string;
  content: SiteContent;
}) {
  const override = useSiteStore((s) => s.templateOverride);
  const setOverride = useSiteStore((s) => s.setTemplateOverride);
  const setServerTemplate = useSiteStore((s) => s.setServerTemplate);

  // Sync server choice into the store (for the switcher), and apply any
  // ?previewTemplate override coming from the dashboard's Preview button.
  useEffect(() => {
    setServerTemplate(serverTemplate);
    const preview = new URLSearchParams(window.location.search).get("previewTemplate");
    if (preview && preview in TEMPLATES) setOverride(preview);
  }, [serverTemplate, setServerTemplate, setOverride]);

  const active = override ?? serverTemplate;
  const { Home } = getTemplate(active);

  return <Home content={content} />;
}
