"use client";

import { FoodItem } from "@/types";

interface DeleteFoodModalProps {
  food: FoodItem | null;

  onClose: () => void;

  onDelete: () => Promise<void>;
}

export default function DeleteFoodModal({
  food,
  onClose,
  onDelete,
}: DeleteFoodModalProps) {

  if (!food) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6">

        <h2 className="text-xl font-bold">
          Delete Food
        </h2>

        <p className="mt-3 text-zinc-400">
          Are you sure you want to delete
          <span className="font-semibold text-white">
            {" "}
            {food.name}
          </span>
          ?
        </p>

        <div className="mt-6 flex gap-3">

          <button
          aria-label="cancel delete button"
          type="button"
            onClick={onClose}
            className="flex-1 rounded-lg bg-zinc-700 p-3"
          >
            Cancel
          </button>

          <button
          aria-label="delete button"
          type="button"
            onClick={onDelete}
            className="flex-1 rounded-lg bg-red-500 p-3 font-semibold transition hover:bg-red-600"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}