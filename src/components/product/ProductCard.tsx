import Image from "next/image";
import { StarRating } from "./StarRating";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const outOfStock = product.stock <= 0;

  return (
    <div className="group flex w-full shrink-0 flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 33vw, 190px"
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {outOfStock && (
          <span className="absolute left-2 top-2 rounded bg-white/95 px-2 py-0.5 text-xs font-medium text-muted">
            Out of stock
          </span>
        )}
      </div>

      <p className="line-clamp-2 text-sm text-foreground">{product.name}</p>

      <StarRating rating={product.rating} reviewCount={product.reviewCount} />

      <p className="text-lg font-semibold text-foreground">
        {formatPrice(product.price, product.currency)}
      </p>

      <button
        type="button"
        disabled={outOfStock}
        className="mt-auto w-full rounded-full border border-cta-border/10 bg-cta px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:brightness-95 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-muted disabled:shadow-none disabled:hover:brightness-100"
      >
        {outOfStock ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}
