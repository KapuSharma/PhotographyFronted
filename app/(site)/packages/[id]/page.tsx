import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Check } from "lucide-react";

import { getSite } from "@/lib/get-site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AskAiButton } from "@/components/site/ask-ai-button";

export default async function PackageDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const { content } = await getSite({ domain });

  const pkg = content.packages.find((p) => p.id === id);
  if (!pkg) notFound();

  return (
    <main className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-10 md:px-6 2xl:px-12">
      <Link
        href="/packages"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft width={16} height={16} /> All packages
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: details */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {pkg.duration}
            </p>
            {pkg.popular ? <Badge tone="teal">Most booked</Badge> : null}
          </div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            {pkg.name}
          </h1>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-brand-600">{pkg.price}</p>
          {pkg.bestFor ? <p className="mt-2 text-base leading-7 text-muted-foreground">{pkg.bestFor}</p> : null}
          {pkg.content ? (
            <div className="rich-content mt-4 text-sm leading-7 text-muted-foreground" dangerouslySetInnerHTML={{ __html: pkg.content }} />
          ) : null}

          {pkg.includes.length > 0 && (
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {pkg.includes.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check width={16} height={16} className="text-emerald-500" /> {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/booking">
                <Calendar width={17} height={17} />
                Book this package
              </Link>
            </Button>
            <AskAiButton />
          </div>
        </div>

        {/* Right: image gallery */}
        {pkg.images.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {pkg.images.map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${pkg.name} ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
