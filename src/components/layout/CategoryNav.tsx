import Link from "next/link";
import { AllDepartmentsMenu } from "./AllDepartmentsMenu";

// Matches the project's Figma design system's nav link set exactly. Several
// of these point to features explicitly out of scope for this clone (Gift
// Ideas, Prime, Amazon Pay, Gift Cards) — routed to "/" rather than a
// nonexistent page, so nothing 404s. Category browsing itself still works
// via the homepage rails and the /search filter sidebar.
const NAV_LINKS = [
  { label: "Fashion", href: "/" },
  { label: "Mobiles", href: "/" },
  { label: "Gift Ideas", href: "/" },
  { label: "Prime", href: "/" },
  { label: "Amazon Pay", href: "/" },
  { label: "Gift Cards", href: "/" },
  { label: "Sports, Fitness & Outdoors", href: "/search?category=Sports%20%26%20Outdoors" },
  { label: "Computers", href: "/search?category=Electronics" },
  { label: "Customer Service", href: "/" },
];

export function CategoryNav() {
  return (
    <nav
      aria-label="Amazon quick links"
      className="no-scrollbar flex items-center gap-6 overflow-x-auto bg-subnav px-4 py-2.5 text-[14px] text-white"
    >
      <AllDepartmentsMenu />
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="shrink-0 whitespace-nowrap rounded-sm border border-transparent font-medium hover:border-white"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
