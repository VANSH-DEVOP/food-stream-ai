"use client";

import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";

export default function CartDrawer() {
  const items = useCartStore(
    (state) => state.items
  );

  const removeFromCart =
    useCartStore(
      (state) =>
        state.removeFromCart
    );

    const isCartOpen = useUIStore(
     (state) => state.isCartOpen
    );

    const closeCart = useUIStore(
     (state) => state.closeCart
    );
    const increaseQuantity =
    useCartStore(
        (state) =>
        state.increaseQuantity
    );

    const decreaseQuantity =
    useCartStore(
        (state) =>
        state.decreaseQuantity
    );

    if (!isCartOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold">
                Your Cart
            </h2>

            <button
                onClick={closeCart}
                className="text-2xl"
            >
                ✕
            </button>
        </div>
      <h2 className="mb-6 text-3xl font-bold">
        Your Cart
      </h2>

      <div className="h-full w-[350px] overflow-y-auto border-l border-zinc-800 bg-zinc-950 p-6 text-white">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-zinc-900 p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-full rounded-lg object-cover"
            />

            <h3 className="mt-3 text-lg font-semibold">
              {item.name}
            </h3>

            <p className="text-orange-500">
              ₹{item.price}
            </p>

            <div className="mt-3 flex items-center gap-3">
                <button
                    onClick={() =>
                    decreaseQuantity(item.id)
                    }
                    className="rounded bg-zinc-800 px-3 py-1"
                >
                    -
                </button>

                <span>{item.quantity}</span>

                <button
                    onClick={() =>
                    increaseQuantity(item.id)
                    }
                    className="rounded bg-zinc-800 px-3 py-1"
                >
                    +
                </button>
            </div>

            <button
              onClick={() =>
                removeFromCart(item.id)
              }
              className="mt-3 w-full rounded-lg bg-red-500 p-2 text-sm font-semibold text-white"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}