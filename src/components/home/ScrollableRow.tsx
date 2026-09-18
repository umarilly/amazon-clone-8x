"use client";

import { useRef, type ReactNode } from "react";

export function ScrollableRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function scrollBy(amount: number) {
    ref.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => scrollBy(-600)}
        aria-label="Scroll left"
        className="absolute left-0 top-0 z-10 hidden h-full w-9 items-center justify-center bg-gradient-to-r from-white via-white/90 to-transparent opacity-0 transition-opacity group-hover:opacity-100 sm:flex"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white shadow">
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current text-foreground">
            <path d="M12.5 4l-6 6 6 6 1.4-1.4L9.3 10l4.6-4.6L12.5 4Z" />
          </svg>
        </span>
      </button>

      <div
        ref={ref}
        className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:mx-0 sm:px-0"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(600)}
        aria-label="Scroll right"
        className="absolute right-0 top-0 z-10 hidden h-full w-9 items-center justify-center bg-gradient-to-l from-white via-white/90 to-transparent opacity-0 transition-opacity group-hover:opacity-100 sm:flex"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white shadow">
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current text-foreground">
            <path d="M7.5 4l6 6-6 6-1.4-1.4L10.7 10 6.1 5.4 7.5 4Z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
