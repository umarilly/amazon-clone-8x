import { HeaderSkeleton } from "@/components/skeletons/HeaderSkeleton";
import { ProductCardSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { Skeleton } from "@/components/skeletons/Skeleton";
import { getAllProducts, getCategories } from "@/lib/products";

export default function Home() {
  const productCount = getAllProducts().length;
  const categoryCount = getCategories().length;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HeaderSkeleton />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
        <Skeleton className="h-40 w-full sm:h-56" />

        <section className="flex flex-col gap-4">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 px-4 py-6 text-center text-sm text-gray-500 sm:px-6">
        Scaffold online — {productCount} mock products loaded across{" "}
        {categoryCount} categories. Homepage layout ships in the next
        milestone.
      </footer>
    </div>
  );
}
