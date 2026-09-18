"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { SortOption } from "@/lib/products";
import { useLanguage } from "@/lib/preferences";

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "rating-desc": "Avg. Customer Review",
  newest: "Newest Arrival",
};

const SORT_OPTIONS = Object.keys(SORT_LABELS) as SortOption[];

export function SortBar() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSort = (searchParams.get("sort") as SortOption | null) ?? "featured";

  function selectSort(sort: SortOption) {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-gray-100 pb-3 text-[14px]">
      <span className="font-bold text-foreground">{t("sortBy")}</span>
      {SORT_OPTIONS.map((option) => {
        const isActive = option === activeSort;
        return (
          <button
            key={option}
            type="button"
            onClick={() => selectSort(option)}
            aria-pressed={isActive}
            className={isActive ? "text-link" : "text-foreground hover:underline"}
          >
            {SORT_LABELS[option]}
          </button>
        );
      })}
    </div>
  );
}
