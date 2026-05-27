"use client";

import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { placeOrder } from "@/services/order-service";
import { useAuthStore } from "@/store/auth-store";

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

    const user = useAuthStore(
    (state) => state.user
    );

    const selectedProfile =
    useAuthStore(
        (state) =>
        state.selectedProfile
    );

    const clearCart = useCartStore(
    (state) => state.clearCart
    );

    const closeCart = useUIStore(
    (state) => state.closeCart
    );

    const subtotal = items.reduce(
    (total, item) =>
        total +
        item.price * item.quantity,
    0
    );

    const deliveryFee = 49;

    const total =
    subtotal + deliveryFee;

    async function handlePlaceOrder() {
    if (
        !user ||
        !selectedProfile ||
        items.length === 0
    ) {
        return;
    }

    await placeOrder({
        userId: user.uid,

        profileId:
        selectedProfile.id,

        profileName:
        selectedProfile.name,

        items,

        subtotal,

        deliveryFee,

        total,
    });

    clearCart();

    closeCart();

    alert(
        "Order placed successfully!"
    );
    }

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

        {items.length === 0 && (
        <div className="mt-10 text-center text-zinc-400">
            Your cart is empty.
        </div>
        )}

    {items.length > 0 && (
            <>
        <div className="mt-6 border-t border-zinc-800 pt-4">
        <div className="mb-2 flex justify-between">
            <span>Subtotal</span>

            <span>
            ₹{subtotal}
            </span>
        </div>

        <div className="mb-2 flex justify-between">
            <span>Delivery</span>

            <span>
            ₹{deliveryFee}
            </span>
        </div>

        <div className="flex justify-between text-xl font-bold">
            <span>Total</span>

            <span>
            ₹{total}
            </span>
        </div>

        <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full rounded-xl bg-orange-500 p-3 font-bold text-black transition hover:bg-orange-400"
        >
        Place Order
        </button>
      </div>
      </>
    )}
      </div>
    </div>
  );
}