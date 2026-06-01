"use client";

import { useCartStore } from "@/store/cart-store";

import { FoodItem } from "@/types";
import { useAuthStore } from "@/store/auth-store";
import {
  addFavorite,
  removeFavorite,
} from "@/services/favorite-service";
import { Favorite } from "@/types";

interface FoodCardProps {
  item: FoodItem;

  favorites: Favorite[];

  refreshFavorites: () => Promise<void>;
}

export default function FoodCard({
  item,
  favorites,
  refreshFavorites,
}: FoodCardProps) {

  const addToCart =
    useCartStore(
      (state) => state.addToCart
    );


    const selectedProfile =
    useAuthStore(
      (state) =>
        state.selectedProfile
    );

    const user = useAuthStore(
      (state) => state.user
    );

    // const {
    //   favorites,
    //   refreshFavorites,
    // } = useFavorites(
    //   user?.uid
    // );

    const existingFavorite =
    favorites.find(
      (favorite) =>
        favorite.profileId ===
          selectedProfile?.id &&
        favorite.foodId === item.id
    );

    async function handleFavorite() {
      if (
        !user ||
        !selectedProfile
      ) {
        return;
      }

      if (existingFavorite) {
        await removeFavorite(
          existingFavorite.id
        );
      } else {
        console.log(
          "Adding favorite",
          user.uid,
          selectedProfile.id,
          item.id
        );
        await addFavorite(
          user.uid,
          selectedProfile.id,
          item.id
        );
      }

      await refreshFavorites();
    }

    if (!selectedProfile) return null;
  return (
    <div className="min-w-[250px] overflow-hidden rounded-2xl bg-zinc-900 transition hover:scale-105">
      <img
        src={item.image}
        alt={item.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-bold">
            {item.name}
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={
                handleFavorite
              }
              className="text-xl"
            >
              {existingFavorite
                ? "❤️"
                : "🤍"}
            </button>

            <span
              className={`rounded-full px-2 py-1 text-xs ${
                item.category === "Veg"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {item.category}
            </span>
          </div>
        </div>

        <p className="mt-2 text-orange-500">
          ₹{item.price}
        </p>

        <button
          className="mt-4 w-full rounded-lg bg-orange-500 p-2 font-semibold text-black transition hover:bg-orange-400"
          onClick={() =>
            addToCart({
              id: item.id,
              name: item.name,
              image: item.image,
              price: item.price,

              profileId:
                selectedProfile.id,

              profileName:
                selectedProfile.name,
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}