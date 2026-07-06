import { getSite } from "@/lib/get-site";
import { getTemplate } from "@/templates/registry";

/* Reviews route — renders the active template's Reviews via the registry,
   fed the tenant's resolved SiteContent (falls back to mock content). */
const ACTIVE_TEMPLATE = "aria";

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const site = await getSite({ domain });

  const { Reviews } = getTemplate(ACTIVE_TEMPLATE);
  if (!Reviews) return null;
  return <Reviews content={site.content} />;
}
