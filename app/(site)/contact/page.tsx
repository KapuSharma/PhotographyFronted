import { getSite } from "@/lib/get-site";
import { getTemplate } from "@/templates/registry";

/* Contact route — renders the active template's Contact via the registry,
   fed the tenant's resolved SiteContent (falls back to mock content). */
const ACTIVE_TEMPLATE = "aria";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const site = await getSite({ domain });

  const { Contact } = getTemplate(ACTIVE_TEMPLATE);
  if (!Contact) return null;
  return <Contact content={site.content} />;
}
