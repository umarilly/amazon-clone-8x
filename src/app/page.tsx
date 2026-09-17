import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
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
    <div id="top" className="flex min-h-screen flex-col bg-white">
      <Header />
      <CategoryNav categories={categories} />
      <HeroBanner teasers={teasers} />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-8 sm:px-6">
        {productsByCategory.map(({ category, products }) => (
          <ProductRail key={category} category={category} products={products} />
        ))}
      </main>

      <footer className="border-t border-gray-200 px-4 py-6 text-center text-sm text-muted sm:px-6">
        Amazon Clone — a 24-hour take-home demo. Not affiliated with
        Amazon.com. All products, prices, and reviews are mock data.
      </footer>
    </div>
  );
}
