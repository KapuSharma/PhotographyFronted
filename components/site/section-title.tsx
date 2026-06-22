import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  desc,
  className,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-5", className)}>
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <div
          className="rich-content mt-2 max-w-2xl text-sm leading-6 text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      ) : null}
    </div>
  );
}
