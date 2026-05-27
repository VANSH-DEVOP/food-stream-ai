"use client";

import { useCartStore } from "@/store/cart-store";

import { useUIStore } from "@/store/ui-store";

export default function FloatingCartButton() {
  const items = useCartStore(
    (state) => state.items
  );

  const toggleCart = useUIStore(
    (state) => state.toggleCart
  );

  const totalItems = items.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const isCartOpen =
  useUIStore(
    (state) =>
      state.isCartOpen
  );

  if (isCartOpen) return null;

  return (
    <button
      onClick={toggleCart}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-500 px-6 py-4 text-lg font-bold text-black shadow-2xl transition hover:scale-105 hover:bg-orange-400"
    >
      🛒 Cart ({totalItems})
    </button>
  );
}