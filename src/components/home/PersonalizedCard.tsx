"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import type { Product } from "@/lib/types";

interface Tile {
  label: string;
  href: string;
  image?: string;
}

export function PersonalizedCard({ tileProducts }: { tileProducts: Product[] }) {
  const { user, isSignedIn } = useAuth();

  const tiles: Tile[] = [
    { label: "Your Orders", href: "/orders" },
    ...tileProducts.slice(0, 3).map((p) => ({
      label: p.category,
      href: `/search?category=${encodeURIComponent(p.category)}`,
      image: p.images[0],
    })),
  ];

  return (
    <div className="flex h-full min-h-[420px] w-full flex-col gap-5 bg-white p-5">
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element -- local vector icon */}
        <img src="/figma-icons/profile-avatar.svg" alt="" className="h-[60px] w-[60px] shrink-0" />
        <div>
          <p className="text-[18px] font-bold text-foreground">
            {isSignedIn ? `Hi, ${user?.name.split(" ")[0]}` : "Hi, there"}
          </p>
          <p className="text-[13px] text-muted">
            {isSignedIn ? `Customer since ${new Date().getFullYear()}` : "Sign in for your account"}
          </p>
        </div>
      </div>

      <p className="text-[13px] font-bold text-foreground">Top links for you</p>

      <div className="grid grid-cols-2 gap-2.5">
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className="flex h-[130px] flex-col items-center justify-center gap-2.5 bg-[#f6fafb] p-3 text-center"
          >
            {tile.image ? (
              <div className="relative h-[82px] w-[68px] shrink-0">
                <Image src={tile.image} alt="" fill sizes="68px" className="object-cover" />
              </div>
            ) : (
              <div className="flex h-[60px] w-[92px] shrink-0 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element -- local vector icon */}
                <img src="/figma-icons/cart.svg" alt="" className="h-8 w-8 opacity-60" style={{ filter: "invert(1)" }} />
              </div>
            )}
            <span className="text-[12px] font-medium text-foreground">{tile.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
