import FoodCard from "./food-card";

import { FoodItem } from "@/types";

interface FoodRowProps {
  title: string;
  items: FoodItem[];
}

export default function FoodRow({
  title,
  items,
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
          />
        ))}
      </div>
    </section>
  );
}