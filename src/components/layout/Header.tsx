import Link from "next/link";
import { Suspense } from "react";
import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 bg-header px-3 py-2.5 text-white sm:gap-4 sm:px-4">
      <Link
        href="/"
        className="shrink-0 rounded-sm px-1 py-1 text-2xl font-bold tracking-tight text-white outline-offset-2 hover:outline hover:outline-1 hover:outline-white"
      >
        amazon
        <span className="text-search-btn">.</span>
      </Link>

      <Suspense
        fallback={
          <div className="h-10 min-w-0 flex-1 rounded-md bg-white/90" />
        }
      >
        <SearchBar />
      </Suspense>

      <button
        type="button"
        className="hidden shrink-0 flex-col rounded-sm border border-transparent px-2 py-1 text-left text-xs leading-tight hover:border-white sm:flex"
      >
        <span className="text-gray-300">Hello, sign in</span>
        <span className="font-bold">Account &amp; Lists</span>
      </button>

      <button
        type="button"
        className="relative flex shrink-0 items-center gap-1 rounded-sm border border-transparent px-2 py-1 hover:border-white"
        aria-label="Cart, 0 items"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
          <path d="M7 4h-2l-1 2v1h2l3.6 7.59-1.35 2.44A2 2 0 0 0 10 20h9v-2h-9l1.1-2h6.45a2 2 0 0 0 1.75-1.03L22 8H6.21l-.94-2H7V4Zm1 15a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm9 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z" />
        </svg>
        <span className="absolute -top-0.5 left-3 text-base font-bold text-cart-badge">
          0
        </span>
        <span className="hidden font-bold sm:inline">Cart</span>
      </button>
    </header>
  );
}
