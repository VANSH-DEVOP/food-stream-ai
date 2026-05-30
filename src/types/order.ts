import { CartItem } from "./cart";
import { Timestamp } from "firebase/firestore";

export interface Order {
  id?: string;

  userId: string;

  items: CartItem[];

  subtotal: number;

  deliveryFee: number;

  total: number;

  createdAt?: Timestamp;
}