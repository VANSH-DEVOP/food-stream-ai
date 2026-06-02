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
    .slice(0, 10);
}

export function getRecentOrders(
  orders: Order[]
) {
  return [...orders]
    .sort(
      (a, b) =>
        (b.createdAt?.seconds || 0) -
        (a.createdAt?.seconds || 0)
    )
    .slice(0, 10);
}

export function getAverageOrderValue(
  orders: Order[]
) {
  if (orders.length === 0) {
    return 0;
  }

  return Math.round(
    getTotalRevenue(orders) /
    orders.length
  );
}

export function getTopCustomers(
  orders: Order[]
) {
  const customerRevenue:
    Record<string, number> = {};

  orders.forEach((order) => {
    const customer =
        order.userEmail ||
        order.userId;

    customerRevenue[
      customer
    ] =
      (customerRevenue[
        customer
      ] || 0) +
      order.total;
  });

  return Object.entries(
    customerRevenue
  )
    .sort(
      (a, b) =>
        b[1] - a[1]
    )
    .slice(0, 5);
}