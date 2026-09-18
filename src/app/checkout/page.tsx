import type { Metadata } from "next";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Amazon Clone",
};

export default function CheckoutPage() {
  return (
    <RequireAuth>
      <CheckoutClient />
    </RequireAuth>
  );
}
