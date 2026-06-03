"use client";

import { useEffect, useState } from "react";
import { FoodItem } from "@/types";
import { getFoods } from "@/services/food-service";

export function useAdminFoods() {
  const [foods, setFoods] =
    useState<FoodItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function refreshFoods() {
    setLoading(true);

    const data =
      await getFoods();

    setFoods(data);

    setLoading(false);
  }

  useEffect(() => {
    refreshFoods();
  }, []);

  return {
    foods,
    loading,
    refreshFoods,
  };
}