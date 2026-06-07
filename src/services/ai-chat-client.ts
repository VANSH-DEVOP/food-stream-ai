import {
  FoodItem,
  UserProfile,
} from "@/types";

export async function askAI(
  question: string,
  foods: FoodItem[],
  profile: UserProfile
) {

  const response =
    await fetch(
      "/api/ai/chat",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify({
            question,
            foods,
            profile,
          }),
      }
    );

  const data =
    await response.json();

  return data.response;
}