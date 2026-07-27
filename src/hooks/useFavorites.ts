"use client";

import { useEffect, useState, useCallback } from "react";

import {
  getFavorites,
} from "@/services/favorite-service";

import { Favorite } from "@/types";

function loadFavorites(
  userId?: string
): Promise<Favorite[]> {

  if (!userId) {
    return Promise.resolve([]);
  }

  return getFavorites(userId);
}

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

  const data =
    await loadFavorites(userId);

  setFavorites(data);

  setLoading(false);

}, [userId]);

  useEffect(() => {

    let cancelled = false;

    loadFavorites(userId)
      .then((data) => {

        if (cancelled) return;

        setFavorites(data);

        setLoading(false);

      })
      .catch((error) => {

        if (cancelled) return;

        console.error(error);

        setLoading(false);

      });

    return () => {
      cancelled = true;
    };

  }, [userId]);

  return {
    favorites,
    loading,
    refreshFavorites,
  };
}
