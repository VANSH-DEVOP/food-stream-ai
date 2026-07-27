import { useEffect, useState, useCallback } from "react";

import { getProfiles } from "@/services/profile-service";

import { UserProfile } from "@/types";

function loadProfiles(
  userId?: string
): Promise<UserProfile[]> {

  if (!userId) {
    return Promise.resolve([]);
  }

  return getProfiles(userId);
}

export function useProfiles(
  userId?: string
) {
  const [profiles, setProfiles] =
    useState<UserProfile[]>([]);

  const [loading, setLoading] =
    useState(true);

  const refreshProfiles =
useCallback(async () => {

  const data =
    await loadProfiles(userId);

  setProfiles(data);

  setLoading(false);

}, [userId]);

  useEffect(() => {

    let cancelled = false;

    loadProfiles(userId)
      .then((data) => {

        if (cancelled) return;

        setProfiles(data);

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
    profiles,
    loading,
    refreshProfiles,
  };
}
