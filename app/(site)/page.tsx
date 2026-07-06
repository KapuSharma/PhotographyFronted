import { getSite } from "@/lib/get-site";
import { getTemplate } from "@/templates/registry";

/* Home route — renders the active template's Home via the registry.
   FRONTEND ONLY: pinned to the "aria" template we're building. CMS wiring
   will resolve the tenant's template dynamically (same as the other routes).

   Dev: append ?domain=<tenant-domain> to test a real tenant from localhost. */
const ACTIVE_TEMPLATE = "aria";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const site = await getSite({ domain });

  const { Home } = getTemplate(ACTIVE_TEMPLATE);
  if (!Home) return null;
  return <Home content={site.content} />;
}
