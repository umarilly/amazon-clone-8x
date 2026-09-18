import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { ScrollableRow } from "./ScrollableRow";
import { slugify } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductRail({
  category,
  products,
  seeAllHref,
  priorityFirst = false,
}: {
  category: string;
  products: Product[];
  seeAllHref?: string;
  priorityFirst?: boolean;
}) {
  const href = seeAllHref ?? `/search?category=${encodeURIComponent(category)}`;

  return (
    <section id={slugify(category)} aria-labelledby={`${slugify(category)}-heading`}>
      <div className="mb-3 flex flex-col gap-0.5">
        <h2 id={`${slugify(category)}-heading`} className="text-xl font-bold text-foreground">
          {category}
        </h2>
        <Link href={href} className="text-sm text-link hover:underline">
          See all
        </Link>
      </div>
      <ScrollableRow>
        {products.map((product, i) => (
          <div key={product.id} className="w-40 shrink-0 sm:w-48">
            <ProductCard product={product} priority={priorityFirst && i === 0} />
          </div>
        ))}
      </ScrollableRow>
    </section>
  );
}
