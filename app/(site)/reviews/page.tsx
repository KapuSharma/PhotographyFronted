import { getSite } from "@/lib/get-site";
import { PageShell } from "@/components/site/page-shell";
import { ReviewCard } from "@/components/site/review-card";

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const { content } = await getSite({ domain });

  return (
    <PageShell title="Reviews" desc="What recent clients said.">
      <div className="grid gap-4 md:grid-cols-3">
        {content.testimonials.map((t, i) => (
          <ReviewCard key={i} review={t} />
        ))}
      </div>
    </PageShell>
  );
}
