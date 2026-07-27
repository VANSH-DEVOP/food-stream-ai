"use client";

import { AppUser } from "@/types";
import { updateUserRole } from "@/services/user-service";
import { toast } from "sonner";
import { useState } from "react";

interface AdminManagementProps {
  users: AppUser[];
  refreshUsers: () => Promise<void>;
  superAdminUid: string;
}

export default function AdminManagement({
  users,
  refreshUsers,
  superAdminUid,
}: AdminManagementProps) {

    const [search, setSearch] =
    useState("");

    const manageableUsers =
    users.filter(
        (user) =>
        user.id !==
        superAdminUid
    );

    const filteredUsers =
    manageableUsers.filter(
        (user) =>
        (user.email ?? "")
            .toLowerCase()
            .includes(
            search.toLowerCase()
            )
     );

    async function handleRoleChange(
        uid: string,
        role: "user" | "admin"
        ) {

        await updateUserRole(
            uid,
            role
        );

        toast.success(
            `Role updated to ${role}`
        );

        await refreshUsers();
    }

    return (
  <div className="mt-10 rounded-2xl bg-zinc-900 p-6">

    <div className="mb-6 flex flex-wrap items-center gap-4">

        <h2 className="whitespace-nowrap text-2xl font-bold">
            Admin Management
        </h2>

        <input
            aria-label="Search Users"
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
            setSearch(
                e.target.value
            )
            }
            className="flex-1 rounded-lg bg-zinc-800 px-4 py-2"
        />

    </div>

    <div className="max-h-[500px] space-y-3 overflow-y-auto food-scroll pr-2">

      {filteredUsers.map((user) => (

        <div
          key={user.id}
          className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
        >

          <div>

            <p className="font-medium">
              {user.email}
            </p>

            <span
            className={
                user.role === "admin"
                ? "rounded bg-green-500/20 px-2 py-1 text-green-400"
                : "rounded bg-zinc-700 px-2 py-1 text-zinc-300"
            }
            >
            {(user.role ?? "user").toUpperCase()}
            </span>

          </div>

          <button
          aria-label="Admin-button"
          type="button"
            onClick={() =>
              handleRoleChange(
                user.id,
                user.role === "admin"
                  ? "user"
                  : "admin"
              )
            }
            className="rounded-lg bg-orange-500 px-3 py-2 font-semibold text-black"
          >
            {
              user.role === "admin"
                ? "Remove Admin"
                : "Make Admin"
            }
          </button>

        </div>

      ))}

    </div>

    {
    filteredUsers.length === 0 && (
        <div className="rounded-xl border border-zinc-800 p-6 text-center text-zinc-400">
        No users found.
        </div>
    )
    }

  </div>
);
}