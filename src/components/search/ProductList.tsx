import { ProductListRow } from "./ProductListRow";
import type { Product } from "@/lib/types";

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-col">
      {products.map((product, i) => (
        <ProductListRow key={product.id} product={product} priority={i === 0} />
      ))}
    </div>
  );
}
