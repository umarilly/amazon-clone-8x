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

export function filterProducts(
  filters: ProductFilters,
  products: Product[] = PRODUCTS
): Product[] {
  return products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
    if (filters.minRating !== undefined && p.rating < filters.minRating) return false;
    return true;
  });
}

export interface ProductQuery extends ProductFilters {
  q?: string;
}

export function queryProducts(query: ProductQuery): Product[] {
  const base = query.q ? searchProducts(query.q) : PRODUCTS;
  return filterProducts(query, base);
}
