import {
  useEffect,
  useState,
} from "react";

import {
  subscribeToAllOrders,
} from "@/services/order-service";

import { Order } from "@/types";

export function useAllOrders() {

  const [
    orders,
    setOrders,
  ] = useState<Order[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

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

  }, []);

  return {
    orders,
    loading,
  };
}