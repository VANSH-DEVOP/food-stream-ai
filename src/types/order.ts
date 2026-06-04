import { CartItem } from "./cart";
import { Timestamp } from "firebase/firestore";

export interface Order {
  id?: string;

  userId: string;

  userEmail: string;

  items: CartItem[];

  subtotal: number;

  deliveryFee: number;

  gst: number;

  paymentStatus:
    | "pending"
    | "paid";

  paymentId?: string;

  status: OrderStatus;

  total: number;

  createdAt?: Timestamp;
}

export type OrderStatus =
  | "Pending"
  | "Preparing"
  | "Out For Delivery"
  | "Delivered";