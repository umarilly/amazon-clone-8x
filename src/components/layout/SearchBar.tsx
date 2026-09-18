"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DEPARTMENTS } from "@/lib/departments";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [department, setDepartment] = useState(
    searchParams.get("category") ?? "All Departments"
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = value.trim();
    const params = new URLSearchParams();
    if (trimmed) params.set("q", trimmed);
    if (department !== "All Departments") params.set("category", department);
    router.push(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex h-10 min-w-0 flex-1 overflow-hidden rounded-md"
    >
      <label htmlFor="department" className="sr-only">
        Search department
      </label>
      <select
        id="department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="hidden shrink-0 rounded-l-md border-r border-gray-300 bg-[#f3f3f3] px-2 text-xs text-foreground outline-none sm:block"
      >
        {DEPARTMENTS.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <label htmlFor="site-search" className="sr-only">
        Search Amazon
      </label>
      <input
        id="site-search"
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Amazon"
        className="min-w-0 flex-1 bg-white px-3 text-sm text-foreground outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex w-10 shrink-0 items-center justify-center bg-search-btn text-header hover:brightness-95 sm:w-12"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local vector icon */}
        <img src="/figma-icons/search.svg" alt="" className="h-5 w-5" />
      </button>
    </form>
  );
}
