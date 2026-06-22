import { getSite } from "@/lib/get-site";
import { SectionTitle } from "@/components/site/section-title";
import { GalleryView } from "@/components/site/gallery-view";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const domain = typeof sp.domain === "string" ? sp.domain : undefined;
  const { content } = await getSite({ domain });

  return (
    <main className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-10 md:px-6 2xl:px-12">
      <SectionTitle title="Gallery" desc="Browse our work by category." />
      <GalleryView photos={content.portfolio} categories={content.galleryCategories} />
    </main>
  );
}
