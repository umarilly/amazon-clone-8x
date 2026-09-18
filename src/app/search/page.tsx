import { ProductList } from "@/components/search/ProductList";
import { SortBar } from "@/components/search/SortBar";
import { EmptyResults } from "@/components/search/EmptyResults";
import { SearchFilters } from "@/components/search/SearchFilters";
import { ResultsCount } from "@/components/search/ResultsCount";
import { CATEGORY_FILTER_SCHEMA } from "@/lib/filterSchema";
import { getCategories, queryProducts, type SortOption } from "@/lib/products";
import type { AttributeFilterKey } from "@/lib/types";

const SORT_OPTIONS: SortOption[] = [
  "featured",
  "price-asc",
  "price-desc",
  "rating-desc",
  "newest",
];

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
  const onDeal = firstValue(params.deals) === "1";
  const sortRaw = firstValue(params.sort);
  const sort = SORT_OPTIONS.includes(sortRaw as SortOption)
    ? (sortRaw as SortOption)
    : "featured";

  // Attribute facets (f_brand=A,B / f_color=Black) only apply — and only
  // render in the sidebar — once a single category is selected, since the
  // fields themselves are category-specific.
  const fields = category ? CATEGORY_FILTER_SCHEMA[category] : undefined;
  const attributes: Partial<Record<AttributeFilterKey, string[]>> = {};
  if (fields) {
    for (const field of fields) {
      const raw = firstValue(params[`f_${field.key}`]);
      if (raw) attributes[field.key] = raw.split(",").filter(Boolean);
    }
  }

  const categories = getCategories();
  const results = queryProducts({
    q,
    category,
    minPrice,
    maxPrice,
    minRating,
    onDeal,
    sort,
    attributes: Object.keys(attributes).length ? attributes : undefined,
  });

  const heading = q ? `Results` : category ? category : "All Products";

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 py-4 sm:px-10">
      <h1 className="sr-only">{heading}</h1>
      <ResultsCount count={results.length} query={q} />

      <main className="flex flex-1 flex-col gap-6 pt-4 sm:flex-row">
        <SearchFilters categories={categories} />

        <div className="flex flex-1 flex-col gap-4">
          <SortBar />

          {results.length === 0 ? (
            <EmptyResults query={q} />
          ) : (
            <ProductList products={results} />
          )}
        </div>
      </main>
    </div>
  );
}
