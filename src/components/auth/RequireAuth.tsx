"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";

/**
 * Wrap any page that requires sign-in. Redirects to /sign-in with a
 * `redirect` param pointing back here, once auth state has hydrated.
 * This is the one place the guest-gating logic lives — Milestone 7 swaps
 * the stub behind useAuth() for real auth without touching this file.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isSignedIn, hydrated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (hydrated && !isSignedIn) {
      router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [hydrated, isSignedIn, pathname, router]);

  if (!hydrated) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-sm text-muted">
        Checking your session…
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return <>{children}</>;
}
