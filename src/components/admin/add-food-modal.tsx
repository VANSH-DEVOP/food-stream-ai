"use client";

import { addFood, foodExists } from "@/services/food-service";
import { toast } from "sonner";
import FoodForm from "./food-form";
import { FoodItem } from "@/types";

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddFoodModal({
  isOpen,
  onClose,
}: AddFoodModalProps) {

  if (!isOpen) return null;

  async function handleAddFood(
    food: Omit<FoodItem, "id">
  ) {

    const exists =
      await foodExists(
        food.name
      );

    if (exists) {
      toast.error(
        "Food already exists"
      );
      return;
    }

    await addFood(food);

    toast.success(
      "Food Added Successfully"
    );

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-lg rounded-2xl bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Add Food
        </h2>

        <FoodForm
          submitText="Add Food"
          onSubmit={handleAddFood}
        />

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-zinc-700 p-3"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}