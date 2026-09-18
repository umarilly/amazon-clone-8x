import Link from "next/link";
import Image from "next/image";
import { StarRating } from "@/components/product/StarRating";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

function estimatedDeliveryDate(seed: string): string {
  const offset = 3 + (seed.charCodeAt(seed.length - 1) % 4);
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function ProductListRow({
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
  const savings = original ? original - product.price : 0;

  return (
    <div className="flex flex-col gap-4 border-b border-gray-100 py-5 first:pt-0 sm:flex-row sm:gap-6">
      <Link
        href={`/product/${product.slug}`}
        className="relative h-[190px] w-full shrink-0 overflow-hidden bg-gray-50 sm:w-[155px]"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes="(max-width: 640px) 100vw, 155px"
          className="object-contain"
        />
        {outOfStock && (
          <span className="absolute left-2 top-2 rounded bg-white/95 px-2 py-0.5 text-xs font-medium text-muted">
            Out of stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5">
        <span className="flex items-center gap-1 text-[11px] text-muted">
          Sponsored
          {/* eslint-disable-next-line @next/next/no-img-element -- local vector icon */}
          <img src="/figma-icons/info.svg" alt="" className="h-[11px] w-[11px]" />
        </span>

        <Link
          href={`/product/${product.slug}`}
          className="text-[18px] text-foreground hover:text-link hover:underline"
        >
          {product.name}
        </Link>

        <StarRating
          rating={product.rating}
          reviewCount={product.reviewCount}
          href={`/product/${product.slug}#reviews`}
        />

        {product.discountPercent && original ? (
          <p className="flex flex-wrap items-baseline gap-1.5">
            <span className="text-[21px] font-medium text-price-red">
              {formatPrice(product.price, product.currency)}
            </span>
            <span className="text-[13px] text-muted line-through">
              {formatPrice(original, product.currency)}
            </span>
            <span className="text-[14px] text-foreground">
              Save {formatPrice(savings, product.currency)} ({product.discountPercent}%)
            </span>
          </p>
        ) : (
          <p className="text-[21px] font-medium text-foreground">
            {formatPrice(product.price, product.currency)}
          </p>
        )}

        {!outOfStock && (
          <>
            <p className="text-[14px] text-muted">
              Get it by{" "}
              <span className="font-bold text-foreground">
                {estimatedDeliveryDate(product.id)}
              </span>
            </p>
            <p className="text-[14px] text-muted">FREE Delivery by Amazon Clone</p>
          </>
        )}

        {!outOfStock && product.stock <= 5 && (
          <p className="text-[14px] text-price-red">
            Only {product.stock} left in stock
          </p>
        )}

        <AddToCartButton product={product} className="mt-1 w-fit px-4 py-1.5" />
      </div>
    </div>
  );
}
