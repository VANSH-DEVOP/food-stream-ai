"use client";

import FoodForm from "./food-form";
import {
  updateFood,
  foodExistsExceptCurrent
} from "@/services/food-service";
import { FoodItem } from "@/types";
import { toast } from "sonner";

interface EditFoodModalProps {
  food: FoodItem | null;

  isOpen: boolean;

  onClose: () => void;

}

export default function EditFoodModal({
  food,
  isOpen,
  onClose,
}: EditFoodModalProps) {

  

  if (!isOpen) return null;

async function handleEditFood(
    updatedFood: Omit<
      FoodItem,
      "id"
    >
  ) {

    if (!food) return;

    const exists =
      await foodExistsExceptCurrent(
        updatedFood.name,
        food.id
      );

    if (exists) {

      toast.error(
        "Another food with this name already exists."
      );

      return;
    }

    await updateFood(
      food.id,
      updatedFood
    );

    toast.success(
      "Food Updated Successfully."
    );

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-lg rounded-2xl bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Edit Food
        </h2>

          <FoodForm
            initialData={food ?? undefined}
            submitText="Save Changes"
            onSubmit={handleEditFood}
          />       

          <button
          aria-label="cencel editfood button"
          type="button"
            onClick={onClose}
            className="mt-4 w-full rounded-lg bg-zinc-700 p-3"
          >
            Cancel
          </button>

      </div>

    </div>
  );
}