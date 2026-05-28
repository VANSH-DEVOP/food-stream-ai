import { CartItem } from "./cart";

export interface Order {
  id?: string;

  userId: string;

  profileId: string;

  profileName: string;

  items: CartItem[];

  subtotal: number;

  deliveryFee: number;

  total: number;

  createdAt?: string;
}