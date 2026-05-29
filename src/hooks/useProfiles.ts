import { useEffect, useState } from "react";

import { getProfiles } from "@/services/profile-service";

import { UserProfile } from "@/types";

export function useProfiles(
  userId?: string
) {
  const [profiles, setProfiles] =
    useState<UserProfile[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function refreshProfiles() {
    if (!userId) return;

    const data =
      await getProfiles(userId);

    setProfiles(data);

    setLoading(false);
  }

  useEffect(() => {
    refreshProfiles();
  }, [userId]);

  return {
    profiles,
    loading,
    refreshProfiles,
  };
}