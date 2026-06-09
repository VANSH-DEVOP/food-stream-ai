import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
  query,
  where,
  onSnapshot
} from "firebase/firestore";
import {
  normalizeFoodName
} from "@/utils/food";
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

        searchName: 
          normalizeFoodName(
          food.name
        ),

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
    {
      ...food,

      ...(food.name && {
        searchName:
          normalizeFoodName(
            food.name
          ),
      }),
    }
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
      "searchName",
      "==",
      normalizeFoodName(name)
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
      "searchName",
      "==",
      normalizeFoodName(name)
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

export function subscribeToFoods(
  callback: (
    foods: FoodItem[]
  ) => void
) {

  return onSnapshot(
    collection(db, "foods"),
    (snapshot) => {

      const foods =
        snapshot.docs.map(
          (doc) => ({
            ...doc.data(),
            id: doc.id,
          })
        ) as FoodItem[];

      callback(
        foods
      );

    }
  );
}