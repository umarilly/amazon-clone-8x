"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { generateOrderNumber, saveLastOrder } from "@/lib/orders";
import { AddressForm } from "@/components/checkout/AddressForm";
import { OrderReview } from "@/components/checkout/OrderReview";
import type { Address } from "@/lib/types";

type Step = "address" | "review";

export function CheckoutClient() {
  const { items, subtotal, hydrated } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<Step>("address");
  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.replace("/cart");
    }
  }, [hydrated, items.length, router]);

  if (!hydrated || items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-sm text-muted">
        Loading your cart…
      </div>
    );
  }

  function handleAddressSubmit(submitted: Address) {
    setAddress(submitted);
    setStep("review");
  }

  function handlePlaceOrder() {
    if (!address) return;
    saveLastOrder({
      orderNumber: generateOrderNumber(),
      date: new Date().toISOString(),
      items,
      subtotal,
      address,
    });
    // The cart is cleared on the confirmation page (not here) — clearing
    // it while this page is still mounted would flip `items` to empty and
    // trigger the empty-cart redirect above before navigation completes.
    router.push("/checkout/confirmation");
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6">
      {step === "address" ? (
        <AddressForm initial={address} onSubmit={handleAddressSubmit} />
      ) : (
        <OrderReview
          address={address!}
          items={items}
          subtotal={subtotal}
          onBack={() => setStep("address")}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </main>
  );
}
