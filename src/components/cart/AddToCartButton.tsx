"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/preferences";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  quantity = 1,
  className = "",
}: {
  product: Product;
  quantity?: number;
  className?: string;
}) {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [justAdded, setJustAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  function handleClick() {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        price: product.price,
        currency: product.currency,
        stock: product.stock,
      },
      quantity
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <button
      type="button"
      disabled={outOfStock}
      onClick={handleClick}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm transition-colors disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-muted disabled:shadow-none disabled:hover:brightness-100 ${
        justAdded
          ? "border-green-700/10 bg-green-600 text-white"
          : "border-cta-border/10 bg-cta text-foreground hover:brightness-95"
      } ${className}`}
    >
      {outOfStock ? t("outOfStock") : justAdded ? `${t("added")} ✓` : t("addToCart")}
    </button>
  );
}
