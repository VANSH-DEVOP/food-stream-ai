import { create } from "zustand";

import { persist } from "zustand/middleware";
import { CartItem } from "@/types";


interface CartState {
  items: CartItem[];

  addToCart: (
    item: Omit<CartItem, "quantity">
  ) => void;

  removeFromCart: (
    id: number,
    profileId: string
  ) => void;

  increaseQuantity: (
    id: number,
    profileId: string
  ) => void;

  decreaseQuantity: (
    id: number,
    profileId: string
  ) => void;

  clearCart: () => void;
  
  addMultipleToCart: (
  items: CartItem[]
) => void;
}

export const useCartStore =
  create<CartState>()(
    persist(
      (set, get) => ({
        items: [],

        addToCart: (item) => {
          const existingItem =
            get().items.find(
              (i) => i.id === item.id && 
              i.profileId === item.profileId
            );

          if (existingItem) {
            set({
              items: get().items.map(
                (i) =>
                  i.id === item.id &&
                  i.profileId === item.profileId
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

        removeFromCart: (
          id : number,
          profileId: string
        ) => {
          set({
            items: get().items.filter(
              (item) =>
                !(
                  item.id === id &&
                  item.profileId === profileId
                )
            ),
          });
        },
        increaseQuantity: (
          id : number,
          profileId: string
        ) => {
          set({
            items: get().items.map(
              (item) =>
                item.id === id &&
                item.profileId === profileId
                  ? {
                      ...item,
                      quantity:
                        item.quantity + 1,
                    }
                  : item
            ),
          });
        },

        decreaseQuantity: (
          id: number,
          profileId: string
        ) => {
          set({
            items: get().items
              .map((item) =>
                item.id === id &&
                item.profileId === profileId
                  ? {
                      ...item,
                      quantity:
                        item.quantity - 1,
                    }
                  : item
              )
              .filter(
                (item) =>
                  item.quantity > 0
              ),
          });
        },
        addMultipleToCart: (
          newItems
        ) => {

          const currentItems =
            get().items;

          const mergedItems = [
            ...currentItems,
          ];

          newItems.forEach(
            (newItem) => {

              const existingItem =
                mergedItems.find(
                  (item) =>
                    item.id ===
                      newItem.id &&
                    item.profileId ===
                      newItem.profileId
                );

              if (existingItem) {
                existingItem.quantity +=
                  newItem.quantity;
              } else {
                mergedItems.push(
                  { ...newItem }
                );
              }
            }
          );

          set({
            items: mergedItems,
          });
        },
        clearCart: () => {
          set({
            items: [],
          });
        },
      }),
      {
        name: "cart-storage",
      }
    )
  );