"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllUsers,
} from "@/services/user-service";

import { AppUser } from "@/types";

export function useUsers() {

  const [users, setUsers] =
    useState<AppUser[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function refreshUsers() {

    const data =
      await getAllUsers();

    setUsers(
      data as AppUser[]
    );

    setLoading(false);
  }

  useEffect(() => {
    refreshUsers();
  }, []);

  return {
    users,
    loading,
    refreshUsers,
  };
}