import { Order, FoodItem } from "@/types";

function getProfileItems(
  orders: Order[],
  profileId: string
) {
  return orders.flatMap((order) =>
    order.items.filter(
      (item) =>
        item.profileId === profileId
    )
  );
}

export function getMostOrderedFoods(
  orders: Order[],
  profileId: string
) {
  const counts:
    Record<string, number> = {};

  const items =
    getProfileItems(
      orders,
      profileId
    );

  items.forEach((item) => {
    counts[item.name] =
      (counts[item.name] || 0) +
      item.quantity;
  });

  return Object.entries(counts)
    .sort(
      (a, b) => b[1] - a[1]
    );
}

export function getFavoriteCategory(
  orders: Order[],
  profileId: string,
  foods: FoodItem[]
) {
  const counts:
    Record<string, number> = {};

  const items =
    getProfileItems(
      orders,
      profileId
    );

  items.forEach((item) => {
    const food = foods.find(
      (f) => f.id === item.id
    );

    if (!food) return;

    counts[
      food.category
    ] =
      (counts[
        food.category
      ] || 0) +
      item.quantity;
  });

  return Object.entries(counts)
    .sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
}

export function getFavoriteCuisine(
  orders: Order[],
  profileId: string,
  foods: FoodItem[]
) {
  const counts:
    Record<string, number> = {};

  const items =
    getProfileItems(
      orders,
      profileId
    );

  items.forEach((item) => {
    const food = foods.find(
      (f) => f.id === item.id
    );

    if (!food) return;

    counts[
      food.cuisine
    ] =
      (counts[
        food.cuisine
      ] || 0) +
      item.quantity;
  });

  return Object.entries(counts)
    .sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
}

export function getFavoriteSpiceLevel(
  orders: Order[],
  profileId: string,
  foods: FoodItem[]
) {
  const counts:
    Record<string, number> = {};

  const items =
    getProfileItems(
      orders,
      profileId
    );

  items.forEach((item) => {
    const food = foods.find(
      (f) => f.id === item.id
    );

    if (!food) return;

    counts[
      food.spiceLevel
    ] =
      (counts[
        food.spiceLevel
      ] || 0) +
      item.quantity;
  });

  return Object.entries(counts)
    .sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
}