"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MAX_CART_QUANTITY } from "./constants";
import type { CartItem } from "./types";

const STORAGE_KEY = "amazon-clone-cart";

function clampQuantity(quantity: number, stock: number): number {
  const maxQuantity = Math.min(stock, MAX_CART_QUANTITY);
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(Math.max(Math.trunc(quantity), 1), Math.max(maxQuantity, 1));
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // localStorage isn't available on the server, so the cart must
        // render empty on both the server and the initial client pass
        // (to match) and only load the persisted cart after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // Corrupted or unavailable storage — start with an empty cart.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage may be full or unavailable (e.g. private browsing) — ignore.
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (product: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.slug === product.slug);
        if (existing) {
          return current.map((item) =>
            item.slug === product.slug
              ? {
                  ...item,
                  quantity: clampQuantity(item.quantity + quantity, item.stock),
                }
              : item
          );
        }
        return [
          ...current,
          { ...product, quantity: clampQuantity(quantity, product.stock) },
        ];
      });
    },
    []
  );

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.slug === slug
          ? { ...item, quantity: clampQuantity(quantity, item.stock) }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      hydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      hydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { clampQuantity };
