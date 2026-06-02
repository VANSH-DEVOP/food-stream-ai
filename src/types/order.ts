import { CartItem } from "./cart";
import { Timestamp } from "firebase/firestore";

export interface Order {
  id?: string;

  userId: string;

  items: CartItem[];

  subtotal: number;

  deliveryFee: number;

  gst: number;

  paymentStatus:
    | "pending"
    | "paid";

  paymentId?: string;

  status:
    | "Pending"
    | "Preparing"
    | "Out For Delivery"
    | "Delivered";

  total: number;

  createdAt?: Timestamp;
}