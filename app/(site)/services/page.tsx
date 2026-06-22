import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getSite } from "@/lib/get-site";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/site/page-shell";
import { PhotoImage } from "@/components/site/photo-image";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const { content } = await getSite({ domain });

  return (
    <PageShell title="Services" desc="Everything we offer. Click a service to see full details.">
      <div className="grid gap-4 md:grid-cols-2">
        {content.services.map((s, i) => (
          <Link key={s.id || i} href={`/services/${s.id}`} className="group block">
            <Card className="transition group-hover:shadow-md">
              <div className="flex gap-4 p-4">
                <PhotoImage photo={s.photo} className="h-24 w-28 shrink-0 rounded-xl" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-foreground">{s.name}</p>
                    {s.from ? <Badge tone="teal">from {s.from}</Badge> : null}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">{s.desc}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    View details <ArrowRight width={15} height={15} />
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
