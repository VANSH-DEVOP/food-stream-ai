import {
  FoodItem,
  UserProfile,
} from "@/types";
import {auth} from "@/lib/firebase"

export async function askAI(
  question: string,
  foods: FoodItem[],
  profile: UserProfile
) {

  const token =
    await auth.currentUser
      ?.getIdToken();

  const response =
    await fetch(
      "/api/ai/chat",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
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

  return data;
}