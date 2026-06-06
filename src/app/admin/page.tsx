"use client";

import { useState,useEffect } from "react";
import AddFoodModal from "@/components/admin/add-food-modal";
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
import { updateOrderStatus } from "@/services/order-service";
import { useAdminFoods } from "@/hooks/useAdminFoods";
import { updateFood,deleteFood } from "@/services/food-service";
import EditFoodModal
from "@/components/admin/edit-food-modal";
import { FoodItem,OrderStatus }
from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminPage() {

  const router = useRouter();

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

  const {
    foods,
    refreshFoods,
    
  } = useAdminFoods();

  const isLoading = useAuthStore(
    (state) => state.isLoading
    );

  const [showAddModal,
    setShowAddModal] =
    useState(false);

  const [showEditModal,
    setShowEditModal] =
    useState(false);

  const [selectedFood,
    setSelectedFood] =
    useState<FoodItem | null>(
        null
    );

  const [foodToDelete, setFoodToDelete] =
    useState<FoodItem | null>(
        null
  );

  const [search,setSearch] = useState("");

  const recentOrders =
  getRecentOrders(
    orders
  );

  const [
    orderSearch,
    setOrderSearch
    ] = useState("");

  const filteredRecentOrders =
  recentOrders.filter(
    (order) =>
      order.id
        ?.toLowerCase()
        .includes(
          orderSearch.toLowerCase()
        )
  );

  const filteredFoods =
  foods.filter((food) =>
    food.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );

  const availableFoods =
  foods.filter(
    (food) =>
      food.isAvailable
  ).length;

  const unavailableFoods =
    foods.length -
    availableFoods;

  useEffect(() => {
    if (!loading) {
        if (!user) {
        router.push("/login");
        return;
        }

        if (user.role !== "admin") {
        router.push("/home");
        }
    }
    }, [user, loading, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </main>
    );
  }

   if (!user || user.role !== "admin") {
       return null;
    }

  return (
    <main className="min-h-screen bg-black px-6 pt-24 text-white">

      {
        foodToDelete && (

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

            <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6">

                <h2 className="text-xl font-bold">
                Delete Food
                </h2>

                <p className="mt-3 text-zinc-400">
                Are you sure you want to delete
                <span className="font-semibold text-white">
                    {" "}
                    {foodToDelete.name}
                </span>
                ?
                </p>

                <div className="mt-6 flex gap-3">

                <button
                    onClick={() =>
                    setFoodToDelete(
                        null
                    )
                    }
                    className="flex-1 rounded-lg bg-zinc-700 p-3"
                >
                    Cancel
                </button>

                <button
                    onClick={async () => {

                    await deleteFood(
                        foodToDelete.id
                    );

                    await refreshFoods();
                    toast.success("Food item deleted.");

                    setFoodToDelete(
                        null
                    );
                    }}
                    className="flex-1 rounded-lg bg-red-500 p-3 font-semibold transition hover:bg-red-600"
                >
                    Delete
                </button>

                </div>

            </div>

            </div>

        )
      }

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

        <div className="mt-10 rounded-2xl bg-zinc-900 p-6">
            <div className="mb-6 flex flex-wrap items-center gap-4">

                <h2 className="whitespace-nowrap text-2xl font-bold">
                    Food Management
                </h2>

                 <input
                    type="text"
                    placeholder="Search foods..."
                    value={search}
                    onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                    }
                    className="flex-1 rounded-lg bg-zinc-800 px-4 py-2"
                />

                <button
                onClick={() =>
                    setShowAddModal(true)
                }
                className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-black transition hover:scale-105 hover:bg-orange-400"
                >
                    Add Food
                </button>

            </div>

            <div className="relative">
                <div className="max-h-[500px] space-y-3 overflow-y-auto food-scroll pr-2">

                    {filteredFoods.map((food) => (
                    <div
                        key={food.id}
                        className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
                    >
                        <div>
                            <p className="font-semibold text-lg">
                                {food.name}
                            </p>

                            <p className="mt-2 text-sm text-zinc-400">
                                {food.category}
                                {" • "}
                                {food.cuisine}
                                {" • "}
                                {food.spiceLevel}
                                {" • "}
                                ₹{food.price}
                            </p>
                        </div>

                        <div className="flex gap-2">

                        <button
                        onClick={async () => {

                            await updateFood(
                            food.id,
                            {
                                isAvailable:
                                !food.isAvailable,
                            }
                            );

                            await refreshFoods();

                        }}
                        className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:scale-105 ${
                            food.isAvailable
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            }`}
                        >
                        {food.isAvailable
                            ? "● Available"
                            : "○ Unavailable"}
                        </button>

                        <button
                            className="rounded-lg bg-blue-500 px-3 py-2 transition hover:bg-blue-600 hover:scale-105"
                            onClick={() => {

                                setSelectedFood(
                                food
                                );

                                setShowEditModal(
                                true
                                );

                            }}
                        >
                            Edit
                        </button>

                        <button
                        onClick={() =>
                            setFoodToDelete(food)
                        }
                        className="rounded-lg bg-red-500 px-3 py-2 transition hover:scale-105 hover:bg-red-600"
                        >
                            Delete
                        </button>

                        </div>
                    </div>
                    ))}

                </div>
            </div>

        </div>

        <div className="mt-6 rounded-2xl bg-zinc-900 p-6">

            <div className="mb-4 flex items-center gap-4">

                <h2 className="text-2xl font-bold">
                Order Management
                </h2>

                <input
                value={orderSearch}
                onChange={(e) =>
                    setOrderSearch(
                    e.target.value
                    )
                }
                placeholder="Search orders..."
                className="flex-1 rounded-lg bg-zinc-800 px-4 py-2"
                />

            </div>

            <div className="max-h-[450px] space-y-4 overflow-y-auto food-scroll pr-2">

                {filteredRecentOrders.map(
                (order) => (

                    <div
                    key={order.id}
                    className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
                    >

                    <div>
                        <p className="font-semibold">
                        #{order.id?.slice(-6)}
                        </p>

                        <p className="text-sm text-zinc-400">
                        ₹{order.total}
                        </p>

                        <p className="text-xs text-green-400">
                        {order.paymentStatus}
                        </p>
                    </div>

                    <select
                        value={order.status}
                        onChange={async (e) => {

                        await updateOrderStatus(
                            order.id!,
                            e.target.value as OrderStatus
                        );

                        await refreshOrders();

                        }}
                        className="cursor-pointer rounded-lg bg-zinc-800 px-3 py-2 transition hover:bg-zinc-700"
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

        <EditFoodModal
            food={selectedFood}
            isOpen={showEditModal}
            onClose={() =>
                setShowEditModal(false)
            }
            refreshFoods={refreshFoods}
        />

        <AddFoodModal
            isOpen={showAddModal}
            onClose={() =>
                setShowAddModal(false)
            }
            refreshFoods={refreshFoods}
        />

    </main>
  );
}