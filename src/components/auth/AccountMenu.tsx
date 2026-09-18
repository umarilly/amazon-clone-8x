"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export function AccountMenu() {
  const { user, isSignedIn, signOut } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  if (!isSignedIn) {
    return (
      <Link
        href="/sign-in"
        className="hidden shrink-0 flex-col rounded-sm border border-transparent px-2 py-1 text-left text-xs leading-tight hover:border-white sm:flex"
      >
        <span className="text-gray-300">Hello, sign in</span>
        <span className="font-bold">Account &amp; Lists</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="hidden shrink-0 flex-col rounded-sm border border-transparent px-2 py-1 text-left text-xs leading-tight hover:border-white sm:flex"
    >
      <span className="max-w-[10rem] truncate text-gray-300">
        Hello, {user?.name.split(" ")[0]}
      </span>
      <span className="font-bold">Sign Out</span>
    </button>
  );
}
