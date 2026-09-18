import catalog from "../../data/products.json";
import type { Product, ProductFilters } from "./types";

const PRODUCTS = catalog as Product[];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getCategories(): string[] {
  return Array.from(new Set(PRODUCTS.map((p) => p.category))).sort();
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

function matchesAttributeFilters(
  product: Product,
  attributes: NonNullable<ProductFilters["attributes"]>
): boolean {
  for (const [key, selected] of Object.entries(attributes)) {
    if (!selected || selected.length === 0) continue;
    const value = product[key as keyof Product];
    if (Array.isArray(value)) {
      if (!value.some((v) => selected.includes(v))) return false;
    } else if (typeof value === "string") {
      if (!selected.includes(value)) return false;
    } else {
      // Product doesn't carry this attribute at all (wrong category) — no match.
      return false;
    }
  }
  return true;
}

export function filterProducts(
  filters: ProductFilters,
  products: Product[] = PRODUCTS
): Product[] {
  return products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
    if (filters.minRating !== undefined && p.rating < filters.minRating) return false;
    if (filters.onDeal && !p.discountPercent) return false;
    if (filters.attributes && !matchesAttributeFilters(p, filters.attributes)) return false;
    return true;
  });
}

/**
 * Available option values for one attribute facet within a category —
 * derived from the real product data (not hardcoded lists that might not
 * match what's actually in stock), sorted alphabetically.
 */
export function getAttributeOptions(
  category: string,
  key: keyof Product
): string[] {
  const values = new Set<string>();
  for (const p of PRODUCTS) {
    if (p.category !== category) continue;
    const value = p[key];
    if (Array.isArray(value)) {
      value.forEach((v) => values.add(v));
    } else if (typeof value === "string") {
      values.add(value);
    }
  }
  return Array.from(values).sort();
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "newest";

/**
 * "newest" sorts by catalog id descending — the mock data has no real
 * creation timestamp, so this is a documented stand-in rather than a fake
 * date field.
 */
export function sortProducts(products: Product[], sort?: SortOption): Product[] {
  if (!sort || sort === "featured") return products;
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.sort((a, b) => b.id.localeCompare(a.id));
    default:
      return sorted;
  }
}

export interface ProductQuery extends ProductFilters {
  q?: string;
  sort?: SortOption;
}

export function queryProducts(query: ProductQuery): Product[] {
  const base = query.q ? searchProducts(query.q) : PRODUCTS;
  return sortProducts(filterProducts(query, base), query.sort);
}
