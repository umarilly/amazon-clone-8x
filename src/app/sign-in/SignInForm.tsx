"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/preferences";

function inputClass() {
  return "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-link focus:outline-none focus:ring-1 focus:ring-link";
}

export function SignInForm() {
  const { refresh } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      await refresh();
      router.push(redirectTo);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col gap-4 px-4 py-10 sm:px-6">
      <h1 className="text-xl font-bold text-foreground">{t("signIn")}</h1>
      <p className="rounded-md bg-gray-50 p-3 text-xs text-muted">
        This is a demo account system, passwords are hashed, but nothing
        else is real (no email verification, no password reset).
      </p>

      {error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            {t("email")}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass()}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            {t("password")}
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass()}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full border border-cta-border/10 bg-cta px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "..." : t("signIn")}
        </button>
      </form>

      <p className="text-center text-sm text-muted">
        New here?{" "}
        <Link
          href={`/sign-up?redirect=${encodeURIComponent(redirectTo)}`}
          className="text-link hover:underline"
        >
          {t("createAccount")}
        </Link>
      </p>
    </div>
  );
}
