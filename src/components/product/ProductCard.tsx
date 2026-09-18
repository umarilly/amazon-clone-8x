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
  const original = product.discountPercent
    ? product.price / (1 - product.discountPercent / 100)
    : null;

  return (
    <div className="group flex w-full shrink-0 flex-col gap-2 bg-white">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-gray-50"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 33vw, 190px"
          className="object-contain transition-transform duration-200 group-hover:scale-105"
        />
        {outOfStock && (
          <span className="absolute left-2 top-2 rounded bg-white/95 px-2 py-0.5 text-xs font-medium text-muted">
            Out of stock
          </span>
        )}
      </Link>

      <Link
        href={`/product/${product.slug}`}
        className="line-clamp-2 text-[14px] text-foreground hover:text-link hover:underline"
      >
        {product.name}
      </Link>

      <StarRating rating={product.rating} reviewCount={product.reviewCount} />

      {product.discountPercent && original ? (
        <p className="flex flex-wrap items-baseline gap-1">
          <span className="text-[19px] font-medium text-price-red">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-[12px] text-muted line-through">
            {formatPrice(original, product.currency)}
          </span>
        </p>
      ) : (
        <p className="text-[19px] font-medium text-foreground">
          {formatPrice(product.price, product.currency)}
        </p>
      )}

      <AddToCartButton product={product} className="mt-auto w-full" />
    </div>
  );
}
