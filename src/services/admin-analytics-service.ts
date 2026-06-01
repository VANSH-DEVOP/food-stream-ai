import { Order } from "@/types";

export function getTotalRevenue(
  orders: Order[]
) {
  return orders.reduce(
    (total, order) =>
      total + order.total,
    0
  );
}

export function getTotalOrderCount(
  orders: Order[]
) {
  return orders.length;
}

export function getTopProfiles(
  orders: Order[]
) {
  const profileCounts:
    Record<string, number> = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      profileCounts[
        item.profileName
      ] =
        (profileCounts[
          item.profileName
        ] || 0) + item.quantity;
    });
  });

  return Object.entries(
    profileCounts
  )
    .sort(
      (a, b) =>
        b[1] - a[1]
    )
    .slice(0, 5);
}

export function getTopFoods(
  orders: Order[]
) {
  const foodCounts:
    Record<string, number> = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      foodCounts[item.name] =
        (foodCounts[item.name] || 0) +
        item.quantity;
    });
  });

  return Object.entries(
    foodCounts
  )
    .sort(
      (a, b) =>
        b[1] - a[1]
    )
    .slice(0, 5);
}