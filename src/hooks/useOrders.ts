import { useEffect, useState } from "react";

import { getOrders } from "@/services/order-service";

import { Order } from "@/types";

export function useOrders(
  userId?: string
) {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (!userId) return;

      const data =
        await getOrders(userId);

      setOrders(data);

      setLoading(false);
    }

    loadOrders();
  }, [userId]);

  return {
    orders,
    loading,
  };
}