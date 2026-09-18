"use client";

import { useLocation, useLanguage } from "@/lib/preferences";

export function DeliverTo() {
  const { location, openModal } = useLocation();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={openModal}
      className="hidden shrink-0 flex-col items-start rounded-sm border border-transparent px-2 py-1 text-left leading-tight hover:border-white sm:flex"
    >
      <span className="flex items-center gap-1 text-[12px] text-gray-300">
        {/* eslint-disable-next-line @next/next/no-img-element -- local vector icon */}
        <img src="/figma-icons/location-pin.svg" alt="" className="h-3.5 w-3" />
        {t("deliverTo")}
      </span>
      <span className="text-[14px] font-medium">{location}</span>
    </button>
  );
}
