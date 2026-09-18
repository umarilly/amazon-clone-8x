export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  description: string;
  tags: string[];
  // Category-specific filterable attributes. Not every product sets every
  // field — which ones apply depends on the category (see
  // lib/filterSchema.ts), same as real Amazon's per-category facets.
  brand?: string;
  color?: string;
  material?: string;
  connectivity?: string;
  itemForm?: string;
  skinType?: string;
  ageRange?: string;
  format?: string;
  language?: string;
  genre?: string;
  specialFeatures?: string[];
  includedComponents?: string[];
  /** Percent off, e.g. 20 for 20% off. Undefined/0 means no active deal. */
  discountPercent?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface CartItem {
  slug: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  stock: number;
  quantity: number;
}

export interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
}

export interface Order {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  address: Address;
}

/** Attribute keys that support category-specific faceted filtering. */
export type AttributeFilterKey =
  | "brand"
  | "color"
  | "material"
  | "connectivity"
  | "itemForm"
  | "skinType"
  | "ageRange"
  | "format"
  | "language"
  | "genre"
  | "specialFeatures"
  | "includedComponents";

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  onDeal?: boolean;
  /** e.g. { brand: ["AuraWave", "DriftPod"], color: ["Black"] } */
  attributes?: Partial<Record<AttributeFilterKey, string[]>>;
}
