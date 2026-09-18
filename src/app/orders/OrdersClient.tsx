"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getOrderHistory } from "@/lib/orders";
import { formatPrice } from "@/lib/format";
import { useLanguage } from "@/lib/preferences";
import type { Order } from "@/lib/types";

export function OrdersClient() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    // Reading order history from localStorage can't happen during
    // SSR/first paint, same pattern as the cart/confirmation pages.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(getOrderHistory());
  }, []);

  if (orders === null) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-sm text-muted">
        Loading your orders…
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-foreground">{t("yourOrders")}</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 py-16 text-center">
          <p className="text-sm text-muted">{t("noOrdersYet")}</p>
          <Link
            href="/"
            className="rounded-full bg-cta px-4 py-2 text-sm font-medium text-foreground hover:brightness-95"
          >
            {t("startShopping")}
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {orders.map((order) => {
            const itemCount = order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
            return (
              <li
                key={order.orderNumber}
                className="rounded-lg border border-gray-200 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 text-xs text-muted">
                  <span>
                    Order placed{" "}
                    <span className="font-medium text-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </span>
                  <span>
                    Total{" "}
                    <span className="font-medium text-foreground">
                      {formatPrice(order.subtotal)}
                    </span>
                  </span>
                  <span>
                    Order #{" "}
                    <span className="font-medium text-foreground">
                      {order.orderNumber}
                    </span>
                  </span>
                </div>
                <ul className="mt-3 flex flex-col gap-1 text-sm text-foreground">
                  {order.items.map((item) => (
                    <li key={item.slug} className="flex justify-between gap-2">
                      <span className="truncate">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="shrink-0 text-muted">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
