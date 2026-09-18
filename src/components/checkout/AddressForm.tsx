"use client";

import { useState } from "react";
import type { Address } from "@/lib/types";

const EMPTY_ADDRESS: Address = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
};

function inputClass() {
  return "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-link focus:outline-none focus:ring-1 focus:ring-link";
}

export function AddressForm({
  initial,
  onSubmit,
}: {
  initial: Address | null;
  onSubmit: (address: Address) => void;
}) {
  const [address, setAddress] = useState<Address>(initial ?? EMPTY_ADDRESS);

  function update<K extends keyof Address>(key: K, value: Address[K]) {
    setAddress((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(address);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4">
      <h1 className="text-xl font-bold text-foreground">Shipping address</h1>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="fullName" className="text-sm font-medium text-foreground">
          Full name
        </label>
        <input
          id="fullName"
          required
          value={address.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          className={inputClass()}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="addressLine1" className="text-sm font-medium text-foreground">
          Address line 1
        </label>
        <input
          id="addressLine1"
          required
          value={address.addressLine1}
          onChange={(e) => update("addressLine1", e.target.value)}
          className={inputClass()}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="addressLine2" className="text-sm font-medium text-foreground">
          Address line 2 <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="addressLine2"
          value={address.addressLine2}
          onChange={(e) => update("addressLine2", e.target.value)}
          className={inputClass()}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="city" className="text-sm font-medium text-foreground">
            City
          </label>
          <input
            id="city"
            required
            value={address.city}
            onChange={(e) => update("city", e.target.value)}
            className={inputClass()}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="state" className="text-sm font-medium text-foreground">
            State
          </label>
          <input
            id="state"
            required
            value={address.state}
            onChange={(e) => update("state", e.target.value)}
            className={inputClass()}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="zip" className="text-sm font-medium text-foreground">
            ZIP code
          </label>
          <input
            id="zip"
            required
            inputMode="numeric"
            pattern="[0-9]{5}"
            title="5-digit ZIP code"
            value={address.zip}
            onChange={(e) => update("zip", e.target.value)}
            className={inputClass()}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={address.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass()}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-full border border-cta-border/10 bg-cta px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:brightness-95 sm:w-auto sm:self-start sm:px-8"
      >
        Continue to review
      </button>
    </form>
  );
}
