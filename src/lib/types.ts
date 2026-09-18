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

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}
