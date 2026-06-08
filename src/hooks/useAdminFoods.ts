"use client";

import {
  useEffect,
  useState,
} from "react";

import { FoodItem } from "@/types";

import {
  subscribeToFoods,
} from "@/services/food-service";

export function useAdminFoods() {

  const [
    foods,
    setFoods,
  ] = useState<FoodItem[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    const unsubscribe =
      subscribeToFoods(
        (foods) => {

          setFoods(
            foods
          );

          setLoading(false);

        }
      );

    return unsubscribe;

  }, []);

  return {
    foods,
    loading,
  };
}