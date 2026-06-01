"use client";

import { useOrders } from "@/hooks/useOrders";
import { useAuthGuard } from "@/hooks/useAuthGuard";

import {
  getTotalRevenue,
  getTotalOrderCount,
  getTopProfiles,
  getTopFoods,
} from "@/services/admin-analytics-service";

export default function AnalyticsPage() {
  const {
    user,
    isLoading,
  } = useAuthGuard();

  const {
    orders,
    loading,
  } = useOrders(
    user?.uid ?? ""
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

  const totalRevenue =
    getTotalRevenue(
      orders
    );

  const totalOrders =
    getTotalOrderCount(
      orders
    );

  const topFoods =
    getTopFoods(
      orders
    );

  const topProfiles =
    getTopProfiles(
      orders
    );

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold">
        Analytics Dashboard
      </h1>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">
            Total Orders
          </h2>

          <p className="mt-2 text-3xl text-orange-500">
            {totalOrders}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">
            Total Revenue
          </h2>

          <p className="mt-2 text-3xl text-orange-500">
            ₹{totalRevenue}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="mb-4 text-2xl font-bold">
            Top Foods
          </h2>

          <div className="space-y-2">
            {topFoods.map(
              ([food, count]) => (
                <div
                  key={food}
                  className="flex justify-between"
                >
                  <span>
                    {food}
                  </span>

                  <span>
                    {count}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="mb-4 text-2xl font-bold">
            Top Profiles
          </h2>

          <div className="space-y-2">
            {topProfiles.map(
              ([profile, count]) => (
                <div
                  key={profile}
                  className="flex justify-between"
                >
                  <span>
                    {profile}
                  </span>

                  <span>
                    {count}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

      </div>
    </main>
  );
}