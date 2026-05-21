"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

const profiles = [
  {
    id: "1",
    name: "Dad",
  },
  {
    id: "2",
    name: "Mom",
  },
  {
    id: "3",
    name: "Kid",
  },
];

export default function ProfilesPage() {
  const router = useRouter();

  const user = useAuthStore(
    (state) => state.user
  );

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="mb-10 text-5xl font-bold">
        Who&apos;s ordering?
      </h1>

      <div className="flex gap-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition hover:scale-105 hover:border-orange-500"
          >
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