import type { Metadata } from "next";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { OrdersClient } from "./OrdersClient";

export const metadata: Metadata = {
  title: "Your Orders | Amazon Clone",
};

export default function OrdersPage() {
  return (
    <RequireAuth>
      <OrdersClient />
    </RequireAuth>
  );
}
