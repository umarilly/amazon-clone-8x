import Link from "next/link";
import { Suspense } from "react";
import { SearchBar } from "./SearchBar";
import { CartIcon } from "@/components/cart/CartIcon";
import { AccountMenu } from "@/components/auth/AccountMenu";

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

      <AccountMenu />

      <CartIcon />
    </header>
  );
}
