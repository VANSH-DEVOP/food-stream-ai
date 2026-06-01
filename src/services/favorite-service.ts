import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Favorite } from "@/types";

export async function addFavorite(
  userId: string,
  profileId: string,
  foodId: number
) {
  await addDoc(
    collection(db, "favorites"),
    {
      userId,
      profileId,
      foodId,
    }
  );
}

export async function getFavorites(
  userId: string
) {
  const q = query(
    collection(db, "favorites"),
    where("userId", "==", userId)
  );

  const querySnapshot =
    await getDocs(q);

  return querySnapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as Favorite[];
}

export async function removeFavorite(
  favoriteId: string
) {
  await deleteDoc(
    doc(
      db,
      "favorites",
      favoriteId
    )
  );
}

export async function deleteFavoritesByProfile(
  profileId: string
) {
  const q = query(
    collection(db, "favorites"),
    where(
      "profileId",
      "==",
      profileId
    )
  );

  const snapshot =
    await getDocs(q);

  await Promise.all(
    snapshot.docs.map(
      (favoriteDoc) =>
        deleteDoc(
          favoriteDoc.ref
        )
    )
  );
}