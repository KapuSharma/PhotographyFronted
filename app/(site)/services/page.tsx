import { getSite } from "@/lib/get-site";
import { getTemplate } from "@/templates/registry";

/* Services route — renders the active template's Services via the registry,
   fed the tenant's resolved SiteContent (falls back to mock content). */
const ACTIVE_TEMPLATE = "aria";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const site = await getSite({ domain });

  const { Services } = getTemplate(ACTIVE_TEMPLATE);
  if (!Services) return null;
  return <Services content={site.content} />;
}
