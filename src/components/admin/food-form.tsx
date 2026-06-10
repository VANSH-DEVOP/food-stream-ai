"use client";

import { useState } from "react";
import { FoodItem } from "@/types";
import { toast } from "sonner";

interface FoodFormProps {
  initialData?: Partial<FoodItem>;

  submitText: string;

  onSubmit: (
    food: Omit<FoodItem, "id">
  ) => Promise<void>;
}

export default function FoodForm({
  initialData,
  submitText,
  onSubmit,
}: FoodFormProps) {

  const [name, setName] =
    useState(
      initialData?.name ?? ""
    );

  const [description, setDescription] =
    useState(
      initialData?.description ?? ""
    );

  const [price, setPrice] =
    useState(
      String(
        initialData?.price ?? ""
      )
    );

  const [category, setCategory] =
    useState(
      initialData?.category ?? "Veg"
    );

  const [cuisine, setCuisine] =
    useState(
      initialData?.cuisine ?? "Indian"
    );

  const [spiceLevel, setSpiceLevel] =
    useState(
      initialData?.spiceLevel ?? "Mild"
    );

  const [image, setImage] =
    useState(
      initialData?.image ?? ""
    );

  const [tags, setTags] =
    useState(
      initialData?.tags?.join(", ") ?? ""
    );

  const [isAvailable,
  setIsAvailable] =
    useState(
      initialData?.isAvailable ?? true
    );

  async function handleSubmit() {

    if (
      name.trim().length < 3
    ) {
      toast.error(
        "Food name too short"
      );
      return;
    }

    if (
      description
        .trim()
        .length < 10
    ) {
      toast.error(
        "Description too short"
      );
      return;
    }

    if (
      Number(price) <= 0
    ) {
      toast.error(
        "Invalid price"
      );
      return;
    }

    if (
      !image.trim()
    ) {
      toast.error(
        "Image URL required"
      );
      return;
    }

    await onSubmit({
      name: name.trim(),
      description:
        description.trim(),

      category,
      cuisine,
      spiceLevel,

      tags:
        tags
          .split(",")
          .map(
            (tag) =>
              tag.trim()
          )
          .filter(Boolean),

      price:
        Number(price),

      image,

      isAvailable,
    });
  }

  return (
    <div className="space-y-4">

        <input
        aria-label="Enter Food Name"
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
        aria-label="Food Description"
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
        aria-label="Enter Price"
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
        aria-label="Enter Img-url"
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
        aria-label="Enter Tags"
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
        aria-label="Availability"
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

        <button
        aria-label="submit food button"
        type="button"
        onClick={handleSubmit}
        className="mt-6 w-full rounded-lg bg-orange-500 p-3 font-semibold text-black"
        >
            {submitText}
        </button>

    </div>
  );
}