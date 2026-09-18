import type { Metadata } from "next";
import { CartClient } from "./CartClient";

export const metadata: Metadata = {
  title: "Your Cart | Amazon Clone",
};

export default function CartPage() {
  return <CartClient />;
}
