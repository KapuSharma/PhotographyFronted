import { getSite } from "@/lib/get-site";
import { getTemplate } from "@/templates/registry";

/* Blog route — renders the active template's Blog listing via the registry,
   fed the tenant's resolved SiteContent (falls back to mock content). */
const ACTIVE_TEMPLATE = "aria";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const site = await getSite({ domain });

  const { Blog } = getTemplate(ACTIVE_TEMPLATE);
  if (!Blog) return null;
  return <Blog content={site.content} />;
}
