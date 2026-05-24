import { create } from "zustand";

interface UIState {
  isCartOpen: boolean;

  toggleCart: () => void;

  closeCart: () => void;
}

export const useUIStore =
  create<UIState>((set) => ({
    isCartOpen: false,

    toggleCart: () =>
      set((state) => ({
        isCartOpen:
          !state.isCartOpen,
      })),

    closeCart: () =>
      set({
        isCartOpen: false,
      }),
  }));