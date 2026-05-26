"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth-store";

import Navbar from "@/components/layout/navbar";

import HeroBanner from "@/components/home/hero-banner";

import FoodRow from "@/components/home/food-row";

import { foodItems } from "@/constants/food-data";
import CartDrawer from "@/components/layout/cart-drawer";
import FloatingCartButton from "@/components/layout/floating-cart-button";
import FilterDrawer from "@/components/layout/filter-drawer";
import { useFilterStore } from "@/store/filter-store";

export default function Home() {
    const router = useRouter();

    const user = useAuthStore(
    (state) => state.user
    );

    const selectedProfile = useAuthStore(
    (state) => state.selectedProfile
    );

    const isLoading = useAuthStore(
    (state) => state.isLoading
    );

    const category = useFilterStore(
      (state) => state.category
    );

    const cuisine = useFilterStore(
      (state) => state.cuisine
    );

    const spiceLevel =
      useFilterStore(
        (state) => state.spiceLevel
      );

    const filteredFoods =
      foodItems.filter((item) => {
        const matchesCategory =
          category === "All" ||
          item.category === category;

        const matchesCuisine =
          cuisine === "All" ||
          item.cuisine === cuisine;

        const matchesSpice =
          spiceLevel === "All" ||
          item.spiceLevel ===
            spiceLevel;

        return (
          matchesCategory &&
          matchesCuisine &&
          matchesSpice
        );
      });

    const recommendedFoods =
      filteredFoods
        .map((item) => {
          let score = 0;

          if (
            item.category ===
            selectedProfile
              ?.favoriteCategory
          ) {
            score += 1;
          }

          if (
            item.cuisine ===
            selectedProfile
              ?.cuisine
          ) {
            score += 1;
          }

          if (
            item.spiceLevel ===
            selectedProfile
              ?.spiceLevel
          ) {
            score += 1;
          }

          return {
            ...item,
            score,
          };
        })

        .sort((a, b) =>
          b.score - a.score
        );

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            router.push("/login");
        } else if (!selectedProfile) {
            router.push("/profiles");
        }
        }, [
        user,
        selectedProfile,
        isLoading,
        router,
    ]);
    if (
  isLoading ||
  !user ||
  !selectedProfile
) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      Loading...
    </main>
  );
}

return (
  <main className="min-h-screen bg-black px-6 pb-20 pt-24 text-white">
    <Navbar />

    <CartDrawer />

    <FilterDrawer />

    <div className="mt-6">
      <HeroBanner />
    </div>

    <div className="mt-10">
      <FoodRow
        title={`Recommended For ${selectedProfile.name}`}
        items={recommendedFoods}
      />

      <FoodRow
        title="Trending Now"
        items={foodItems}
      />

      <FoodRow
        title="Veg Specials"
        items={foodItems.filter(
          (item) =>
            item.category === "Veg"
        )}
      />

      <FoodRow
        title="Non-Veg Specials"
        items={foodItems.filter(
          (item) =>
            item.category === "Non-Veg"
        )}
      />
    </div>

    <FloatingCartButton />
  </main>
);
}