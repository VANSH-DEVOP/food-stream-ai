import {
  useEffect,
  useState,
} from "react";

import {
  subscribeToAllOrders,
} from "@/services/order-service";

import { Order } from "@/types";

// Reading the whole orders collection is admin-only in the security rules,
// so the caller must say whether the current viewer is allowed to listen.
export function useAllOrders(
  enabled = true
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

    if (!enabled) {
      return;
    }

    const unsubscribe =
      subscribeToAllOrders(
        (orders) => {

          setOrders(
            orders
          );

          setLoading(false);

        }
      );

    return unsubscribe;

  }, [enabled]);

  return {
    orders,
    loading,
  };
}
