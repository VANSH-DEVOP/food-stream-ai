"use client";

import { useState,useEffect } from "react";
import AddFoodModal from "@/components/admin/add-food-modal";
import Navbar from "@/components/layout/navbar";
import { useAuthStore } from "@/store/auth-store";
import { useAllOrders } from "@/hooks/useAllOrders";
import {
  getRecentOrders
} from "@/services/admin-analytics-service";
import { useAdminFoods } from "@/hooks/useAdminFoods";
import { deleteFood } from "@/services/food-service";
import EditFoodModal
from "@/components/admin/edit-food-modal";
import { FoodItem} from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FoodManagement from "@/components/admin/FoodManagement";
import OrderManagement from "@/components/admin/order-management";
import DashboardStats from "@/components/admin/DashboardStats";
import DeleteFoodModal from "@/components/admin/delete-food-modal";

export default function AdminPage() {

  const router = useRouter();

  const user = useAuthStore(
    (state) => state.user
  );

  const {
    orders,
    loading,
  } = useAllOrders();

  const {
    foods,
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

  const recentOrders =
  getRecentOrders(
    orders
  );

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

      <DeleteFoodModal
        food={foodToDelete}
        onClose={() =>
            setFoodToDelete(null)
        }
        onDelete={async () => {

            if (!foodToDelete) {
            return;
            }

            await deleteFood(
            foodToDelete.id
            );

            toast.success(
            "Food item deleted."
            );

            setFoodToDelete(null);

        }}
      />

      <Navbar />

      <h1 className="mb-10 text-4xl font-bold">
        Admin Dashboard
      </h1>

        <DashboardStats
        orders={orders}
        foods={foods}
        />

        <FoodManagement
            foods={foods}
            onEdit={(food) => {
                setSelectedFood(food);
                setShowEditModal(true);
            }}
            onDelete={setFoodToDelete}
            onAdd={() =>
                setShowAddModal(true)
            }
        />

        <OrderManagement
        orders={recentOrders}
        />

        <EditFoodModal
            food={selectedFood}
            isOpen={showEditModal}
            onClose={() =>
                setShowEditModal(false)
            }
        />

        <AddFoodModal
            isOpen={showAddModal}
            onClose={() =>
                setShowAddModal(false)
            }
        />

    </main>
  );
}