import FoodCard from "./food-card";
import { Favorite } from "@/types";
import { FoodItem } from "@/types";

interface FoodRowProps {
  title: string;
  items: FoodItem[];
  favorites: Favorite[];
  refreshFavorites: () => Promise<void>;
}

export default function FoodRow({
  title,
  items,
  favorites,
  refreshFavorites,
}: FoodRowProps) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-3xl font-bold">
        {title}
      </h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {items.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            favorites={favorites}
            refreshFavorites={refreshFavorites}
          />
        ))}
      </div>
    </section>
  );
}