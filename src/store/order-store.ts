import { create } from "zustand";

interface OrderUIState {
  isOrderSummaryOpen: boolean;

  openOrderSummary: () => void;

  closeOrderSummary: () => void;
}

export const useOrderStore =
  create<OrderUIState>((set) => ({
    isOrderSummaryOpen: false,

    openOrderSummary: () =>
      set({
        isOrderSummaryOpen: true,
      }),

    closeOrderSummary: () =>
      set({
        isOrderSummaryOpen: false,
      }),
  }));