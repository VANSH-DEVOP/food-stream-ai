"use client";
import Navbar from "@/components/layout/navbar";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import CartDrawer from "@/components/layout/cart-drawer";
import FloatingCartButton from "@/components/layout/floating-cart-button";
import { CartItem } from "@/types";
import { useOrders } from "@/hooks/useOrders";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function OrdersPage() {
    
    const {
        user,
        selectedProfile,
        isLoading,
    } = useAuthGuard();


    const {
        orders,
        loading,
    } = useOrders(user?.uid);

    const addMultipleToCart =
    useCartStore(
        (state) =>
        state.addMultipleToCart
    );

    const openCart = useUIStore(
    (state) => state.openCart
    );

    if (isLoading || loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-black text-white">
            Loading...
            </main>
        );
    }

  return (
    <main className="min-h-screen bg-black px-6 pb-20 pt-24 text-white">
      <Navbar />
      <CartDrawer />

      <FloatingCartButton />

      <h1 className="mb-10 text-4xl font-bold">
        Your Orders
      </h1>

      {orders.length === 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
                <h2 className="text-2xl font-bold">
                    No Orders Yet
                </h2>

                <p className="mt-2 text-zinc-400">
                    Start exploring and place your first order.
                </p>
            </div>
        )}

      { orders.length > 0 && (
        <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                {order.profileName}
                </h2>

                <span className="text-orange-500">
                ₹{order.total}
                </span>
            </div>

            <div className="space-y-2">
                {order.items.map(
                (item: CartItem) => (
                    <div
                    key={item.id}
                    className="flex justify-between"
                    >
                    <span>
                        {item.name}
                    </span>

                    <span>
                        x{item.quantity}
                    </span>
                    </div>
                )
                )}
            </div>

            <button
                onClick={() => {
                addMultipleToCart(
                    order.items
                );

                openCart();
                }}
                className="mt-4 rounded-lg bg-orange-500 px-4 py-2 font-semibold text-black"
            >
                Reorder
            </button>
            </div>
        ))}
      </div>)}
    </main>
  );
}