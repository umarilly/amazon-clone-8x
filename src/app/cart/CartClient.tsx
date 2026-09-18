"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useLanguage } from "@/lib/preferences";
import { formatPrice } from "@/lib/format";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { EmptyCart } from "@/components/cart/EmptyCart";

export function CartClient() {
  const { items, itemCount, subtotal } = useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6">
        <h1 className="mb-6 text-xl font-bold text-foreground">
          {t("shoppingCart")}
        </h1>
        <EmptyCart />
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:flex-row sm:px-6">
      <div className="flex-1">
        <h1 className="mb-4 text-xl font-bold text-foreground">
          {t("shoppingCart")}
        </h1>
        <ul>
          {items.map((item) => (
            <CartItemRow key={item.slug} item={item} />
          ))}
        </ul>
      </div>

      <aside className="flex w-full shrink-0 flex-col gap-3 rounded-lg border border-gray-200 p-4 sm:w-64">
        <p className="text-lg">
          {t("subtotal")} ({itemCount} {itemCount === 1 ? "item" : "items"}):{" "}
          <span className="font-bold text-foreground">
            {formatPrice(subtotal)}
          </span>
        </p>
        <Link
          href="/checkout"
          className="w-full rounded-full border border-cta-border/10 bg-cta px-4 py-2 text-center text-sm font-medium text-foreground shadow-sm hover:brightness-95"
        >
          {t("proceedToCheckout")}
        </Link>
        <Link
          href="/"
          className="text-center text-sm text-link hover:underline"
        >
          {t("continueShopping")}
        </Link>
      </aside>
    </main>
  );
}
