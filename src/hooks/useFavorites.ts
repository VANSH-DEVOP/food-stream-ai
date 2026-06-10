"use client";

import { useEffect, useState, useCallback } from "react";

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

  const refreshFavorites =
useCallback(async () => {

  if (!userId) {

    setFavorites([]);

    setLoading(false);

    return;
  }

  const data =
    await getFavorites(userId);

  setFavorites(data);

  setLoading(false);

}, [userId]);

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  return {
    favorites,
    loading,
    refreshFavorites,
  };
}