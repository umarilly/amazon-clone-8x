import { HeroBanner } from "@/components/home/HeroBanner";
import { ProductRail } from "@/components/home/ProductRail";
import { getAllProducts, getCategories } from "@/lib/products";

export default function Home() {
  const categories = getCategories();
  const allProducts = getAllProducts();

  const productsByCategory = categories.map((category) => ({
    category,
    products: allProducts.filter((p) => p.category === category),
  }));

  const teasers = productsByCategory.map(({ category, products }) => ({
    category,
    product: products[0],
  }));

  return (
    <>
      <HeroBanner teasers={teasers} />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-8 sm:px-6">
        {productsByCategory.map(({ category, products }) => (
          <ProductRail key={category} category={category} products={products} />
        ))}
      </main>
    </>
  );
}
