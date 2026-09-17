import { ProductCard } from "@/components/product/ProductCard";
import { slugify } from "@/components/layout/CategoryNav";
import type { Product } from "@/lib/types";

export function ProductRail({
  category,
  products,
}: {
  category: string;
  products: Product[];
}) {
  return (
    <section
      id={slugify(category)}
      aria-labelledby={`${slugify(category)}-heading`}
      className="scroll-mt-32"
    >
      <h2
        id={`${slugify(category)}-heading`}
        className="mb-3 text-xl font-bold text-foreground"
      >
        {category}
      </h2>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
        {products.map((product) => (
          <div key={product.id} className="w-40 shrink-0 sm:w-auto">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
