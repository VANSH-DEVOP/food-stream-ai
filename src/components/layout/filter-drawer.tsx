"use client";

import { useFilterStore } from "@/store/filter-store";
import { useUIStore } from "@/store/ui-store";

export default function FilterDrawer() {
  const {
    category,
    cuisine,
    spiceLevel,
    setCategory,
    setCuisine,
    setSpiceLevel,
    resetFilters,
  } = useFilterStore();

  const isFilterOpen =
    useUIStore(
        (state) =>
        state.isFilterOpen
    );

  const closeFilter =
    useUIStore(
        (state) =>
        state.closeFilter
    );

    if (!isFilterOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex bg-black/50">
    <div className="h-full w-[320px] border-r border-zinc-800 bg-zinc-950 p-6 text-white">
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold">
                Filters
            </h2>

            <button
                onClick={closeFilter}
                className="rounded-lg px-3 py-1 text-2xl transition hover:bg-zinc-800"
            >
                ✕
            </button>
        </div>

      <div className="space-y-6">
        <div>
          <p className="mb-2 font-semibold">
            Category
          </p>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full rounded-lg bg-zinc-900 p-3"
          >
            <option value="All">
              All
            </option>

            <option value="Veg">
              Veg
            </option>

            <option value="Non-Veg">
              Non-Veg
            </option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-semibold">
            Cuisine
          </p>

          <select
            value={cuisine}
            onChange={(e) =>
              setCuisine(
                e.target.value
              )
            }
            className="w-full rounded-lg bg-zinc-900 p-3"
          >
            <option value="All">
              All
            </option>

            <option value="Indian">
              Indian
            </option>

            <option value="Chinese">
              Chinese
            </option>

            <option value="Italian">
              Italian
            </option>

            <option value="American">
              American
            </option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-semibold">
            Spice Level
          </p>

          <select
            value={spiceLevel}
            onChange={(e) =>
              setSpiceLevel(
                e.target.value
              )
            }
            className="w-full rounded-lg bg-zinc-900 p-3"
          >
            <option value="All">
              All
            </option>

            <option value="Mild">
              Mild
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Spicy">
              Spicy
            </option>
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="w-full rounded-lg bg-red-500 p-3 font-semibold"
        >
          Reset Filters
        </button>
      </div>
    </div>
    </div>
  );
}