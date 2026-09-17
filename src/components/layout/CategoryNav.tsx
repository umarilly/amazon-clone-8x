import Link from "next/link";

export function CategoryNav({ categories }: { categories: string[] }) {
  return (
    <nav
      aria-label="Shop by category"
      className="flex items-center gap-1 overflow-x-auto bg-subnav px-2 py-2 text-sm text-white sm:px-4"
    >
      <Link
        href="/search"
        className="flex shrink-0 items-center gap-2 rounded-sm border border-transparent px-2 py-1 font-bold hover:border-white"
      >
        <svg viewBox="0 0 20 16" className="h-4 w-5 fill-current">
          <rect width="20" height="2" rx="1" />
          <rect y="7" width="20" height="2" rx="1" />
          <rect y="14" width="20" height="2" rx="1" />
        </svg>
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/search?category=${encodeURIComponent(category)}`}
          className="shrink-0 rounded-sm border border-transparent px-2 py-1 hover:border-white"
        >
          {category}
        </Link>
      ))}
    </nav>
  );
}
