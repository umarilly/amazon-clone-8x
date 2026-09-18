"use client";

import { useState } from "react";
import { QuantityInput } from "@/components/cart/QuantityInput";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { Product } from "@/lib/types";

export function BuyBox({ product }: { product: Product }) {
  const { stock } = product;
  const outOfStock = stock <= 0;
  const [quantity, setQuantity] = useState(1);

  if (outOfStock) {
    return (
      <div className="flex flex-col gap-3">
        <p className="font-medium text-red-700">Currently out of stock</p>
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-muted"
        >
          Out of Stock
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium text-green-700">
        {stock <= 5 ? `Only ${stock} left in stock` : "In Stock"}
      </p>

      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground">Qty:</span>
        <QuantityInput quantity={quantity} stock={stock} onChange={setQuantity} />
      </div>

      <AddToCartButton
        product={product}
        quantity={quantity}
        className="w-full px-4 py-2"
      />
    </div>
  );
}
