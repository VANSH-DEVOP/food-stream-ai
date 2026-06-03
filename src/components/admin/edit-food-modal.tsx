"use client";

import { useState,useEffect } from "react";
import {
  updateFood,
  foodExistsExceptCurrent
} from "@/services/food-service";
import { FoodItem } from "@/types";

interface EditFoodModalProps {
  food: FoodItem | null;

  isOpen: boolean;

  onClose: () => void;

  refreshFoods: () => Promise<void>;
}

export default function EditFoodModal({
  food,
  isOpen,
  onClose,
  refreshFoods,
}: EditFoodModalProps) {

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
  useState("Veg");

  const [cuisine, setCuisine] =
    useState("Indian");

  const [spiceLevel, setSpiceLevel] =
    useState("Mild");

  const [image, setImage] =
    useState("");

  const [tags, setTags] =
    useState("");

  const [isAvailable, setIsAvailable] =
    useState(true);

  const [error, setError] =
  useState("");

  useEffect(() => {

  if (!food) return;

  setName(food.name);

  setDescription(
    food.description
  );

  setPrice(
    String(food.price)
  );

  setCategory(
    food.category
  );

  setCuisine(
    food.cuisine
  );

  setSpiceLevel(
    food.spiceLevel
  );

  setImage(
    food.image
  );

  setTags(
    food.tags.join(", ")
  );

  setIsAvailable(
    food.isAvailable ?? true
  );

}, [food]);

  if (!isOpen) return null;

  async function handleSubmit() {

  if(!food) return;

  if (
    !name.trim() ||
    !description.trim() ||
    !image.trim() ||
    Number(price) <= 0 ||
    !tags.trim()
  ) {
    setError(
      "Please fill all required fields."
    );

    return;
  }

  const exists =
    await foodExistsExceptCurrent(
        name,
        food.id
    );

  if (exists) {

    setError(
        "Another food with this name already exists."
    );

    return;
  }

  await updateFood(
  food!.id,
  {
    name,
    description,

    category,
    cuisine,
    spiceLevel,

    tags: tags
      .split(",")
      .map((tag) =>
        tag.trim()
      )
      .filter(Boolean),

    price: Number(price),

    image,

    isAvailable,
  }
);

  await refreshFoods();

  setName("");
  setDescription("");
  setPrice("");
  setImage("");
  setTags("");
  setError("");

  onClose();
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-lg rounded-2xl bg-zinc-900 p-6">

        {
          error && (
            <p className="text-red-500">
              {error}
            </p>
          )
        }

        <h2 className="mb-6 text-2xl font-bold">
          Edit Food
        </h2>

        <div className="space-y-4">

          <input
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            placeholder="Food Name"
            className="w-full rounded-lg bg-zinc-800 p-3"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Description"
            className="w-full rounded-lg bg-zinc-800 p-3"
          />

          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            placeholder="Price"
            className="w-full rounded-lg bg-zinc-800 p-3"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full rounded-lg bg-zinc-800 p-3"
          >
            <option>Veg</option>
            <option>Non-Veg</option>
          </select>

          <select
            value={cuisine}
            onChange={(e) =>
              setCuisine(
                e.target.value
              )
            }
            className="w-full rounded-lg bg-zinc-800 p-3"
          >
            <option>Indian</option>
            <option>Chinese</option>
            <option>Italian</option>
            <option>American</option>
            <option>Mexican</option>
          </select>

          <select
            value={spiceLevel}
            onChange={(e) =>
              setSpiceLevel(
                e.target.value
              )
            }
            className="w-full rounded-lg bg-zinc-800 p-3"
          >
            <option>Mild</option>
            <option>Medium</option>
            <option>Spicy</option>
          </select>

          <input
            value={image}
            onChange={(e) =>
              setImage(
                e.target.value
              )
            }
            placeholder="Image URL"
            className="w-full rounded-lg bg-zinc-800 p-3"
          />

          <input
            value={tags}
            onChange={(e) =>
              setTags(
                e.target.value
              )
            }
            placeholder="Popular, Healthy, Kids"
            className="w-full rounded-lg bg-zinc-800 p-3"
          />

          <label className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) =>
              setIsAvailable(
                e.target.checked
              )
            }
          />

          Available
        </label>

        </div>

        <div className="mt-6 flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-zinc-700 p-3"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 rounded-lg bg-orange-500 p-3 font-semibold text-black"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}