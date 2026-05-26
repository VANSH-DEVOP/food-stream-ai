import { create } from "zustand";

interface UIState {
  isCartOpen: boolean;

  toggleCart: () => void;

  closeCart: () => void;
  isFilterOpen: boolean;

  toggleFilter: () => void;

  closeFilter: () => void;
}

export const useUIStore =
  create<UIState>((set) => ({
    isCartOpen: false,
    isFilterOpen: false,

    toggleCart: () =>
      set((state) => ({
        isCartOpen:
          !state.isCartOpen,
      })),

    closeCart: () =>
      set({
        isCartOpen: false,
      }),

    toggleFilter: () =>
    set((state) => ({
        isFilterOpen:
        !state.isFilterOpen,
    })),

    closeFilter: () =>
    set({
        isFilterOpen: false,
    }),
  }));