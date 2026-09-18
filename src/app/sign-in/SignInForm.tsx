"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";

export function SignInForm() {
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn();
    const redirectTo = searchParams.get("redirect") || "/";
    router.push(redirectTo);
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-4 px-4 py-10 sm:px-6">
      <h1 className="text-xl font-bold text-foreground">Sign in</h1>
      <p className="rounded-md bg-gray-50 p-3 text-xs text-muted">
        This is a demo. Any email and password will sign you in — nothing is
        verified or stored beyond this browser.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-link focus:outline-none focus:ring-1 focus:ring-link"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-link focus:outline-none focus:ring-1 focus:ring-link"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full border border-cta-border/10 bg-cta px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:brightness-95"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
