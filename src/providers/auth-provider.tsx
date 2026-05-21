"use client";

import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";

import { useAuthStore } from "@/store/auth-store";

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
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser({
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            email: user.email,
          });
        } else {
          setUser(null);
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}