import { getSite } from "@/lib/get-site";
import { PageShell } from "@/components/site/page-shell";
import { PackageCard } from "@/components/site/package-card";

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const { content } = await getSite({ domain });

  return (
    <PageShell title="Packages" desc="Each package is described by outcome and deliverables.">
      <div className="grid gap-5 lg:grid-cols-3">
        {content.packages.map((p) => (
          <PackageCard key={p.id} pkg={p} ctaLabel="Book this package" />
        ))}
      </div>
    </PageShell>
  );
}
