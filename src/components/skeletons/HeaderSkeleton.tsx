import { Skeleton } from "./Skeleton";

export function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
      <Skeleton className="h-8 w-24 shrink-0" />
      <Skeleton className="h-10 flex-1" />
      <Skeleton className="h-8 w-20 shrink-0 sm:w-28" />
      <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
    </header>
  );
}
