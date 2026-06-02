import { useEffect, useState } from "react";

import { Order } from "@/types";
import { getAllOrders } from "@/services/order-service";

export function useAllOrders() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function refreshOrders() {
    const data =
      await getAllOrders();

    setOrders(data);

    setLoading(false);
  }

  useEffect(() => {
    refreshOrders();
  }, []);

  return {
    orders,
    loading,
    refreshOrders,
  };
}