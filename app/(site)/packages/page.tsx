import { getSite } from "@/lib/get-site";
import { getTemplate } from "@/templates/registry";

/* Packages route — renders the active template's Packages via the registry,
   fed the tenant's resolved SiteContent (falls back to mock content). */
const ACTIVE_TEMPLATE = "aria";

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const site = await getSite({ domain });

  const { Packages } = getTemplate(ACTIVE_TEMPLATE);
  if (!Packages) return null;
  return <Packages content={site.content} />;
}
