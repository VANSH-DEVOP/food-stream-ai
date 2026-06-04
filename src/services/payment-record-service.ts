import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

interface SavePaymentParams {
  paymentId: string;
  razorpayOrderId: string;
  amount: number;
  userId: string;
  userEmail: string;
  status: string;
}

export async function savePayment(
  payment: SavePaymentParams
) {
  await addDoc(
    collection(db, "payments"),
    {
      ...payment,
      createdAt:
        serverTimestamp(),
    }
  );
}