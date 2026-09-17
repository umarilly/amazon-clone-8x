"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

const RATING_OPTIONS = [4, 3, 2, 1];

export function SearchFilters({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "";
  const activeMinRating = searchParams.get("minRating") ?? "";
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  function navigate(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleCategoryClick(category: string) {
    navigate({ category: category === activeCategory ? undefined : category });
  }

  function handleRatingClick(rating: number) {
    navigate({
      minRating: String(rating) === activeMinRating ? undefined : String(rating),
    });
  }

  function handlePriceSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate({ minPrice: minPrice || undefined, maxPrice: maxPrice || undefined });
  }

  const hasFilters =
    activeCategory ||
    activeMinRating ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice");

  return (
    <aside className="w-full shrink-0 sm:w-56">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="flex items-center gap-1.5 font-bold text-foreground sm:hidden"
        >
          Filters
          <svg
            viewBox="0 0 20 20"
            className={`h-4 w-4 fill-current transition-transform ${mobileOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M5.5 7.5l4.5 4.5 4.5-4.5"
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className="hidden font-bold text-foreground sm:block">Filters</h2>
        {hasFilters && (
          <button
            type="button"
            onClick={() =>
              navigate({
                category: undefined,
                minRating: undefined,
                minPrice: undefined,
                maxPrice: undefined,
              })
            }
            className="text-sm text-link hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <div
        className={`${mobileOpen ? "flex" : "hidden"} mt-4 flex-col gap-6 sm:mt-6 sm:flex`}
      >
        <div>
          <h3 className="mb-2 text-sm font-bold text-foreground">Category</h3>
          <ul className="flex flex-col gap-1.5">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                    aria-pressed={isActive}
                    className={`text-left text-sm hover:underline ${
                      isActive ? "font-bold text-foreground" : "text-link"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-bold text-foreground">Price</h3>
          <form onSubmit={handlePriceSubmit} className="flex items-center gap-2">
            <label className="sr-only" htmlFor="minPrice">
              Minimum price
            </label>
            <input
              id="minPrice"
              type="number"
              min={0}
              inputMode="decimal"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
            />
            <span className="text-muted">–</span>
            <label className="sr-only" htmlFor="maxPrice">
              Maximum price
            </label>
            <input
              id="maxPrice"
              type="number"
              min={0}
              inputMode="decimal"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-16 rounded border border-gray-300 px-2 py-1 text-sm"
            />
            <button
              type="submit"
              className="rounded border border-gray-300 px-2 py-1 text-sm hover:bg-gray-50"
            >
              Go
            </button>
          </form>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-bold text-foreground">Customer Rating</h3>
          <ul className="flex flex-col gap-1.5">
            {RATING_OPTIONS.map((rating) => {
              const isActive = String(rating) === activeMinRating;
              return (
                <li key={rating}>
                  <button
                    type="button"
                    onClick={() => handleRatingClick(rating)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-1 text-sm hover:underline ${
                      isActive ? "font-bold text-foreground" : "text-link"
                    }`}
                  >
                    <span className="text-star">{"★".repeat(rating)}</span>
                    <span className="text-gray-300">{"★".repeat(5 - rating)}</span>
                    <span>&amp; Up</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
