import Navbar from "@/components/layout/navbar";

import HeroBanner from "@/components/home/hero-banner";

import FoodRow from "@/components/home/food-row";

import { foodItems } from "@/constants/food-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-black px-6 pb-20 text-white">
      <Navbar />

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