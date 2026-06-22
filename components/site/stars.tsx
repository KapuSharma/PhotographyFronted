import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ n, className }: { n: number; className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          width={14}
          height={14}
          className={i < n ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}
        />
      ))}
    </div>
  );
}
