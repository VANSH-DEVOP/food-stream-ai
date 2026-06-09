"use client";

import { AppUser } from "@/types";
import { updateUserRole } from "@/services/user-service";
import { toast } from "sonner";

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

    const manageableUsers =
    users.filter(
        (user) =>
        user.id !==
        superAdminUid
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

    <h2 className="mb-6 text-2xl font-bold">
      Admin Management
    </h2>

    <div className="space-y-3">

      {manageableUsers.map((user) => (

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
            {user.role.toUpperCase()}
            </span>

          </div>

          <button
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

  </div>
);
}