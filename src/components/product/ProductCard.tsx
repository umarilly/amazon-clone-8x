import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./StarRating";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
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
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden rounded-md bg-gray-50"
      >
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
      </Link>

      <Link
        href={`/product/${product.slug}`}
        className="line-clamp-2 text-sm text-foreground hover:text-link hover:underline"
      >
        {product.name}
      </Link>

      <StarRating rating={product.rating} reviewCount={product.reviewCount} />

      <p className="text-lg font-semibold text-foreground">
        {formatPrice(product.price, product.currency)}
      </p>

      <AddToCartButton product={product} className="mt-auto w-full" />
    </div>
  );
}
