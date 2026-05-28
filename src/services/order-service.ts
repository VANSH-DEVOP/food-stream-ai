import {
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";

import {
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Order } from "@/types";

export async function placeOrder(
  order: Order
) {
  await addDoc(
    collection(db, "orders"),
    {
      ...order,

      createdAt:
        Timestamp.now(),
    }
  );
}

export async function getOrders(
  userId: string
) {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId)
  );

  const querySnapshot =
    await getDocs(q);

  return querySnapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as Order[];
}