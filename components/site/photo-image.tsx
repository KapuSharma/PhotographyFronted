import { cn } from "@/lib/utils";
import type { Photo } from "@/lib/data";

/**
 * Image container matching the prototype's img() helper:
 * object-cover fill, optional dark gradient overlay.
 * Uses a plain <img> for Unsplash placeholders (no next/image config needed).
 */
export function PhotoImage({
  photo,
  className,
  overlay = false,
}: {
  photo: Photo;
  className?: string;
  overlay?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.title}
        loading="lazy"
        className="h-full w-full object-cover"
      />
      {overlay ? (
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
      ) : null}
    </div>
  );
}
