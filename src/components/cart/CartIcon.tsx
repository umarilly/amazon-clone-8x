"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/preferences";

export function CartIcon() {
  const { itemCount } = useCart();
  const { t } = useLanguage();
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
      <span className="relative block h-9 w-9">
        {/* eslint-disable-next-line @next/next/no-img-element -- local vector icon */}
        <img
          src="/figma-icons/cart.svg"
          alt=""
          className={`h-full w-full transition-transform duration-300 ${bump ? "scale-125" : "scale-100"}`}
        />
        <span
          className={`absolute left-[53%] top-[31%] -translate-x-1/2 -translate-y-1/2 text-sm font-bold leading-none text-cart-badge transition-transform duration-300 ${bump ? "scale-125" : "scale-100"}`}
        >
          {itemCount}
        </span>
      </span>
      <span className="hidden font-bold sm:inline">{t("cart")}</span>
    </Link>
  );
}
