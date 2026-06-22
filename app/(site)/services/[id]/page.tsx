import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";

import { getSite } from "@/lib/get-site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AskAiButton } from "@/components/site/ask-ai-button";

export default async function ServiceDetailPage({
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

  const service = content.services.find((s) => s.id === id);
  if (!service) notFound();

  // A service's photos (managed under Service Pages → Images and the Gallery page,
  // which share the same list). Falls back to the card photo when empty.
  const images = service.images.length ? service.images : [service.photo.src];

  return (
    <main className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-10 md:px-6 2xl:px-12">
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft width={16} height={16} /> All services
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: details */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              {service.name}
            </h1>
            {service.from ? <Badge tone="teal">from {service.from}</Badge> : null}
          </div>
          {service.desc ? (
            <p className="mt-3 text-base leading-7 text-muted-foreground">{service.desc}</p>
          ) : null}
          {service.content ? (
            <div
              className="rich-content mt-4 text-sm leading-7 text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          ) : null}
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/booking">
                <Calendar width={17} height={17} />
                Book this service
              </Link>
            </Button>
            <AskAiButton />
          </div>
        </div>

        {/* Right: image gallery */}
        <div className="grid grid-cols-2 gap-3">
          {images.map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${service.name} ${i + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
