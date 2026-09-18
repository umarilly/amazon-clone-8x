import type { Order } from "./types";

const STORAGE_KEY = "amazon-clone-last-order";

export function generateOrderNumber(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `AMZ-${datePart}-${random}`;
}

export function saveLastOrder(order: Order): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // Storage may be unavailable — the confirmation page has a fallback.
  }
}

export function getLastOrder(): Order | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Order;
  } catch {
    return null;
  }
}
