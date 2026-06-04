"use client";

import { useCartStore } from "@/store/cart-store";
import { Heart } from "lucide-react";
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

  showReasons? : boolean;
}

export default function FoodCard({
  item,
  favorites,
  refreshFavorites,
  showReasons = false,
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
    <div className="flex h-[470px] min-w-[320px] flex-col overflow-hidden rounded-2xl bg-zinc-900">
      <img
        src={item.image}
        alt={item.name}
        className="h-40 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between">
          <h2 className="line-clamp-2 text-2xl font-bold">
            {item.name}
          </h2>

          <button
            onClick={handleFavorite}
            className="rounded-full p-2 text-2xl transition hover:bg-zinc-800"
          >
            <Heart
              size={24}
              fill={existingFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        <div className="mt-3">
          <span
            className={`rounded-full border px-4 py-1 text-sm font-medium ${
              item.category === "Veg"
                ? "border-green-500 text-green-400"
                : "border-red-500 text-red-400"
            }`}
          >
            {item.category}
          </span>
        </div>

        <p className="mt-4 text-3xl font-semibold text-orange-500">
          ₹{item.price}
        </p>

        <div className="mt-3 h-[70px] text-sm text-zinc-400">
          {showReasons &&
          Array.isArray(item.reasons) ? (
            item.reasons
              .slice(0, 2)
              .map((
                reason: string,
                index:number
              ) => (
                <div key={`${reason}-${index}`}>
                  ✓ {reason}
                </div>
              ))
          ) : (
            <div className="opacity-0">
              <div>placeholder</div>
              <div>placeholder</div>
            </div>
          )}
        </div>

        <button
          className="mt-auto w-full rounded-lg bg-orange-500 p-3 font-semibold text-black transition hover:bg-orange-400"
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