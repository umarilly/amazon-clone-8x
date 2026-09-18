"use client";

import { useEffect, useRef, useState } from "react";
import {
  LANGUAGES,
  CURRENCIES,
  getStoredCurrency,
  setStoredCurrency,
  useLocation,
  useLanguage,
} from "@/lib/preferences";

/**
 * Language selection is real: picking a language updates `t()` app-wide
 * (see lib/i18n.ts / LanguageProvider) and flips RTL for Arabic/Hebrew.
 * Currency stays display-only (no real conversion, flagged not faked).
 */
export function LanguageMenu() {
  const { openModal } = useLocation();
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reading localStorage can't happen during SSR/first paint — same
    // justified hydration-on-mount pattern used by cart/auth/location.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrency(getStoredCurrency());
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function selectCurrency(code: string) {
    setCurrency(code);
    setStoredCurrency(code);
  }

  return (
    <div ref={ref} className="relative hidden shrink-0 sm:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1 rounded-sm border border-transparent px-2 py-1 text-sm hover:border-white"
      >
        <span aria-hidden className="text-base leading-none">
          {LANGUAGES.find((l) => l.code === language)?.flag ?? "🇺🇸"}
        </span>
        {language}
        {/* eslint-disable-next-line @next/next/no-img-element -- local vector icon */}
        <img src="/figma-icons/chevron-down-country.svg" alt="" className="h-2 w-2" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-1 w-64 rounded-md border border-gray-200 bg-white py-2 text-foreground shadow-lg">
          <p className="px-4 py-1 text-xs font-bold text-muted">
            Change language
          </p>
          <ul className="mb-2">
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm hover:bg-gray-100"
                >
                  <span
                    className={`h-3 w-3 shrink-0 rounded-full border ${
                      language === lang.code
                        ? "border-link bg-link"
                        : "border-gray-400"
                    }`}
                  />
                  {lang.label} - {lang.code}
                </button>
              </li>
            ))}
          </ul>

          <p className="border-t border-gray-200 px-4 py-1 pt-2 text-xs font-bold text-muted">
            Change currency
          </p>
          <ul className="mb-2">
            {CURRENCIES.map((cur) => (
              <li key={cur.code}>
                <button
                  type="button"
                  onClick={() => selectCurrency(cur.code)}
                  className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm hover:bg-gray-100"
                >
                  <span
                    className={`h-3 w-3 shrink-0 rounded-full border ${
                      currency === cur.code
                        ? "border-link bg-link"
                        : "border-gray-400"
                    }`}
                  />
                  {cur.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 border-t border-gray-200 px-4 pt-2 text-xs text-muted">
            <span aria-hidden>🇺🇸</span>
            You are shopping on Amazon Clone (mock)
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openModal();
            }}
            className="px-4 pt-1 text-left text-xs text-link hover:underline"
          >
            Change country/region.
          </button>
        </div>
      )}
    </div>
  );
}
