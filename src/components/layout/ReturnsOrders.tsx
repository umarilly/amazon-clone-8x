"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/preferences";

export function ReturnsOrders() {
  const { t } = useLanguage();
  return (
    <Link
      href="/orders"
      className="hidden shrink-0 flex-col rounded-sm border border-transparent px-2 py-1 text-left leading-tight hover:border-white sm:flex"
    >
      <span className="text-[12px] text-gray-300">{t("returns")}</span>
      <span className="text-[14px] font-medium">{t("andOrders")}</span>
    </Link>
  );
}
