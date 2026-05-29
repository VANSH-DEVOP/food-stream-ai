"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth-store";

export function useAuthGuard() {
  const router = useRouter();

  const user = useAuthStore(
    (state) => state.user
  );

  const selectedProfile = useAuthStore(
    (state) => state.selectedProfile
  );

  const isLoading = useAuthStore(
    (state) => state.isLoading
  );

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/login");
    } else if (!selectedProfile) {
      router.push("/profiles");
    }
  }, [
    user,
    selectedProfile,
    isLoading,
    router,
  ]);

  return {
    user,
    selectedProfile,
    isLoading,
  };
}