"use client";

import { useEffect, useState } from "react";

import {
  getFavorites,
} from "@/services/favorite-service";

import { Favorite } from "@/types";

export function useFavorites(
  userId?: string
) {
  const [
    favorites,
    setFavorites,
  ] = useState<Favorite[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  async function refreshFavorites() {
    if (!userId) {
      setFavorites([]);
      setLoading(false);

      return;
    }

    const data =
      await getFavorites(
        userId
      );

    setFavorites(data);

    setLoading(false);
  }

  useEffect(() => {
    refreshFavorites();
  }, [userId]);

  return {
    favorites,
    loading,
    refreshFavorites,
  };
}