"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DEPARTMENTS } from "@/lib/departments";
import { useLanguage } from "@/lib/preferences";
import { useAuth } from "@/lib/auth";

export function AllDepartmentsMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();
  const { user, isSignedIn } = useAuth();

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  function selectDepartment(dept: string) {
    setOpen(false);
    if (dept === "All Departments") {
      router.push("/search");
    } else {
      router.push(`/search?category=${encodeURIComponent(dept)}`);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        className="flex shrink-0 items-center gap-1 rounded-sm border border-transparent font-medium hover:border-white"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- local vector icon */}
        <img src="/figma-icons/hamburger.svg" alt="" className="h-4 w-4" />
        {t("all")}
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          <div className="absolute left-0 top-0 flex h-full w-[320px] max-w-[85vw] flex-col overflow-y-auto bg-white text-foreground shadow-xl">
            <div className="bg-header px-4 py-4 text-white">
              <span className="text-lg font-bold">
                {isSignedIn ? `${t("hello")}, ${user?.name.split(" ")[0]}` : t("helloSignIn")}
              </span>
            </div>

            <div className="border-b border-gray-200 px-4 py-3">
              <p className="text-base font-bold text-foreground">{t("department")}</p>
            </div>

            <ul className="flex-1 py-1">
              {DEPARTMENTS.map((dept, i) => (
                <li key={dept}>
                  <button
                    type="button"
                    onClick={() => selectDepartment(dept)}
                    className={`flex w-full items-center gap-2 border-b border-gray-100 px-4 py-3 text-left text-[15px] hover:bg-gray-50 ${
                      i === 0 ? "font-bold text-link" : "text-foreground"
                    }`}
                  >
                    {i === 0 && <span aria-hidden>✓</span>}
                    {dept}
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border-t border-gray-200 px-4 py-3 text-left text-[15px] font-medium text-link hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
