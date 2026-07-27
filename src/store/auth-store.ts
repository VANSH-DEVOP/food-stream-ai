import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile } from "@/types";

interface AuthState {
  user: {
    uid: string;
    phoneNumber: string | null;
    email?: string | null;
    role?: "admin" | "user";
  } | null;

  profiles: UserProfile[];

  selectedProfile: UserProfile | null;

  isLoading: boolean;

  setUser: (
    user: {
      uid: string;
      phoneNumber: string | null;
      email?: string | null;
      role?: "admin" | "user";
    } | null,
  ) => void;

  setProfiles: (profiles: UserProfile[]) => void;

  setSelectedProfile: (
    profile: UserProfile | null
  ) => void;

  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist (
  ((set) => ({
  isLoading: true,

  user: null,

  profiles: [],

  selectedProfile: null,

  setUser: (user) => set({ user }),

  setProfiles: (profiles) => set({ profiles }),

  setSelectedProfile: (profile) =>
    set({ selectedProfile: profile }),

  setLoading: (loading) =>
  set({ isLoading: loading })
})),
    {
      name: "auth-storage",

      // Only the profile picker's selection is safe to persist. The user
      // object (including `role`) and the loading flag must always come
      // from Firebase on boot — persisting them lets anyone hand-edit
      // localStorage into an admin session, and a persisted
      // `isLoading: false` makes guards run before auth has resolved.
      partialize: (state) => ({
        selectedProfile:
          state.selectedProfile,
      }),

      // partialize only governs what is *written*. Anyone who used the app
      // before that existed still has a blob containing `user` and
      // `isLoading: false` in localStorage, which rehydration would happily
      // merge back in. Bumping the version discards it once.
      version: 1,

      migrate: (
        persisted,
        version
      ) => {

        if (version >= 1) {
          return persisted as {
            selectedProfile:
              AuthState["selectedProfile"];
          };
        }

        return {
          selectedProfile:
            (
              persisted as {
                selectedProfile?:
                  AuthState["selectedProfile"];
              } | null
            )?.selectedProfile ?? null,
        };
      },
    }
  )
);