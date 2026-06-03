import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
  query,
  where
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { FoodItem } from "@/types";

export async function getFoods() {
  const snapshot =
    await getDocs(
      collection(db, "foods")
    );

  return snapshot.docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id,
    })
  ) as FoodItem[];
}

export async function addFood(
  food: Omit<
    FoodItem,
    "id"
  >
) {
  await addDoc(
    collection(db, "foods"),
    {
        ...food,

        isAvailable: true,

        createdAt:
        Timestamp.now(),
    }
  );
}

export async function updateFood(
  id: string,
  food: Partial<FoodItem>
) {
  await updateDoc(
    doc(db, "foods", id),
    food
  );
}

export async function deleteFood(
  id: string
) {
  await deleteDoc(
    doc(db, "foods", id)
  );
}

export async function foodExists(
  name: string
) {
  const q = query(
    collection(db, "foods"),
    where(
      "name",
      "==",
      name
    )
  );

  const snapshot =
    await getDocs(q);

  return !snapshot.empty;
}

export async function
foodExistsExceptCurrent(
  name: string,
  currentFoodId: string
) {
  const q = query(
    collection(db, "foods"),
    where(
      "name",
      "==",
      name
    )
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.some(
    (doc) =>
      doc.id !==
      currentFoodId
  );
}