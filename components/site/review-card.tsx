import type { Testimonial } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Stars } from "@/components/site/stars";

export function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <Card>
      <div className="p-5">
        <Stars n={review.rating} />
        <div
          className="rich-content mt-3 text-sm leading-6 text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: review.text }}
        />
        <div className="mt-3 flex items-center gap-2.5">
          {review.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.avatar}
              alt={review.client}
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
          ) : null}
          <p className="text-sm font-bold text-foreground">
            {review.client} <span className="font-medium text-muted-foreground">· {review.city}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
