import Link from "next/link";

export function EmptyResults({ query }: { query?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-6 py-16 text-center">
      <svg
        viewBox="0 0 24 24"
        className="h-12 w-12 fill-none stroke-muted"
        strokeWidth={1.5}
      >
        <circle cx="10" cy="10" r="6.5" />
        <path d="M15 15l5 5" strokeLinecap="round" />
      </svg>
      <h2 className="text-lg font-bold text-foreground">
        {query ? (
          <>
            No results for <span className="italic">&quot;{query}&quot;</span>
          </>
        ) : (
          "No products match these filters"
        )}
      </h2>
      <p className="max-w-sm text-sm text-muted">
        Try checking your spelling, using fewer or more general terms, or
        clearing your price and rating filters.
      </p>
      <Link
        href="/search"
        className="mt-2 rounded-full border border-cta-border/20 bg-cta px-4 py-2 text-sm font-medium text-foreground hover:brightness-95"
      >
        Clear all filters
      </Link>
    </div>
  );
}
