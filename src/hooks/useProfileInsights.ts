import {
  getMostOrderedFoods,
  getFavoriteCuisine,
  getFavoriteCategory,
  getFavoriteSpiceLevel,
  getTotalOrders,
} from "@/services/analytics-service";

import {
  FoodItem,
  Order,
  UserProfile,
} from "@/types";

interface UseProfileInsightsParams {
  profile: UserProfile;

  orders: Order[];

  foods: FoodItem[];
}

export function useProfileInsights({
  profile,
  orders,
  foods,
}: UseProfileInsightsParams) {

  const favoriteFood =
    getMostOrderedFoods(
      orders,
      profile.id
    )[0]?.[0] || "N/A";

  const favoriteCuisine =
    getFavoriteCuisine(
      orders,
      profile.id,
      foods
    ) || "N/A";

  const favoriteCategory =
    getFavoriteCategory(
      orders,
      profile.id,
      foods
    ) || "N/A";

  const favoriteSpiceLevel =
    getFavoriteSpiceLevel(
      orders,
      profile.id,
      foods
    ) || "N/A";

  const totalOrders =
    getTotalOrders(
      orders,
      profile.id
    );

  return {
    favoriteFood,
    favoriteCuisine,
    favoriteCategory,
    favoriteSpiceLevel,
    totalOrders,
  };
}