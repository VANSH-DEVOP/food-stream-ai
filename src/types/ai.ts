export interface AIChatResult {
  response: string;

  action: {
    type: "add_to_cart";
    foodId: string;
    quantity: number;
  } | null;

  recommendedFoodId?: string;
}