"use client";

import Image from "next/image";
import Link from "next/link";
import { QuantityInput } from "./QuantityInput";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/lib/types";

export function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <li className="flex gap-4 border-b border-gray-200 py-4">
      <Link
        href={`/product/${item.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-50"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <Link
          href={`/product/${item.slug}`}
          className="text-sm text-foreground hover:text-link hover:underline"
        >
          {item.name}
        </Link>

        <p className="text-base font-semibold text-foreground">
          {formatPrice(item.price, item.currency)}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-4">
          <QuantityInput
            quantity={item.quantity}
            stock={item.stock}
            onChange={(quantity) => updateQuantity(item.slug, quantity)}
            size="sm"
          />
          <button
            type="button"
            onClick={() => removeItem(item.slug)}
            className="text-sm text-link hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <p className="w-20 shrink-0 text-right text-sm font-semibold text-foreground">
        {formatPrice(item.price * item.quantity, item.currency)}
      </p>
    </li>
  );
}
