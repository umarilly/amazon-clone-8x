"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/preferences";

const COLUMNS = [
  {
    heading: "Get to Know Us",
    links: ["About Amazon Clone", "Careers", "Press Releases", "Science"],
  },
  {
    heading: "Make Money with Us",
    links: ["Sell products", "Sell on Amazon Business", "Become an Affiliate", "Advertise Your Products"],
  },
  {
    heading: "Amazon Clone Payment Products",
    links: ["Business Card", "Shop with Points", "Reload Your Balance", "Currency Converter"],
  },
  {
    heading: "Let Us Help You",
    links: ["Your Account", "Your Orders", "Shipping Rates & Policies", "Returns & Replacements", "Help"],
  },
];

const LINK_HREFS: Record<string, string> = {
  "Your Account": "/sign-in",
  "Your Orders": "/orders",
};

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-8 text-white">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-[#37475a] py-4 text-center text-sm hover:bg-[#485769]"
      >
        Back to top
      </button>

      <div className="bg-[#232f3e] px-4 py-10 sm:px-10">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-8 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-2.5">
              <h3 className="mb-1 text-[15px] font-bold">{col.heading}</h3>
              {col.links.map((label) => (
                <Link
                  key={label}
                  href={LINK_HREFS[label] ?? "/"}
                  className="text-[13px] text-gray-300 hover:underline"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 bg-[#131a22] px-4 py-8 text-center">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element -- local vector icon */}
          <img src="/figma-icons/logo.svg" alt="Amazon" width={100} height={30} />
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-2 rounded-sm border border-gray-500 px-3 py-1.5 text-xs">
            <span aria-hidden>🇺🇸</span> English
          </span>
          <span className="flex items-center gap-2 rounded-sm border border-gray-500 px-3 py-1.5 text-xs">
            $ USD, United States
          </span>
        </div>
      </div>

      <div className="border-t border-gray-700 bg-[#131a22] px-4 py-6 text-center text-xs text-gray-400">
        <div className="mb-2 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="hover:underline">Conditions of Use</Link>
          <Link href="/" className="hover:underline">Privacy Notice</Link>
          <Link href="/" className="hover:underline">Your Ads Privacy Choices</Link>
        </div>
        <p>{t("footerDisclaimer")}</p>
      </div>
    </footer>
  );
}
