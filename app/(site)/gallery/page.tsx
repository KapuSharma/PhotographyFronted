import { getSite } from "@/lib/get-site";
import { getTemplate } from "@/templates/registry";

/* Gallery route — renders the active template's Gallery via the registry,
   fed the tenant's resolved SiteContent (falls back to mock content).

   Dev: append ?domain=<tenant-domain> to test a real tenant from localhost. */
const ACTIVE_TEMPLATE = "aria";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const site = await getSite({ domain });

  const { Gallery } = getTemplate(ACTIVE_TEMPLATE);
  if (!Gallery) return null;
  return <Gallery content={site.content} />;
}
