"use client";

import { useLanguage } from "@/lib/preferences";

export function ResultsCount({ count, query }: { count: number; query?: string }) {
  const { t } = useLanguage();
  return (
    <p className="border-b border-gray-100 pb-3 text-[14px] text-foreground">
      {count} {count === 1 ? "result" : t("results")}
      {query ? (
        <>
          {" "}for <span className="font-bold text-accent-orange">&ldquo;{query}&rdquo;</span>
        </>
      ) : null}
    </p>
  );
}
