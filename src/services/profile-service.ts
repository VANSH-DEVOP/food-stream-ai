import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { UserProfile } from "@/types";

export async function createProfile(
  userId: string,
  name: string,
  favoriteCategory: string,
  spiceLevel: string,
  cuisine: string
) {
  await addDoc(
    collection(db, "profiles"),
    {
      userId,
      name,
      favoriteCategory,
      spiceLevel,
      cuisine,
    }
  );
}

export async function getProfiles(
  userId: string
) {
  const q = query(
    collection(db, "profiles"),
    where("userId", "==", userId)
  );

  const querySnapshot =
    await getDocs(q);

  return querySnapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as UserProfile[];
}

export async function deleteProfile(
  profileId: string
) {
  await deleteDoc(
    doc(db, "profiles", profileId)
  );
}