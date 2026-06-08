import { ai } from "@/lib/gemini";

import {
  FoodItem,
  UserProfile,
} from "@/types";

import {
  AIChatResult,
} from "@/types/ai";

export async function generateChatResponse(
  question: string,
  foods: FoodItem[],
  profile: UserProfile
): Promise<AIChatResult> {

  const menu =
    foods
      .slice(0, 15)
      .map(
        (food) =>
          `${food.name} | ₹${food.price} | ${food.category} | ${food.cuisine} | ${food.spiceLevel}`
      )
      .join("\n");

  const prompt = `
You are FoodStream AI.
User Profile:
Name: ${profile.name}
Cuisine: ${profile.cuisine}
Spice Level: ${profile.spiceLevel}
Favorite Category: ${profile.favoriteCategory}
Menu:
${menu}
User:
${question}
Determine the user's intent.
Supported intents:
1. recommend_food
2. add_to_cart
3. surprise_me
Return ONLY JSON.
Examples:
{
  "intent":"recommend_food",
  "response":"Based on your preference for Indian vegetarian food and medium spice levels, I'd recommend Paneer Butter Masala (₹289). It matches your favorite cuisine and category while offering a rich and satisfying dinner option."
}
{
  "intent":"add_to_cart",
  "foodName":"Paneer Butter Masala",
  "quantity":1,
  "response":"I found Paneer Butter Masala for you."
}
{
  "intent":"surprise_me",
  "response":"Let's surprise you today."
}
Rules:
- Recommendation responses should be 3-4 sentences.
- Mention why the food fits the user's profile.
- Mention price when relevant.
- Keep under 80 words.
- Make the response a little representable
`;

  try {

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    const text =
      response.text ?? "";

    const cleanedText =
    text
      .replace(
        /```json/g,
        ""
      )
      .replace(
        /```/g,
        ""
      )
      .trim();

    let result;

    try {

      result =
        JSON.parse(cleanedText);

    } catch {

      return {
        response: text,
        action: null,
      };

    }

    if (
      result.intent ===
      "add_to_cart"
    ) {

      const normalized =
      result.foodName
        .toLowerCase()
        .trim();

      const matchedFood =
      foods.find(
        food =>
          food.name
            .toLowerCase()
            .trim() ===
          normalized
      );

      return {
        response:
          result.response ??
          "I found a food for you.",

        action:
          matchedFood
            ? {
                type:
                  "add_to_cart",

                foodId:
                  matchedFood.id,

                quantity:
                  result.quantity ?? 1,
              }
            : null,
      };
    }

    if (
      result.intent ===
      "surprise_me"
    ) {

      const candidateFoods =
      foods.filter(
        food =>
          food.category ===
          profile.favoriteCategory
      );

      const randomFood =
        candidateFoods[
          Math.floor(
            Math.random() *
            foods.length
          )
        ];

      return {
        response:
          `Today's surprise pick is ${randomFood.name}.`,

        action: {
          type:
            "add_to_cart",

          foodId:
            randomFood.id,

          quantity: 1,
        },
      };
    }

    return {
      response:
        result.response ??
        "I found some recommendations for you.",
      action: null,
    };

  } catch (error) {

    console.error(error);

    return {
      response: `
I'm currently experiencing high demand.

Please try again shortly.
      `,
      action: null,
    };

  }
}