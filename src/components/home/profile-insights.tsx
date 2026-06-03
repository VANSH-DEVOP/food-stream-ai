"use client";

import {
  FoodItem,
  Order,
  UserProfile,
} from "@/types";
import { useProfileInsights } from "@/hooks/useProfileInsights";

interface ProfileInsightsProps {
  profile: UserProfile;

  orders: Order[];

  foods: FoodItem[];
}

export default function ProfileInsights({
  profile,
  orders,
  foods,
}: ProfileInsightsProps) {

    const {
        favoriteFood,
        favoriteCuisine,
        favoriteCategory,
        favoriteSpiceLevel,
        totalOrders,
    } = useProfileInsights({
        profile,
        orders,
        foods,
    });

  return (
    <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-2xl font-bold text-orange-500">
        🍽 Food Preference Insights
      </h2>

      <div className="space-y-2 text-zinc-300">
        <p>
          <strong>
            Favorite Food:
          </strong>{" "}
          {favoriteFood}
        </p>

        <p>
          <strong>
            Favorite Cuisine:
          </strong>{" "}
          {favoriteCuisine}
        </p>

        <p>
          <strong>
            Favorite Category:
          </strong>{" "}
          {favoriteCategory}
        </p>

        <p>
          <strong>
            Favorite Spice Level:
          </strong>{" "}
          {favoriteSpiceLevel}
        </p>

        <p>
          <strong>
            Orders Placed:
          </strong>{" "}
          {totalOrders}
        </p>
      </div>
    </div>
  );
}