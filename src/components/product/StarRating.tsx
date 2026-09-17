import { formatReviewCount } from "@/lib/format";

const STAR_PATH =
  "M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.59l5.79-.84L10 1.5z";

function StarRow({ className, size }: { className: string; size: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 19" className={`${size} fill-current`}>
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  compact = true,
  href,
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  compact?: boolean;
  href?: string;
}) {
  const percent = Math.max(0, Math.min(1, rating / 5)) * 100;
  const starSize = size === "md" ? "h-5 w-5" : "h-4 w-4";
  const countText =
    reviewCount !== undefined
      ? compact
        ? formatReviewCount(reviewCount)
        : reviewCount.toLocaleString()
      : undefined;

  return (
    <div className="flex items-center gap-1.5">
      <div
        className="relative"
        role="img"
        aria-label={`${rating.toFixed(1)} out of 5 stars`}
      >
        <StarRow className="text-gray-300" size={starSize} />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${percent}%` }}
        >
          <StarRow className="text-star" size={starSize} />
        </div>
      </div>
      {countText !== undefined &&
        (href ? (
          <a href={href} className="text-sm text-link hover:underline">
            {countText}
          </a>
        ) : (
          <span className="text-sm text-link hover:underline">
            {countText}
          </span>
        ))}
    </div>
  );
}
