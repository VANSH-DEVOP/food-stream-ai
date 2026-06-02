"use client";

import Navbar from "@/components/layout/navbar";
import { useAuthStore } from "@/store/auth-store";
import { useAllOrders } from "@/hooks/useAllOrders";
import {
  getTotalRevenue,
  getTotalOrderCount,
  getAverageOrderValue,
  getTopFoods,
  getTopCustomers,
  getRecentOrders
} from "@/services/admin-analytics-service";
import { ADMIN_EMAIL } from "@/constants/admin";
import { updateOrderStatus } from "@/services/order-service";

export default function AdminPage() {

  const user = useAuthStore(
    (state) => state.user
  );

  const {
    orders,
    loading,
    refreshOrders,
  } = useAllOrders();

  const topFoods =
  getTopFoods(orders);

  const topCustomers =
  getTopCustomers(
    orders
  );

  const recentOrders =
  getRecentOrders(
    orders
  );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </main>
    );
  }

    if (
    !user ||
    user.email !== ADMIN_EMAIL
    ) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Access Denied
        </main>
    );
    }

  return (
    <main className="min-h-screen bg-black px-6 pt-24 text-white">
      <Navbar />

      <h1 className="mb-10 text-4xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-zinc-400">
            Total Revenue
          </h2>

          <p className="mt-2 text-3xl font-bold text-orange-500">
            ₹{
              getTotalRevenue(
                orders
              )
            }
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-zinc-400">
            Total Orders
          </h2>

          <p className="mt-2 text-3xl font-bold text-orange-500">
            {
              getTotalOrderCount(
                orders
              )
            }
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
            <h2 className="text-zinc-400">
                Average Order Value
            </h2>

            <p className="mt-2 text-3xl font-bold text-orange-500">
                ₹{
                getAverageOrderValue(
                    orders
                )
                }
            </p>
        </div>

      </div>


        <div className="grid gap-6 md:grid-cols-2">

            <div className="mt-10 rounded-2xl bg-zinc-900 p-6">
                <h2 className="mb-4 text-2xl font-bold">
                    Top Foods
                </h2>

                <div className="space-y-3">
                    {topFoods.map(
                    ([food, count]) => (
                        <div
                        key={food}
                        className="flex justify-between"
                        >
                        <span>{food}</span>

                        <span className="text-orange-500">
                            {count}
                        </span>
                        </div>
                    )
                    )}
                </div>
            </div>

             <div className="mt-6 rounded-2xl bg-zinc-900 p-6">
                <h2 className="mb-4 text-2xl font-bold">
                    Top Customers
                </h2>

                <div className="space-y-3">
                    {topCustomers.map(
                    ([customer, Revenue]) => (
                        <div
                        key={customer}
                        className="flex justify-between"
                        >
                        <span>
                            {customer}
                        </span>

                        <span className="text-orange-500">
                            ₹{Revenue}
                        </span>
                        </div>
                    )
                    )}
                </div>
            </div>

        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">

            {/* Recent Orders */}

            <div className="rounded-2xl bg-zinc-900 p-6">
                <h2 className="mb-4 text-2xl font-bold">
                Recent Orders
                </h2>

                <div className="space-y-3">
                {recentOrders.map(
                    (order) => (
                    <div
                        key={order.id}
                        className="flex items-center justify-between border-b border-zinc-800 py-3"
                    >
                        <div>
                        <p className="font-medium">
                            #{order.id?.slice(-6)}
                        </p>

                        <p className="text-sm text-zinc-500">
                            {order.status}
                        </p>

                        <p className="text-xs text-green-400">
                            {order.paymentStatus}
                        </p>
                        </div>

                        <span className="font-semibold text-orange-500">
                        ₹{order.total}
                        </span>
                    </div>
                    )
                )}
                </div>
            </div>

            {/* Order Management */}

            <div className="rounded-2xl bg-zinc-900 p-6">
                <h2 className="mb-4 text-2xl font-bold">
                Order Management
                </h2>

                <div className="space-y-4">
                {recentOrders.map(
                    (order) => (
                    <div
                        key={order.id}
                        className="flex items-center justify-between"
                    >
                        <div>
                        <p className="font-semibold">
                            #{order.id?.slice(-6)}
                        </p>

                        <p className="text-sm text-zinc-400">
                            ₹{order.total}
                        </p>
                        </div>

                        <select
                        value={order.status}
                        onChange={async (e) => {
                            await updateOrderStatus(
                            order.id!,
                            e.target.value as any
                            );

                            await refreshOrders();
                        }}
                        className="rounded-lg bg-zinc-800 px-3 py-2"
                        >
                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Preparing">
                            Preparing
                        </option>

                        <option value="Out For Delivery">
                            Out For Delivery
                        </option>

                        <option value="Delivered">
                            Delivered
                        </option>
                        </select>
                    </div>
                    )
                )}
                </div>
            </div>

        </div>

    </main>
  );
}