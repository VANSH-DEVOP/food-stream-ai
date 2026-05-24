"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth-store";

import Navbar from "@/components/layout/navbar";

import HeroBanner from "@/components/home/hero-banner";

import FoodRow from "@/components/home/food-row";

import { foodItems } from "@/constants/food-data";
import CartDrawer from "@/components/layout/cart-drawer";


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
  <main className="min-h-screen bg-black px-6 pb-20 text-white">
    <Navbar />

    <CartDrawer />

    <div className="mt-6">
      <HeroBanner />
    </div>

    <div className="mt-10">
      <FoodRow
        title="Recommended For You"
        items={foodItems}
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
  </main>
);
}