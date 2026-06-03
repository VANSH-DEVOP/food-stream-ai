import { FoodItem, UserProfile } from "@/types";
import { Order } from "@/types";
import {
  getMostOrderedFoods,
  getFavoriteCategory,
  getFavoriteCuisine,
  getFavoriteSpiceLevel
} from "@/services/analytics-service";

interface RecommendationParams {
  foods: FoodItem[];

  profile: UserProfile;

  orders: Order[];

  category: string;

  cuisine: string;

  spiceLevel: string;
}

export function useRecommendations({
  foods,
  profile,
  orders,
  category,
  cuisine,
  spiceLevel,
}: RecommendationParams) {

  if (!profile?.id) {
    return {
      filteredFoods: foods,
      recommendedFoods: foods,
    };
  }

  const filteredFoods =
    foods.filter((item) => {
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

   const mostOrderedFoods =
    getMostOrderedFoods(
        orders,
        profile.id
    );
    
   const foodFrequency =
    Object.fromEntries(
        mostOrderedFoods
    ); 

   const favoriteCuisine =
    getFavoriteCuisine(
        orders,
        profile.id,
        foods
    );

   const favoriteCategory =
    getFavoriteCategory(
        orders,
        profile.id,
        foods
    );

   const favoriteSpiceLevel =
    getFavoriteSpiceLevel(
        orders,
        profile.id,
        foods
    ); 

  const recommendedFoods =
    filteredFoods
      .map((item) => {
        let score = 0;
        const reasons: string[] = [];

        if (
          item.category ===
          profile.favoriteCategory
        ) {
          score += 1;

          reasons.push(
            "Matches favorite category"
          );
        }

        if (
            item.category ===
            favoriteCategory
        ) {
            score += 2;

            reasons.push(
              "Frequently ordered category"
            );
        }

        if (
            item.cuisine ===
            favoriteCuisine
        ) {
            score += 2;

            reasons.push(
              "Matches favorite cuisine."
            );
        }

        if (
          item.cuisine ===
          profile.cuisine
        ) {
          score += 1;

          reasons.push(
            "Matches Preferred cuisine."
          );
        }

        if (
          item.spiceLevel ===
          profile.spiceLevel
        ) {
          score += 1;

          reasons.push(
            "Matches spice preference"
          );
        }

        if (
            item.spiceLevel ===
            favoriteSpiceLevel
        ) {
            score += 2;

            reasons.push(
              "Frequently ordered spice level"
            );
        }

        const frequency =
            foodFrequency[item.name] || 0;

            if (frequency > 0) {
              reasons.push(
                `Ordered ${frequency} times before`
              );
            }

            score += Math.min(
            frequency * 0.5,
            3
            );

        return {
          ...item,
          score,
          reasons,
        };
      })
      .sort(
        (a, b) =>
          b.score - a.score
      );

  return {
    filteredFoods,
    recommendedFoods,
  };
}