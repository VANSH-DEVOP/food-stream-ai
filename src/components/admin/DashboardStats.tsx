"use client";

import { FoodItem, Order } from "@/types";

import {
  getTotalRevenue,
  getTotalOrderCount,
  getAverageOrderValue,
  getTopFoods,
  getTopCustomers,
} from "@/services/admin-analytics-service";

interface DashboardStatsProps {
  orders: Order[];
  foods: FoodItem[];
}

export default function DashboardStats({
  orders,
  foods,
}: DashboardStatsProps) {

  const topFoods =
    getTopFoods(orders);

  const topCustomers =
    getTopCustomers(orders);

  const availableFoods =
    foods.filter(
      (food) => food.isAvailable
    ).length;

  const unavailableFoods =
    foods.length -
    availableFoods;

  return (
    <>
      {/* Revenue Cards */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-zinc-400">
            Total Revenue
          </h2>

          <p className="mt-2 text-3xl font-bold text-orange-500">
            ₹{getTotalRevenue(orders)}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-zinc-400">
            Total Orders
          </h2>

          <p className="mt-2 text-3xl font-bold text-orange-500">
            {getTotalOrderCount(orders)}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-zinc-400">
            Average Order Value
          </h2>

          <p className="mt-2 text-3xl font-bold text-orange-500">
            ₹{getAverageOrderValue(orders)}
          </p>
        </div>

      </div>

      {/* Top Foods + Top Customers */}

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-zinc-900 p-6">

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

        <div className="rounded-2xl bg-zinc-900 p-6">

          <h2 className="mb-4 text-2xl font-bold">
            Top Customers
          </h2>

          <div className="space-y-3">

            {topCustomers.map(
              ([customer, revenue]) => (
                <div
                  key={customer}
                  className="flex justify-between"
                >
                  <span>{customer}</span>

                  <span className="text-orange-500">
                    ₹{revenue}
                  </span>
                </div>
              )
            )}

          </div>

        </div>

      </div>

      {/* Food Stats */}

      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Total Foods
          </p>

          <p className="mt-2 text-3xl font-bold text-orange-500">
            {foods.length}
          </p>

        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Available
          </p>

          <p className="mt-2 text-3xl font-bold text-green-500">
            {availableFoods}
          </p>

        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Unavailable
          </p>

          <p className="mt-2 text-3xl font-bold text-red-500">
            {unavailableFoods}
          </p>

        </div>

      </div>
    </>
  );
}