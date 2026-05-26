import { create } from "zustand";

interface FilterState {
  category: string;

  cuisine: string;

  spiceLevel: string;

  setCategory: (
    category: string
  ) => void;

  setCuisine: (
    cuisine: string
  ) => void;

  setSpiceLevel: (
    spiceLevel: string
  ) => void;

  resetFilters: () => void;
}

export const useFilterStore =
  create<FilterState>((set) => ({
    category: "All",

    cuisine: "All",

    spiceLevel: "All",

    setCategory: (category) =>
      set({ category }),

    setCuisine: (cuisine) =>
      set({ cuisine }),

    setSpiceLevel: (
      spiceLevel
    ) =>
      set({ spiceLevel }),

    resetFilters: () =>
      set({
        category: "All",
        cuisine: "All",
        spiceLevel: "All",
      }),
  }));