import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addToCart: (
    item: Omit<CartItem, "quantity">
  ) => void;

  removeFromCart: (
    id: number
  ) => void;
}

export const useCartStore =
  create<CartState>((set, get) => ({
    items: [],

    addToCart: (item) => {
      const existingItem =
        get().items.find(
          (i) => i.id === item.id
        );

      if (existingItem) {
        set({
          items: get().items.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity:
                    i.quantity + 1,
                }
              : i
          ),
        });
      } else {
        set({
          items: [
            ...get().items,
            {
              ...item,
              quantity: 1,
            },
          ],
        });
      }
    },

    removeFromCart: (id) => {
      set({
        items: get().items.filter(
          (item) =>
            item.id !== id
        ),
      });
    },
  }));