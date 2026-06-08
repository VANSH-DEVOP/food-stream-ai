import { useEffect, useState } from "react";

import {
  subscribeToOrders,
} from "@/services/order-service";

import { Order } from "@/types";

export function useOrders(
  userId?: string
) {

  const [
    orders,
    setOrders,
  ] = useState<Order[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    if (!userId) {
      return;
    }

    const unsubscribe =
      subscribeToOrders(
        userId,
        (orders) => {

          setOrders(
            orders
          );

          setLoading(false);

        }
      );

    return unsubscribe;

  }, [userId]);

  return {
    orders,
    loading,
  };
}