import {
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export async function createUserDocument(
  uid: string,
  email: string
) {
  const userRef = doc(
    db,
    "users",
    uid
  );

  const existingUser =
    await getDoc(userRef);

  if (existingUser.exists()) {
    return;
  }

  await setDoc(userRef, {
    email,
    role: "user",
    createdAt:
      Timestamp.now(),
  });
}

export async function getUserRole(
  uid: string
) {
  const userRef = doc(
    db,
    "users",
    uid
  );

  const userDoc =
    await getDoc(userRef);

  if (!userDoc.exists()) {
    return null;
  }

  return userDoc.data().role;
}

export async function isAdmin(
  uid: string
) {
  const role =
    await getUserRole(uid);

  return role === "admin";
}

export async function getUser(
  uid: string
) {
  const userRef =
    doc(db, "users", uid);

  const userDoc =
    await getDoc(userRef);

  if (!userDoc.exists()) {
    return null;
  }

  return userDoc.data();
}