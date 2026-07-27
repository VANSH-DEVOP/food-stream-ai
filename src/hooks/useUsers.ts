"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getAllUsers,
} from "@/services/user-service";

import { AppUser } from "@/types";

function loadUsers(
  enabled: boolean
): Promise<AppUser[]> {

  if (!enabled) {
    return Promise.resolve([]);
  }

  return getAllUsers() as Promise<
    AppUser[]
  >;
}

// Listing every user is admin-only in the security rules, so the caller
// must say whether the current viewer is allowed to ask.
export function useUsers(
  enabled = true
) {

  const [users, setUsers] =
    useState<AppUser[]>([]);

  const [loading, setLoading] =
    useState(true);

  const refreshUsers =
    useCallback(async () => {

      const data =
        await loadUsers(enabled);

      setUsers(data);

      setLoading(false);

    }, [enabled]);

  useEffect(() => {

    let cancelled = false;

    loadUsers(enabled)
      .then((data) => {

        if (cancelled) return;

        setUsers(data);

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

  }, [enabled]);

  return {
    users,
    loading,
    refreshUsers,
  };
}
