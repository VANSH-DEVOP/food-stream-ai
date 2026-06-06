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

  useEffect(() => {

  const unsubscribe =
    onAuthStateChanged(
      auth,
      async (user) => {

        if (user) {

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

        }

        setLoading(false);

      }
    );

  return () =>
    unsubscribe();

}, [setUser, setLoading]);

  return <>{children}</>;
}