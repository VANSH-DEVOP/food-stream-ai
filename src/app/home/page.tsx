"use client";

import Navbar from "@/components/layout/navbar";
import HeroBanner from "@/components/home/hero-banner";
import FoodRow from "@/components/home/food-row";
import { foodItems } from "@/constants/food-data";
import CartDrawer from "@/components/layout/cart-drawer";
import FloatingCartButton from "@/components/layout/floating-cart-button";
import FilterDrawer from "@/components/layout/filter-drawer";
import { useFilterStore } from "@/store/filter-store";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRecommendations } from "@/hooks/useRecommendations";

export default function Home() {

  const {
      user,
      selectedProfile,
      isLoading,
  } = useAuthGuard();

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

    const {
        recommendedFoods,
      } = useRecommendations({
        foods: foodItems,

        profile: selectedProfile!,

        category,

        cuisine,

        spiceLevel,
      });

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