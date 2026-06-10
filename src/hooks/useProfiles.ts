import { useEffect, useState, useCallback } from "react";

import { getProfiles } from "@/services/profile-service";

import { UserProfile } from "@/types";

export function useProfiles(
  userId?: string
) {
  const [profiles, setProfiles] =
    useState<UserProfile[]>([]);

  const [loading, setLoading] =
    useState(true);

  const refreshProfiles =
useCallback(async () => {

  if (!userId) return;

  const data =
    await getProfiles(userId);

  setProfiles(data);

  setLoading(false);

}, [userId]);

  useEffect(() => {
    refreshProfiles();
  }, [refreshProfiles]);

  return {
    profiles,
    loading,
    refreshProfiles,
  };
}