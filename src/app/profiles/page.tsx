"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useFilterStore } from "@/store/filter-store";

import { useState } from "react";
import { useProfiles } from "@/hooks/useProfiles";

import {
  createProfile,
  deleteProfile,
} from "@/services/profile-service";

export default function ProfilesPage() {
  const router = useRouter();
  
  const setSelectedProfile =
  useAuthStore(
    (state) =>
      state.setSelectedProfile
  );

  const user = useAuthStore(
    (state) => state.user
  );

  const [newProfile, setNewProfile] =
  useState("");

  const selectedProfile =
  useAuthStore(
    (state) =>
      state.selectedProfile
  );
  const [favoriteCategory,
  setFavoriteCategory] =
    useState("Veg");

  const [spiceLevel,
  setSpiceLevel] =
    useState("Medium");

  const [cuisine,
  setCuisine] =
  useState("Indian");

  const resetFilters =
  useFilterStore(
    (state) =>
      state.resetFilters
  );

  const {
    profiles,
    loading,
    refreshProfiles,
  } = useProfiles(user?.uid);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      {profiles.length === 0 && (
        <p className="mb-6 text-zinc-400">
          Create your first profile
        </p>
      )}
      <h1 className="mb-10 text-5xl font-bold">
        Who&apos;s ordering?
      </h1>

      {profiles.length < 4 && (
        <div className="mb-8 flex gap-4">
          <input
            value={newProfile}
            onChange={(e) =>
              setNewProfile(e.target.value)
            }
            placeholder="New profile name"
            className="rounded-lg bg-zinc-900 px-4 py-2"
          />
          <select
            value={favoriteCategory}
            onChange={(e) =>
              setFavoriteCategory(
                e.target.value
              )
            }
            className="rounded-lg bg-zinc-900 px-4 py-2"
          >
            <option value="Veg">
              Veg
            </option>

            <option value="Non-Veg">
              Non-Veg
            </option>
          </select>

          <select
            value={spiceLevel}
            onChange={(e) =>
              setSpiceLevel(
                e.target.value
              )
            }
            className="rounded-lg bg-zinc-900 px-4 py-2"
          >
            <option value="Mild">
              Mild
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Spicy">
              Spicy
            </option>
          </select>

          <select
            value={cuisine}
            onChange={(e) =>
              setCuisine(
                e.target.value
              )
            }
            className="rounded-lg bg-zinc-900 px-4 py-2"
          >
            <option value="Indian">
              Indian
            </option>

            <option value="Chinese">
              Chinese
            </option>

            <option value="Italian">
              Italian
            </option>
          </select>
          <button
            onClick={async () => {
              if (
                !user ||
                !newProfile
              )
                return;

              await createProfile(
                user.uid,
                newProfile,
                favoriteCategory,
                spiceLevel,
                cuisine
              );

              await refreshProfiles();

              setNewProfile("");
            }}
            className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-black"
          >
            Add Profile
          </button>
        </div>
      )}

      <div className="flex gap-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => {
                setSelectedProfile(profile);

                resetFilters();

                router.push("/home");
            }}
            className="relative cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition hover:scale-105 hover:border-orange-500"
          >
            <button
              onClick={async (e) => {
                e.stopPropagation();

                await deleteProfile(profile.id);
                if (
                  selectedProfile?.id === profile.id
                ) {
                  setSelectedProfile(null);
                }

                await refreshProfiles();
              }}
              className="absolute right-3 top-3 text-sm text-zinc-400 hover:text-red-500"
            >
              ✕
            </button>
            <div className="mb-4 h-24 w-24 rounded-full bg-orange-500" />

            <h2 className="text-center text-xl font-semibold">
              {profile.name}
            </h2>
          </div>
        ))}
      </div>
    </main>
  );
}