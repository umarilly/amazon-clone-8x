import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-3 px-4 py-24 text-center">
      <h1 className="text-xl font-bold text-foreground">
        We couldn&apos;t find that product
      </h1>
      <p className="max-w-sm text-sm text-muted">
        It may have been removed or the link might be incorrect. Try
        searching for something else instead.
      </p>
      <Link
        href="/search"
        className="mt-2 rounded-full border border-cta-border/20 bg-cta px-4 py-2 text-sm font-medium text-foreground hover:brightness-95"
      >
        Browse all products
      </Link>
    </main>
  );
}
