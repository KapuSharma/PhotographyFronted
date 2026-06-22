import { ArrowRight } from "lucide-react";

import { getSite } from "@/lib/get-site";
import { Card } from "@/components/ui/card";
import { PageShell } from "@/components/site/page-shell";

function formatDate(d: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return d; // already a display string
  return new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const { content } = await getSite({ domain });

  return (
    <PageShell title="Blog" desc="Tips and stories for clients planning a shoot.">
      <div className="grid gap-5 md:grid-cols-3">
        {content.blog.map((b, i) => (
          <Card key={i} className="overflow-hidden transition hover:shadow-md">
            <div className="relative h-44 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.image} alt={b.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-muted-foreground">{formatDate(b.date)}</p>
              <h3 className="mt-1 font-extrabold leading-snug text-foreground">{b.title}</h3>
              <div className="rich-content mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground" dangerouslySetInnerHTML={{ __html: b.excerpt }} />
              <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                Read more <ArrowRight width={15} height={15} />
              </p>
            </div>
          </Card>
        ))}
        {content.blog.length === 0 ? (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">No posts yet.</p>
        ) : null}
      </div>
    </PageShell>
  );
}
