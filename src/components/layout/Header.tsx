import Link from "next/link";
import { Suspense } from "react";
import { SearchBar } from "./SearchBar";
import { DeliverTo } from "./DeliverTo";
import { LanguageMenu } from "./LanguageMenu";
import { ReturnsOrders } from "./ReturnsOrders";
import { LocationModal } from "./LocationModal";
import { CartIcon } from "@/components/cart/CartIcon";
import { AccountMenu } from "@/components/auth/AccountMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-[60px] items-center gap-3 bg-header px-4 text-white sm:gap-5">
      <Link
        href="/"
        className="shrink-0 rounded-sm outline-offset-2 hover:outline hover:outline-1 hover:outline-white"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local
            multi-color vector icon, not a photo; next/image's optimizer
            requires extra SVG config for no real benefit here */}
        <img src="/figma-icons/logo.svg" alt="Amazon" width={100} height={30} />
      </Link>

      <DeliverTo />

      <Suspense
        fallback={
          <div className="h-10 min-w-0 flex-1 rounded-md bg-white/90" />
        }
      >
        <SearchBar />
      </Suspense>

      <LanguageMenu />

      <AccountMenu />

      <ReturnsOrders />

      <CartIcon />

      <LocationModal />
    </header>
  );
}
