"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface AuthUser {
  name: string;
  email: string;
}

/**
 * Real (mocked) auth: session lives in an httpOnly signed cookie set by
 * /api/auth/*, so the client can't read it directly and has to ask the
 * server. `isSignedIn` and `hydrated` keep the exact meaning they had in
 * the Milestone 6 stub, so RequireAuth and the checkout gate don't change.
 */
interface AuthContextValue {
  user: AuthUser | null;
  isSignedIn: boolean;
  hydrated: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session", { cache: "no-store" });
      const data = await res.json();
      setUser(data?.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    // The cookie is httpOnly, so confirming auth state can only happen by
    // asking the server — this can't be resolved during SSR/first paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const signOut = useCallback(async () => {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, isSignedIn: user !== null, hydrated, refresh, signOut }),
    [user, hydrated, refresh, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
