"use client";

import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";

import { useAuthStore } from "@/store/auth-store";

import { getUser } from "@/services/user-service";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const setLoading = useAuthStore(
    (state) => state.setLoading
  );

  const setSelectedProfile =
    useAuthStore(
      (state) =>
        state.setSelectedProfile
    );

  useEffect(() => {

  const unsubscribe =
    onAuthStateChanged(
      auth,
      async (user) => {

        if (user) {

          // The profile picker's selection is persisted across reloads,
          // so drop it if it belongs to a different account.
          const {
            selectedProfile,
          } = useAuthStore.getState();

          if (
            selectedProfile &&
            selectedProfile.userId !==
              user.uid
          ) {
            setSelectedProfile(null);
          }

          const userData =
            await getUser(
              user.uid
            );

          setUser({
            uid: user.uid,

            phoneNumber:
              user.phoneNumber,

            email:
              user.email,

            role:
              userData?.role ??
              "user",
          });

        } else {

          setUser(null);

          setSelectedProfile(null);

        }

        setLoading(false);

      }
    );

  return () =>
    unsubscribe();

}, [
  setUser,
  setLoading,
  setSelectedProfile,
]);

  return <>{children}</>;
}