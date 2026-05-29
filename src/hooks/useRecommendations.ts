import { FoodItem, UserProfile } from "@/types";

interface RecommendationParams {
  foods: FoodItem[];

  profile: UserProfile;

  category: string;

  cuisine: string;

  spiceLevel: string;
}

export function useRecommendations({
  foods,
  profile,
  category,
  cuisine,
  spiceLevel,
}: RecommendationParams) {
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

  const recommendedFoods =
    filteredFoods
      .map((item) => {
        let score = 0;

        if (
          item.category ===
          profile.favoriteCategory
        ) {
          score += 1;
        }

        if (
          item.cuisine ===
          profile.cuisine
        ) {
          score += 1;
        }

        if (
          item.spiceLevel ===
          profile.spiceLevel
        ) {
          score += 1;
        }

        return {
          ...item,
          score,
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