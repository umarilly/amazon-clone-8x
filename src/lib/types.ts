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
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}
