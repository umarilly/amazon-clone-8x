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

  const bestSellers = [...allProducts]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 10);

  return (
    <>
      <HeroBanner productsByCategory={productsByCategory} />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-10 px-4 py-8 sm:px-10">
        <ProductRail
          category="Best Sellers"
          products={bestSellers}
          seeAllHref="/search"
          priorityFirst
        />

        {productsByCategory.map(({ category, products }) => (
          <ProductRail key={category} category={category} products={products} />
        ))}
      </main>
    </>
  );
}
