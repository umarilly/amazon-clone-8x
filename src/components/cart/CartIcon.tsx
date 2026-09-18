"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";

export function CartIcon() {
  const { itemCount } = useCart();
  const [bump, setBump] = useState(false);
  const previousCount = useRef(itemCount);

  useEffect(() => {
    if (itemCount > previousCount.current) {
      setBump(true);
      const timeout = window.setTimeout(() => setBump(false), 300);
      previousCount.current = itemCount;
      return () => window.clearTimeout(timeout);
    }
    previousCount.current = itemCount;
  }, [itemCount]);

  return (
    <Link
      href="/cart"
      className="relative flex shrink-0 items-center gap-1 rounded-sm border border-transparent px-2 py-1 hover:border-white"
      aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-7 w-7 fill-current transition-transform duration-300 ${bump ? "scale-125" : "scale-100"}`}
      >
        <path d="M7 4h-2l-1 2v1h2l3.6 7.59-1.35 2.44A2 2 0 0 0 10 20h9v-2h-9l1.1-2h6.45a2 2 0 0 0 1.75-1.03L22 8H6.21l-.94-2H7V4Zm1 15a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm9 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z" />
      </svg>
      <span
        className={`absolute -top-0.5 left-3 text-base font-bold text-cart-badge transition-transform duration-300 ${bump ? "scale-125" : "scale-100"}`}
      >
        {itemCount}
      </span>
      <span className="hidden font-bold sm:inline">Cart</span>
    </Link>
  );
}
