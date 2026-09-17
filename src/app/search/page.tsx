import { ProductGrid } from "@/components/product/ProductGrid";
import { EmptyResults } from "@/components/search/EmptyResults";
import { SearchFilters } from "@/components/search/SearchFilters";
import { getCategories, queryProducts } from "@/lib/products";

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseNumber(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const params = await searchParams;

  const q = firstValue(params.q)?.trim() || undefined;
  const category = firstValue(params.category) || undefined;
  const minPrice = parseNumber(firstValue(params.minPrice));
  const maxPrice = parseNumber(firstValue(params.maxPrice));
  const minRating = parseNumber(firstValue(params.minRating));

  const categories = getCategories();
  const results = queryProducts({ q, category, minPrice, maxPrice, minRating });

  const heading = q
    ? `Results for "${q}"`
    : category
      ? category
      : "All Products";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:flex-row sm:px-6">
      <SearchFilters categories={categories} />

      <div className="flex flex-1 flex-col gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">{heading}</h1>
          <p className="text-sm text-muted">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
        </div>

        {results.length === 0 ? (
          <EmptyResults query={q} />
        ) : (
          <ProductGrid products={results} />
        )}
      </div>
    </main>
  );
}
