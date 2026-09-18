"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { CATEGORY_FILTER_SCHEMA } from "@/lib/filterSchema";
import { getAttributeOptions } from "@/lib/products";
import { useLanguage } from "@/lib/preferences";

const RATING_OPTIONS = [4, 3, 2, 1];

const checkboxClass =
  "h-4 w-4 shrink-0 rounded-[4px] border-[#898c8c] accent-[#c45500]";

function RatingStars({ filled }: { filled: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        // eslint-disable-next-line @next/next/no-img-element -- local vector icon
        <img
          key={i}
          src={
            i <= filled
              ? "/figma-icons/star-filled-sidebar.svg"
              : "/figma-icons/star-empty.svg"
          }
          alt=""
          className="h-5 w-5"
        />
      ))}
    </span>
  );
}

export function SearchFilters({ categories }: { categories: string[] }) {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "";
  const activeMinRating = searchParams.get("minRating") ?? "";
  const dealsOnly = searchParams.get("deals") === "1";
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brandQuery, setBrandQuery] = useState("");

  // Category-specific attribute facets — only meaningful once a single
  // category is selected (see lib/filterSchema.ts for why).
  const attributeFields = activeCategory ? CATEGORY_FILTER_SCHEMA[activeCategory] : undefined;

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
    // Switching category invalidates any attribute facets from the
    // previous category (they're category-specific and wouldn't apply).
    const params = new URLSearchParams(searchParams.toString());
    const nextCategory = category === activeCategory ? undefined : category;
    if (nextCategory) {
      params.set("category", nextCategory);
    } else {
      params.delete("category");
    }
    for (const key of Array.from(params.keys())) {
      if (key.startsWith("f_")) params.delete(key);
    }
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleRatingClick(rating: number) {
    navigate({
      minRating: String(rating) === activeMinRating ? undefined : String(rating),
    });
  }

  function handleDealsToggle() {
    navigate({ deals: dealsOnly ? undefined : "1" });
  }

  function handlePriceSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate({ minPrice: minPrice || undefined, maxPrice: maxPrice || undefined });
  }

  function handleAttributeToggle(paramKey: string, value: string) {
    const current = searchParams.get(paramKey);
    const selected = current ? current.split(",").filter(Boolean) : [];
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    navigate({ [paramKey]: next.length ? next.join(",") : undefined });
  }

  const hasFilters =
    activeCategory ||
    activeMinRating ||
    dealsOnly ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice") ||
    Array.from(searchParams.keys()).some((k) => k.startsWith("f_"));

  return (
    <aside className="w-full shrink-0 sm:w-[250px]">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="flex items-center gap-1.5 font-bold text-foreground sm:hidden"
        >
          {t("filters")}
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
        <h2 className="hidden font-bold text-foreground sm:block">{t("filters")}</h2>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              const q = params.get("q");
              router.push(`${pathname}${q ? `?q=${encodeURIComponent(q)}` : ""}`);
            }}
            className="text-sm text-link hover:underline"
          >
            {t("clearAll")}
          </button>
        )}
      </div>

      <div
        className={`${mobileOpen ? "flex" : "hidden"} mt-4 flex-col gap-5 sm:mt-6 sm:flex`}
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-[14px] font-bold text-black">{t("department")}</h3>
          <ul className="flex flex-col">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category)}
                    aria-pressed={isActive}
                    className={`py-0.5 text-left text-[14px] hover:underline ${
                      isActive ? "font-bold text-black" : "text-black"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-[14px] font-bold text-black">{t("customerReview")}</h3>
          <ul className="flex flex-col gap-1">
            {RATING_OPTIONS.map((rating) => {
              const isActive = String(rating) === activeMinRating;
              return (
                <li key={rating}>
                  <button
                    type="button"
                    onClick={() => handleRatingClick(rating)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-1 ${isActive ? "underline" : ""}`}
                  >
                    <RatingStars filled={rating} />
                    <span className="text-[14px] text-[#333]">&amp; Up</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {attributeFields?.map((field) => {
          const allOptions = getAttributeOptions(activeCategory, field.key);
          if (allOptions.length === 0) return null;
          const paramKey = `f_${field.key}`;
          const selected = (searchParams.get(paramKey) ?? "")
            .split(",")
            .filter(Boolean);
          const isBrand = field.key === "brand";
          const options =
            isBrand && brandQuery.trim()
              ? allOptions.filter((o) =>
                  o.toLowerCase().includes(brandQuery.trim().toLowerCase())
                )
              : allOptions;

          return (
            <div key={field.key} className="flex flex-col gap-1">
              <h3 className="text-[14px] font-bold text-black">{field.label}</h3>

              {isBrand && (
                <div className="relative mb-1 h-[30px] w-full max-w-[250px] overflow-hidden rounded-[4px] border border-[#898c8c] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local vector icon */}
                  <img
                    src="/figma-icons/search-sidebar.svg"
                    alt=""
                    className="pointer-events-none absolute left-[15px] top-1/2 h-4 w-4 -translate-y-1/2"
                  />
                  <input
                    type="text"
                    value={brandQuery}
                    onChange={(e) => setBrandQuery(e.target.value)}
                    placeholder="Search"
                    aria-label="Search brands"
                    className="h-full w-full bg-transparent pl-[39px] pr-2 text-[14px] outline-none placeholder:text-[#a3a3a3]"
                  />
                </div>
              )}

              <ul className="flex flex-col gap-1.5">
                {options.map((option) => (
                  <li key={option}>
                    <label className="flex items-center gap-2 text-[14px] text-black">
                      <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        onChange={() => handleAttributeToggle(paramKey, option)}
                        className={checkboxClass}
                      />
                      <span className="line-clamp-1">{option}</span>
                    </label>
                  </li>
                ))}
                {options.length === 0 && (
                  <li className="text-[13px] text-muted">No matches</li>
                )}
              </ul>
            </div>
          );
        })}

        <div className="flex flex-col gap-1">
          <h3 className="text-[14px] font-bold text-black">{t("price")}</h3>
          <form onSubmit={handlePriceSubmit} className="flex items-center gap-1.5">
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
              className="h-[31px] w-[65px] rounded-[4px] border border-[#898c8c] px-2 text-[14px]"
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
              className="h-[31px] w-[65px] rounded-[4px] border border-[#898c8c] px-2 text-[14px]"
            />
            <button
              type="submit"
              className="h-[31px] rounded-[8px] border border-[#c9cccc] px-3 text-[11px] shadow-sm hover:bg-gray-50"
            >
              Go
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-[14px] font-bold text-black">{t("deals")}</h3>
          <label className="flex items-center gap-2 text-[14px] text-black">
            <input
              type="checkbox"
              checked={dealsOnly}
              onChange={handleDealsToggle}
              className={checkboxClass}
            />
            {t("todaysDeals")}
          </label>
        </div>
      </div>
    </aside>
  );
}
