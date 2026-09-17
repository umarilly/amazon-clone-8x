"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = value.trim();
    const params = new URLSearchParams();
    if (trimmed) params.set("q", trimmed);
    router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex h-10 min-w-0 flex-1 overflow-hidden rounded-md"
    >
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <input
        id="site-search"
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products"
        className="min-w-0 flex-1 bg-white px-3 text-sm text-foreground outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex w-10 shrink-0 items-center justify-center bg-search-btn text-header hover:brightness-95 sm:w-12"
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current">
          <path d="M13.61 12.2a6.5 6.5 0 1 0-1.41 1.41l4.14 4.15a1 1 0 0 0 1.42-1.42l-4.15-4.14ZM3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z" />
        </svg>
      </button>
    </form>
  );
}
