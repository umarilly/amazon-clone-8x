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
import {
  translate,
  RTL_LANGUAGES,
  type LanguageCode,
  type TranslationKey,
} from "./i18n";

export const DELIVERY_COUNTRIES = [
  "United States",
  "Pakistan",
  "United Kingdom",
  "Canada",
  "Germany",
  "India",
  "Australia",
  "United Arab Emirates",
] as const;

export const LANGUAGES = [
  { code: "EN", label: "English", flag: "🇺🇸" },
  { code: "ES", label: "español", flag: "🇪🇸" },
  { code: "AR", label: "العربية", flag: "🇸🇦" },
  { code: "DE", label: "Deutsch", flag: "🇩🇪" },
  { code: "HE", label: "עברית", flag: "🇮🇱" },
  { code: "KO", label: "한국어", flag: "🇰🇷" },
  { code: "PT", label: "português", flag: "🇵🇹" },
] as const;

export const CURRENCIES = [
  { code: "USD", label: "$ - USD - US Dollar" },
  { code: "PKR", label: "Rs - PKR - Pakistani Rupee" },
] as const;

const LOCATION_KEY = "amazon-clone-location";
const LANGUAGE_KEY = "amazon-clone-language";
const CURRENCY_KEY = "amazon-clone-currency";
const DEFAULT_LOCATION = "United States";

/**
 * Deliver-to location is shared between the header button, the location
 * modal, and the "Change country/region" link inside the language menu, so
 * it lives in one small context (same pattern as cart/auth) rather than
 * being duplicated per component.
 */
interface LocationContextValue {
  location: string;
  hydrated: boolean;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setLocation: (value: string) => void;
}

const LocationContext = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState(DEFAULT_LOCATION);
  const [hydrated, setHydrated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCATION_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setLocationState(stored);
    } catch {
      // Storage may be unavailable — default location stands.
    } finally {
      setHydrated(true);
    }
  }, []);

  const setLocation = useCallback((value: string) => {
    setLocationState(value);
    try {
      localStorage.setItem(LOCATION_KEY, value);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(
    () => ({
      location,
      hydrated,
      modalOpen,
      openModal: () => setModalOpen(true),
      closeModal: () => setModalOpen(false),
      setLocation,
    }),
    [location, hydrated, modalOpen, setLocation]
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation(): LocationContextValue {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}

/**
 * Real language switching: `t(key)` returns actual translated UI copy (see
 * lib/i18n.ts) for the currently selected language, and RTL languages
 * (Arabic, Hebrew) flip document direction. Currency stays display-only
 * (no real conversion — flagged, not silently faked) since that's a
 * separate, much bigger feature (every price in the catalog would need a
 * real exchange rate).
 */
interface LanguageContextValue {
  language: LanguageCode;
  hydrated: boolean;
  setLanguage: (value: LanguageCode) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("EN");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_KEY) as LanguageCode | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setLanguageState(stored);
    } catch {
      // Storage may be unavailable — default language stands.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = RTL_LANGUAGES.includes(language) ? "rtl" : "ltr";
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  const setLanguage = useCallback((value: LanguageCode) => {
    setLanguageState(value);
    try {
      localStorage.setItem(LANGUAGE_KEY, value);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback((key: TranslationKey) => translate(key, language), [language]);

  const value = useMemo(
    () => ({ language, hydrated, setLanguage, t }),
    [language, hydrated, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function getStoredCurrency(): string {
  try {
    return localStorage.getItem(CURRENCY_KEY) ?? "USD";
  } catch {
    return "USD";
  }
}

export function setStoredCurrency(value: string): void {
  try {
    localStorage.setItem(CURRENCY_KEY, value);
  } catch {
    // ignore
  }
}
