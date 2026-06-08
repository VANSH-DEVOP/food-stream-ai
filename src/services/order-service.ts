import {
  addDoc,
  collection,
  Timestamp,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  onSnapshot,
  QuerySnapshot
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Order,OrderStatus } from "@/types";

export async function placeOrder(
  order: Order
) {
  return await addDoc(
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

export async function getAllOrders() {
  const querySnapshot =
    await getDocs(
      collection(db, "orders")
    );

  return querySnapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  ) as Order[];
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
) {
  await updateDoc(
    doc(db, "orders", orderId),
    {
      status,
    }
  );
}

export function subscribeToOrders(
  userId: string,
  callback: (orders: Order[]) => void
) {

  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId)
  );

  return onSnapshot(
    q,
    (snapshot) => {

      const orders =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        ) as Order[];

      callback(orders);

    }
  );
}

export function subscribeToAllOrders(
  callback: (
    orders: Order[]
  ) => void
) {

  return onSnapshot(
    collection(db, "orders"),
    (snapshot) => {

      const orders =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        ) as Order[];

      callback(orders);

    }
  );
}