import { formatReviewCount } from "@/lib/format";

function starIconFor(position: number, rating: number): { src: string; alt: string } {
  const diff = rating - position;
  if (diff >= 0) return { src: "/figma-icons/star-filled.svg", alt: "full star" };
  if (diff >= -0.5) return { src: "/figma-icons/star-half.svg", alt: "half star" };
  return { src: "/figma-icons/star-empty-product.svg", alt: "empty star" };
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
        className="flex gap-0.5"
        role="img"
        aria-label={`${rating.toFixed(1)} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((position) => {
          const icon = starIconFor(position, rating);
          return (
            // eslint-disable-next-line @next/next/no-img-element -- local vector icon
            <img key={position} src={icon.src} alt="" className={starSize} />
          );
        })}
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
