"use client";

import { useState } from "react";
import Link from "next/link";
import { DELIVERY_COUNTRIES, useLocation } from "@/lib/preferences";

export function LocationModal() {
  const { modalOpen, closeModal, setLocation } = useLocation();
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState<string>(DELIVERY_COUNTRIES[0]);

  if (!modalOpen) return null;

  function applyZip(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = zip.trim();
    if (!trimmed) return;
    setLocation(`United States ${trimmed}`);
    closeModal();
  }

  function handleDone() {
    setLocation(country);
    closeModal();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-bold text-foreground">
            Choose your location
          </h2>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="rounded border border-gray-300 p-1 text-foreground hover:bg-gray-100"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
              <path d="M4.3 4.3a1 1 0 0 1 1.4 0L10 8.6l4.3-4.3a1 1 0 1 1 1.4 1.4L11.4 10l4.3 4.3a1 1 0 0 1-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 0 1-1.4-1.4L8.6 10 4.3 5.7a1 1 0 0 1 0-1.4Z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-5">
          <p className="text-sm text-foreground">
            Delivery options and delivery speeds may vary for different
            locations
          </p>

          <Link
            href="/sign-in"
            onClick={closeModal}
            className="rounded-full bg-cta px-4 py-2 text-center text-sm font-medium text-foreground hover:brightness-95"
          >
            Sign in to see your addresses
          </Link>

          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-gray-200" />
            or enter a US zip code
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={applyZip} className="flex gap-2">
            <label htmlFor="zip" className="sr-only">
              Zip code
            </label>
            <input
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Zip code"
              className="min-w-0 flex-1 rounded border border-gray-400 px-3 py-2 text-sm outline-none focus:border-link"
            />
            <button
              type="submit"
              className="shrink-0 rounded border border-gray-400 bg-gray-100 px-4 py-2 text-sm font-medium text-foreground hover:bg-gray-200"
            >
              Apply
            </button>
          </form>

          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-gray-200" />
            or ship outside the US
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <label htmlFor="country" className="sr-only">
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded border border-gray-400 px-3 py-2 text-sm outline-none focus:border-link"
          >
            {DELIVERY_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleDone}
            className="self-end rounded-full bg-cta px-6 py-2 text-sm font-medium text-foreground hover:brightness-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
