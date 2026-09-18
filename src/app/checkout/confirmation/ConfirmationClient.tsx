"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLastOrder } from "@/lib/orders";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart";
import type { Order } from "@/lib/types";

export function ConfirmationClient() {
  const { clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Reading the mock order from localStorage can't happen during
    // SSR/first paint, so it has to be deferred to an effect. The cart is
    // cleared here (once we know an order actually exists) rather than on
    // the checkout page, so leaving checkout mid-navigation never empties
    // the cart while checkout's own empty-cart guard could still see it.
    const lastOrder = getLastOrder();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(lastOrder);
    setChecked(true);
    if (lastOrder) clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) return null;

  if (!order) {
    return (
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-3 px-4 py-24 text-center">
        <h1 className="text-lg font-bold text-foreground">
          We don&apos;t have a recent order to show
        </h1>
        <p className="max-w-sm text-sm text-muted">
          This page only shows your most recent order, and only in the
          browser you placed it from. Head back to the homepage to keep
          shopping.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-full border border-cta-border/20 bg-cta px-4 py-2 text-sm font-medium text-foreground hover:brightness-95"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <svg
          viewBox="0 0 24 24"
          className="h-12 w-12 fill-none stroke-green-600"
          strokeWidth={1.5}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1 className="text-xl font-bold text-foreground">
          Order placed, thank you!
        </h1>
        <p className="text-sm text-muted">
          Order # <span className="font-medium text-foreground">{order.orderNumber}</span>
        </p>
      </div>

      <section className="rounded-lg border border-gray-200 p-4">
        <h2 className="mb-2 text-sm font-bold text-foreground">
          Shipping to
        </h2>
        <p className="text-sm text-foreground">
          {order.address.fullName}
          <br />
          {order.address.addressLine1}
          {order.address.addressLine2 ? <>, {order.address.addressLine2}</> : null}
          <br />
          {order.address.city}, {order.address.state} {order.address.zip}
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between text-sm text-foreground">
          <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
          <span className="font-bold">{formatPrice(order.subtotal)}</span>
        </div>
      </section>

      <p className="text-center text-xs text-muted">
        This is a mock order for a demo project, no real payment was
        processed and nothing will be shipped.
      </p>

      <Link
        href="/"
        className="self-center rounded-full border border-cta-border/20 bg-cta px-6 py-2 text-sm font-medium text-foreground hover:brightness-95"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
