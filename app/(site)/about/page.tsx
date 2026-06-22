import { getSite } from "@/lib/get-site";
import { Card } from "@/components/ui/card";
import { PageShell } from "@/components/site/page-shell";

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const { content } = await getSite({ domain });
  const { intro, stats } = content.about;

  return (
    <PageShell title={intro.title} desc={intro.tagline}>
      {intro.active && (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <div className="p-6">
              <div className="rich-content text-sm leading-7 text-muted-foreground" dangerouslySetInnerHTML={{ __html: intro.body }} />
              {stats.active && stats.items.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {stats.items.map((f, i) => (
                    <div key={i} className="rounded-xl border border-border p-4">
                      <p className="text-2xl font-extrabold text-foreground">{f.value}</p>
                      <p className="text-xs font-semibold text-muted-foreground">{f.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
          {intro.image && (
            <div className="relative min-h-[260px] overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={intro.image} alt={intro.title} className="h-full w-full object-cover" />
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
}
