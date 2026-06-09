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

  function normalizeFoodName(
    value: string
  ) {
    return value
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9 ]/g,
        ""
      )
      .replace(
        /\s+/g,
        " "
      );
  }

  function getFallbackRecommendation(
    foods: FoodItem[],
    profile: UserProfile
  ) {

    const isNewProfile =
    !profile.cuisine ||
    !profile.favoriteCategory ||
    !profile.spiceLevel;

    if (isNewProfile) {

      const popularFoods =
        foods.slice(0, 5);

      return popularFoods[0];
    }

    const matches =
      foods.filter(
        (food) =>
          food.cuisine ===
            profile.cuisine &&
          food.category ===
            profile.favoriteCategory &&
          food.spiceLevel ===
            profile.spiceLevel
      );

    const recommendation =
      matches[0] ??
      foods[0];

    if (!recommendation) {
      return null;
    }

    return recommendation;
  }

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
      normalizeFoodName(
        result.foodName
      );

    const matchedFood =
      foods.find(
        food =>
          normalizeFoodName(
            food.name
          ) === normalized
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

      if (
        candidateFoods.length === 0
      ) {
        return {
          response:
            "I couldn't find a surprise item matching your preferences.",
          action: null,
        };
      }

      const randomFood =
        candidateFoods[
          Math.floor(
            Math.random() *
            candidateFoods.length
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

    const fallbackFood =
    getFallbackRecommendation(
      foods,
      profile
    );

if (fallbackFood) {

  return {
    response:
        `While my AI service is busy right now, I'd recommend ${fallbackFood.name} for you.

  It matches your preference for ${profile.cuisine} cuisine, ${profile.favoriteCategory} dishes and ${profile.spiceLevel} spice level.

  Price: ₹${fallbackFood.price}.`,
      action: null,
    };
  }

  return {
    response:
      "I'm currently experiencing high demand. Please try again shortly.",
    action: null,
  };

  }
}