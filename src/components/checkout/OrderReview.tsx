"use client";

import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import type { Address, CartItem } from "@/lib/types";

export function OrderReview({
  address,
  items,
  subtotal,
  onBack,
  onPlaceOrder,
}: {
  address: Address;
  items: CartItem[];
  subtotal: number;
  onBack: () => void;
  onPlaceOrder: () => void;
}) {
  const [placing, setPlacing] = useState(false);

  function handlePlaceOrder() {
    setPlacing(true);
    onPlaceOrder();
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="text-xl font-bold text-foreground">Review your order</h1>

      <section className="rounded-lg border border-gray-200 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">
            Shipping address
          </h2>
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-link hover:underline"
          >
            Edit
          </button>
        </div>
        <p className="text-sm text-foreground">
          {address.fullName}
          <br />
          {address.addressLine1}
          {address.addressLine2 ? <>, {address.addressLine2}</> : null}
          <br />
          {address.city}, {address.state} {address.zip}
          {address.phone ? (
            <>
              <br />
              {address.phone}
            </>
          ) : null}
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 p-4">
        <h2 className="mb-3 text-sm font-bold text-foreground">
          Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
        </h2>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.slug} className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-sm text-foreground">
                {item.name}
                <span className="block text-muted">Qty: {item.quantity}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {formatPrice(item.price * item.quantity, item.currency)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between text-sm text-foreground">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-2 text-base font-bold text-foreground">
          <span>Order total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </section>

      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={placing}
        className="w-full rounded-full border border-cta-border/10 bg-cta px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:self-start sm:px-8"
      >
        {placing ? "Placing order…" : "Place Order"}
      </button>
    </div>
  );
}
