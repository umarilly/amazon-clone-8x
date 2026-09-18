import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-6 py-16 text-center">
      <svg
        viewBox="0 0 24 24"
        className="h-12 w-12 fill-none stroke-muted"
        strokeWidth={1.5}
      >
        <path
          d="M7 4h-2l-1 2v1h2l3.6 7.59-1.35 2.44A2 2 0 0 0 10 20h9v-2h-9l1.1-2h6.45a2 2 0 0 0 1.75-1.03L22 8H6.21l-.94-2H7V4Z"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="21" r="1" />
        <circle cx="18" cy="21" r="1" />
      </svg>
      <h1 className="text-lg font-bold text-foreground">Your cart is empty</h1>
      <p className="max-w-sm text-sm text-muted">
        Browse the catalog and add something you like — it&apos;ll show up
        here.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full border border-cta-border/20 bg-cta px-4 py-2 text-sm font-medium text-foreground hover:brightness-95"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
