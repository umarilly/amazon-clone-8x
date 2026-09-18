import type { Order } from "./types";

const LAST_ORDER_KEY = "amazon-clone-last-order";
const HISTORY_KEY = "amazon-clone-orders";

export function generateOrderNumber(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `AMZ-${datePart}-${random}`;
}

export function saveLastOrder(order: Order): void {
  try {
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
    const historyRaw = localStorage.getItem(HISTORY_KEY);
    const history: Order[] = historyRaw ? JSON.parse(historyRaw) : [];
    localStorage.setItem(HISTORY_KEY, JSON.stringify([order, ...history]));
  } catch {
    // Storage may be unavailable — the confirmation/orders pages have fallbacks.
  }
}

export function getLastOrder(): Order | null {
  try {
    const raw = localStorage.getItem(LAST_ORDER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Order;
  } catch {
    return null;
  }
}

export function getOrderHistory(): Order[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}
