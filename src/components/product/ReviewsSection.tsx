import { StarRating } from "./StarRating";
import type { Review } from "@/lib/types";

export function ReviewsSection({
  reviews,
  totalReviewCount,
}: {
  reviews: Review[];
  totalReviewCount: number;
}) {
  return (
    <section id="reviews" className="scroll-mt-20 border-t border-gray-200 pt-6">
      <h2 className="mb-4 text-lg font-bold text-foreground">
        Customer Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-muted">
          This product has no written reviews yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-6">
          {reviews.map((review) => (
            <li key={review.id} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <StarRating rating={review.rating} />
                <span className="text-sm font-medium text-foreground">
                  {review.title}
                </span>
              </div>
              <p className="text-xs text-muted">
                {review.author} · {review.date}
              </p>
              <p className="text-sm text-foreground">{review.body}</p>
            </li>
          ))}
        </ul>
      )}

      {totalReviewCount > reviews.length && (
        <p className="mt-4 text-sm text-muted">
          Showing {reviews.length} of {totalReviewCount.toLocaleString()}{" "}
          ratings.
        </p>
      )}
    </section>
  );
}
