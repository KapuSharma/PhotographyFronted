"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { Photo } from "@/lib/data";

export function GalleryView({ photos, categories }: { photos: Photo[]; categories: string[] }) {
  const [filter, setFilter] = useState("All");
  const chips = ["All", ...categories];
  const shown = filter === "All" ? photos : photos.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-5 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
              filter === c
                ? "border-brand-200 bg-brand-50 text-brand-700"
                : "border-border bg-card text-muted-foreground hover:bg-muted"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {shown.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="group relative aspect-square overflow-hidden rounded-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            {(p.title || p.category) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                {p.title && <p className="text-sm font-semibold text-white">{p.title}</p>}
                {p.category && <p className="text-xs text-white/70">{p.category}</p>}
              </div>
            )}
          </div>
        ))}
        {shown.length === 0 ? (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
            No photos in this category yet.
          </p>
        ) : null}
      </div>
    </>
  );
}
