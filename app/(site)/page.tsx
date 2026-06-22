import { getSite } from "@/lib/get-site";
import { HomeRenderer } from "@/components/site/home-renderer";

/* Server component: resolves the tenant's template + content (by domain) on
   the server, then hands it to the renderer. Falls back to mock content when
   there's no domain / no backend.

   Dev: append ?domain=<tenant-domain> to test a real tenant from localhost. */
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const site = await getSite({ domain });

  return <HomeRenderer serverTemplate={site.template} content={site.content} />;
}
