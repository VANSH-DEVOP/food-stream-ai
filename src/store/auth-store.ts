import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  favoriteCategory: string;
  spiceLevel: string;
  cuisine: string;
}

interface AuthState {
  user: {
    uid: string;
    phoneNumber: string | null;
    email?: string | null;
  } | null;

  profiles: UserProfile[];

  selectedProfile: UserProfile | null;

  isLoading: boolean;

  setUser: (
    user: {
      uid: string;
      phoneNumber: string | null;
      email?: string | null;
    } | null
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
    }
  )
);