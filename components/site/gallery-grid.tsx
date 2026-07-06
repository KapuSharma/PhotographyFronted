"use client";

import { Images } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import type { Photo } from "@/lib/data";
import { useSiteStore } from "@/store/use-site-store";
import { TiltCard } from "@/components/site/anim";

/** Deterministic "photo count" badge so cards look like real collections. */
function count(p: Photo, i: number) {
  return 24 + ((p.title.length * 7 + i * 11) % 32);
}

/** Filter pills — live in the hero. Shares state with the grid via the store. */
export function GalleryChips({ categories }: { categories: string[] }) {
  const filter = useSiteStore((s) => s.galleryFilter);
  const setFilter = useSiteStore((s) => s.setGalleryFilter);
  const chips = ["All", ...categories];
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <button
          key={c}
          onClick={() => setFilter(c)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-semibold transition",
            filter === c
              ? "border-brand-700 bg-brand-700 text-white shadow-sm"
              : "border-border bg-white/80 text-muted-foreground backdrop-blur hover:border-brand-200 hover:text-brand-700"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

/** The masonry-style collection grid. Reads the active filter from the store. */
export function GalleryGrid({ photos, categories }: { photos: Photo[]; categories: string[] }) {
  const filter = useSiteStore((s) => s.galleryFilter);
  const valid = filter === "All" || categories.includes(filter);
  const shown = !valid || filter === "All" ? photos : photos.filter((p) => p.category === filter);

  return (
    <>
      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div
              key={`${p.id}-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="perspective">
                <TiltCard intensity={6} glare={false} className="preserve-3d">
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm lift">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-black/45 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
                      <Images width={13} height={13} /> {count(p, i)}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="text-base font-bold text-white">{p.title}</div>
                      <div className="text-xs text-white/75">{p.category}</div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">No photos in this category yet.</p>
      ) : null}
    </>
  );
}
