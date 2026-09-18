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

const STORAGE_KEY = "amazon-clone-signed-in";

/**
 * Stubbed auth for Milestone 6 so the checkout gate can be built and
 * tested before real auth exists (Milestone 7). Milestone 7 replaces the
 * sign-in form and this storage-backed flag with a real mock user store —
 * the gate itself (RequireAuth) should not need to change.
 */
interface AuthContextValue {
  isSignedIn: boolean;
  hydrated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // Auth state must render the same (signed out) on the server and
      // the initial client pass, so it can only be loaded post-mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw === "true") setIsSignedIn(true);
    } catch {
      // Corrupted or unavailable storage — treat as signed out.
    } finally {
      setHydrated(true);
    }
  }, []);

  const signIn = useCallback(() => {
    setIsSignedIn(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors (e.g. private browsing).
    }
  }, []);

  const signOut = useCallback(() => {
    setIsSignedIn(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  }, []);

  const value = useMemo(
    () => ({ isSignedIn, hydrated, signIn, signOut }),
    [isSignedIn, hydrated, signIn, signOut]
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
