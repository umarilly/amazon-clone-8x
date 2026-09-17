"use client";

import { useState } from "react";

const MAX_QUANTITY_CAP = 10;

export function BuyBox({ stock }: { stock: number }) {
  const outOfStock = stock <= 0;
  const maxQuantity = Math.min(stock, MAX_QUANTITY_CAP);
  const [quantity, setQuantity] = useState<number | "">(1);

  function clamp(value: number): number {
    if (!Number.isFinite(value)) return 1;
    return Math.min(Math.max(Math.trunc(value), 1), maxQuantity);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (raw === "") {
      setQuantity("");
      return;
    }
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    setQuantity(clamp(parsed));
  }

  function handleBlur() {
    setQuantity((current) => (current === "" ? 1 : clamp(current)));
  }

  function step(delta: number) {
    setQuantity((current) => clamp((current === "" ? 1 : current) + delta));
  }

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
        <label htmlFor="quantity" className="text-sm text-foreground">
          Qty:
        </label>
        <div className="flex items-center overflow-hidden rounded-md border border-gray-300">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Decrease quantity"
            className="px-2.5 py-1 text-foreground hover:bg-gray-50"
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            inputMode="numeric"
            min={1}
            max={maxQuantity}
            value={quantity}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-12 border-x border-gray-300 py-1 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Increase quantity"
            className="px-2.5 py-1 text-foreground hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-full border border-cta-border/10 bg-cta px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:brightness-95"
      >
        Add to Cart
      </button>
    </div>
  );
}
