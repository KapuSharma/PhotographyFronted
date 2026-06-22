import { SectionTitle } from "@/components/site/section-title";

export function PageShell({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1920px] px-4 py-10 md:px-6 2xl:px-12">
      <SectionTitle title={title} desc={desc} />
      {children}
    </main>
  );
}
