import { getSite } from "@/lib/get-site";
import { getTemplate } from "@/templates/registry";

/* About route — renders the active template's About page via the registry,
   fed the tenant's resolved SiteContent (falls back to mock content). */
const ACTIVE_TEMPLATE = "aria";

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const site = await getSite({ domain });

  const { About } = getTemplate(ACTIVE_TEMPLATE);
  if (!About) return null;
  return <About content={site.content} />;
}
