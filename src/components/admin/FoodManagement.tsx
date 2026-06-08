import { useState } from "react";
import { FoodItem } from "@/types";
import { updateFood } from "@/services/food-service";

interface FoodManagementProps {
  foods: FoodItem[];

  onEdit: (
    food: FoodItem
  ) => void;

  onDelete: (
    food: FoodItem
  ) => void;

  onAdd: () => void;
}

export default function FoodManagement({
  foods,
  onEdit,
  onDelete,
  onAdd,
}: FoodManagementProps) {


    const [search,setSearch] = useState("");

    const filteredFoods =
    foods.filter((food) =>
        food.name
        .toLowerCase()
        .includes(
            search.toLowerCase()
        )
    );

    return(
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
                    onAdd
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
                                onEdit(food)
                            }}
                        >
                            Edit
                        </button>

                        <button
                        onClick={() =>
                            onDelete(food)
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
    );
}