import type { Metadata } from "next";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { ConfirmationClient } from "./ConfirmationClient";

export const metadata: Metadata = {
  title: "Order Confirmed | Amazon Clone",
};

export default function ConfirmationPage() {
  return (
    <RequireAuth>
      <ConfirmationClient />
    </RequireAuth>
  );
}
