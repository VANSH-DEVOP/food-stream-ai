"use client";

import Navbar from "@/components/layout/navbar";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import CartDrawer from "@/components/layout/cart-drawer";
import FloatingCartButton from "@/components/layout/floating-cart-button";
import { CartItem } from "@/types";
import { useOrders } from "@/hooks/useOrders";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import OrderSummaryModal from "@/components/order/order-summary-modal";
import { useProfiles } from "@/hooks/useProfiles";
import OrderStatusBadge from "@/components/order/order-status-badge";

export default function OrdersPage() {
  const {
    user,
    isLoading,
  } = useAuthGuard();

  const {
    profiles,
  } = useProfiles(user?.uid);

  const {
    orders,
    loading,
  } = useOrders(user?.uid);

  const addMultipleToCart =
    useCartStore(
      (state) =>
        state.addMultipleToCart
    );

  const openCart =
    useUIStore(
      (state) =>
        state.openCart
    );

  if (
    isLoading ||
    loading
  ) {
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
      <OrderSummaryModal />
      <FloatingCartButton />

      <h1 className="mb-10 text-4xl font-bold">
        Your Orders
      </h1>

      {orders.length === 0 && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <h2 className="text-2xl font-bold">
            🍽️ No Orders Yet
          </h2>

          <p className="mt-2 text-zinc-400">
            Your previous orders will appear here.
          </p>

          <p className="mt-2 text-zinc-400">
            Start exploring and place your first order.
          </p>
        </div>
      )}

      {orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => {

            const groupedItems =
              order.items.reduce(
                (acc, item) => {
                  if (
                    !acc[
                      item.profileName
                    ]
                  ) {
                    acc[
                      item.profileName
                    ] = [];
                  }

                  acc[
                    item.profileName
                  ].push(item);

                  return acc;
                },
                {} as Record<
                  string,
                  CartItem[]
                >
              );

            return (
              <div
                key={order.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Order #{order.id?.slice(-6)}
                    </h2>

                    <div className="mt-2">
                      <OrderStatusBadge
                        status={
                          order.status ??
                          "Pending"
                        }
                      />
                    </div>
                  </div>

                  <span className="text-2xl font-bold text-orange-500">
                    ₹{order.total}
                  </span>
                </div>

                {order.createdAt?.seconds && (
                  <p className="mb-4 text-sm text-zinc-400">
                    {new Date(
                      order.createdAt.seconds *
                        1000
                    ).toLocaleDateString()}
                  </p>
                )}

                {Object.entries(
                  groupedItems
                ).map(
                  ([
                    profileName,
                    profileItems,
                  ]) => (
                    <div
                      key={
                        profileName
                      }
                      className="mb-4"
                    >
                      <h3 className="mb-2 font-bold text-orange-500">
                        {
                          profileName
                        }
                      </h3>

                      {profileItems.map(
                        (item) => (
                          <div
                            key={`${item.id}-${item.profileId}`}
                            className="flex justify-between"
                          >
                            <span>
                              {
                                item.name
                              }
                            </span>

                            <span>
                              x
                              {
                                item.quantity
                              }
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )
                )}

                <div className="mt-6 border-t border-zinc-800 pt-4">
                    <div className="flex justify-between">
                        <span>
                        Subtotal
                        </span>

                        <span>
                        ₹{order.subtotal}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>
                        Delivery
                        </span>

                        <span>
                        ₹{order.deliveryFee}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>
                        GST
                        </span>

                        <span>
                        ₹{order.gst}
                        </span>
                    </div>

                    <div className="mt-2 flex justify-between text-lg font-bold">
                        <span>
                        Total
                        </span>

                        <span>
                        ₹{order.total}
                        </span>
                    </div>
                </div>

                <button
                  onClick={() => {

                    const validItems =
                      order.items.filter(
                        (item) =>
                          profiles.some(
                            (profile) =>
                              profile.id ===
                              item.profileId
                          )
                      );

                    if (
                      validItems.length === 0
                    ) {
                      alert(
                        "All profiles from this order have been deleted."
                      );

                      return;
                    }

                    if (
                      validItems.length <
                      order.items.length
                    ) {
                      alert(
                        `${
                          order.items.length -
                          validItems.length
                        } item(s) were skipped because their profile no longer exists.`
                      );
                    }

                    addMultipleToCart(
                      validItems
                    );

                    openCart();
                  }}
                  className="mt-6 w-full rounded-xl bg-orange-500 p-3 font-bold text-black"
                >
                  Reorder all items
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}