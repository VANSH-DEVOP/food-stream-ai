export interface FoodItem {
  id: string;

  name: string;

  description: string;

  category: string;

  cuisine: string;

  spiceLevel: string;

  tags: string[];

  price: number;

  image: string;

  isAvailable?: boolean;

  reasons?: string[];
}