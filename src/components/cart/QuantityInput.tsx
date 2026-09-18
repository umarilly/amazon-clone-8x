"use client";

import { useState } from "react";
import { MAX_CART_QUANTITY } from "@/lib/constants";
import { clampQuantity } from "@/lib/cart";

export function QuantityInput({
  quantity,
  stock,
  onChange,
  size = "md",
}: {
  quantity: number;
  stock: number;
  onChange: (quantity: number) => void;
  size?: "sm" | "md";
}) {
  const maxQuantity = Math.min(stock, MAX_CART_QUANTITY);
  const padding = size === "sm" ? "px-2 py-0.5" : "px-2.5 py-1";
  const [text, setText] = useState(String(quantity));

  // Keep the field in sync when quantity changes from outside (e.g. the
  // +/- buttons, or another tab updating the same cart via localStorage).
  // Adjusted during render (React's documented pattern for this) rather
  // than in an effect, so it applies before paint with no extra render.
  const [renderedQuantity, setRenderedQuantity] = useState(quantity);
  if (quantity !== renderedQuantity) {
    setRenderedQuantity(quantity);
    setText(String(quantity));
  }

  function commit(value: number) {
    onChange(clampQuantity(value, stock));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setText(raw);
    if (raw === "") return; // allow a transient empty field while editing
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    commit(parsed);
  }

  function handleBlur() {
    if (text === "" || Number.isNaN(Number(text))) {
      commit(1);
    }
  }

  function step(delta: number) {
    commit(quantity + delta);
  }

  return (
    <div className="flex items-center overflow-hidden rounded-md border border-gray-300">
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Decrease quantity"
        className={`${padding} text-foreground hover:bg-gray-50`}
      >
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={maxQuantity}
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-label="Quantity"
        className="w-12 border-x border-gray-300 py-1 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Increase quantity"
        className={`${padding} text-foreground hover:bg-gray-50`}
      >
        +
      </button>
    </div>
  );
}
