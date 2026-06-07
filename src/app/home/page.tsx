"use client";

import Navbar from "@/components/layout/navbar";
import HeroBanner from "@/components/home/hero-banner";
import FoodRow from "@/components/home/food-row";
import { useFoods } from "@/hooks/useFoods";
import CartDrawer from "@/components/layout/cart-drawer";
import FloatingCartButton from "@/components/layout/floating-cart-button";
import FilterDrawer from "@/components/layout/filter-drawer";
import { useFilterStore } from "@/store/filter-store";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRecommendations } from "@/hooks/useRecommendations";
import OrderSummaryModal from '@/components/order/order-summary-modal';
import { useOrders } from "@/hooks/useOrders";
import ProfileInsights from "@/components/home/profile-insights";
import { useFavorites } from "@/hooks/useFavorites";
import HomeFooter from "@/components/layout/home-footer";
import Footer from "@/components/layout/footer";
import { useState } from "react";

import AIChatButton
from "@/components/chat/ai-chat-button";

import AIChatModal
from "@/components/chat/ai-chat-modal";

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

    const [
      isChatOpen,
      setIsChatOpen,
    ] = useState(false);

    const spiceLevel =
      useFilterStore(
        (state) => state.spiceLevel
      );

    const {
      orders,
    } = useOrders(user?.uid ?? "");

    const {
      favorites,
      refreshFavorites,
    } = useFavorites(
      user?.uid ?? ""
    );

    const {
      foods,
      loading: foodsLoading,
    } = useFoods();

    const availableFoods =
    foods.filter(
      (food) =>
        food.isAvailable !== false
    );

    const safeProfile =
    selectedProfile ?? {
      id: "",
      name: "",
      favoriteCategory: "",
      cuisine: "",
      spiceLevel: "",
      userId: "",
    };

    const favoriteFoodIds =
      favorites
        .filter(
          (favorite) =>
            favorite.profileId ===
            safeProfile.id
        )
        .map(
          (favorite) =>
            favorite.foodId
        );

    const favoriteFoods =
      availableFoods.filter(
        (food) =>
          favoriteFoodIds.includes(
            food.id
          )
      );

    const {
        recommendedFoods,
      } = useRecommendations({
        foods: availableFoods,

        profile: safeProfile,

        orders,

        category,

        cuisine,

        spiceLevel,
      });

      if (
        isLoading ||
        foodsLoading ||
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
  <main className="min-h-screen bg-black px-6 pb-32 pt-24 text-white">
    <Navbar />

    <CartDrawer />
    <OrderSummaryModal />
    <FilterDrawer />

    <div className="mt-6">
      <HeroBanner />
    </div>

    <div className="mt-10">
      <ProfileInsights
        profile={selectedProfile}
        orders={orders}
        foods={availableFoods}
      />

      {favoriteFoods.length > 0 && (
          <FoodRow
            title={`❤️ ${selectedProfile.name}'s Favorites`}
            items={favoriteFoods}
            favorites={favorites}
            refreshFavorites={refreshFavorites}
          />
        )}

      <div id="recommendations">

        <div className="mb-4 rounded-lg border border-orange-500/20 bg-orange-500/5 px-4 py-3">
          <p className="font-medium text-orange-400">
            🤖 Personalized Recommendations
          </p>

          <p className="text-sm text-zinc-400">
            Based on order history, favorite cuisine, category, and spice preferences.
          </p>
        </div>

        <FoodRow
          title={`Recommended For ${selectedProfile.name}`}
          items={recommendedFoods}
          favorites={favorites}
          refreshFavorites={refreshFavorites}
          showReasons={true}
        />

      </div>

      <FoodRow
        title="Trending Now"
        items={availableFoods}
        favorites={favorites}
        refreshFavorites={refreshFavorites}
      />

      <FoodRow
        title="Veg Specials"
        items={availableFoods.filter(
          (item) =>
            item.category === "Veg"
        )}
        favorites={favorites}
        refreshFavorites={refreshFavorites}
      />

      <FoodRow
        title="Non-Veg Specials"
        items={availableFoods.filter(
          (item) =>
            item.category === "Non-Veg"
        )}
        favorites={favorites}
        refreshFavorites={refreshFavorites}
      />
    </div>
    
    <Footer/>
    <HomeFooter/>
    <AIChatModal
      isOpen={isChatOpen}
      onClose={() =>
        setIsChatOpen(false)
      }
      foods={availableFoods}
      profile={selectedProfile}
    />

    <AIChatButton
      onClick={() =>
        setIsChatOpen(true)
      }
    />
    <FloatingCartButton />
  </main>
);
}