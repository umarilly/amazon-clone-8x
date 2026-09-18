"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/preferences";

export function AccountMenu() {
  const { user, isSignedIn, signOut } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  const chevron = (
    // eslint-disable-next-line @next/next/no-img-element -- local vector icon
    <img src="/figma-icons/chevron-down-sm.svg" alt="" className="h-2 w-2" />
  );

  if (!isSignedIn) {
    return (
      <Link
        href="/sign-in"
        className="hidden shrink-0 items-center gap-2 rounded-sm border border-transparent px-2 py-1 text-left leading-tight hover:border-white sm:flex"
      >
        <span className="flex flex-col">
          <span className="text-[12px] text-gray-300">{t("helloSignIn")}</span>
          <span className="text-[14px] font-medium">{t("accountLists")}</span>
        </span>
        {chevron}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="hidden shrink-0 items-center gap-2 rounded-sm border border-transparent px-2 py-1 text-left leading-tight hover:border-white sm:flex"
    >
      <span className="flex flex-col">
        <span className="max-w-[10rem] truncate text-[12px] text-gray-300">
          {t("hello")}, {user?.name.split(" ")[0]}
        </span>
        <span className="text-[14px] font-medium">{t("signOut")}</span>
      </span>
      {chevron}
    </button>
  );
}
