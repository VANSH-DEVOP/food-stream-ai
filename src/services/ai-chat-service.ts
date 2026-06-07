import { ai } from "@/lib/gemini";
import {
  FoodItem,
  UserProfile,
} from "@/types";

export async function generateChatResponse(
  question: string,
  foods: FoodItem[],
  profile: UserProfile
) {

  const menu =
    foods
      .slice(0, 50)
      .map(
        (food) =>
          `
Name: ${food.name}
Price: ₹${food.price}
Category: ${food.category}
Cuisine: ${food.cuisine}
Spice: ${food.spiceLevel}
Description: ${food.description}
`
      )
      .join("\n");

  const prompt = `
You are FoodStream AI.

Selected Profile:

Name: ${profile.name}
Favorite Category: ${profile.favoriteCategory}
Preferred Cuisine: ${profile.cuisine}
Preferred Spice Level: ${profile.spiceLevel}

Menu:

${menu}

User Question:

${question}

Rules:
- Recommend only foods from the menu.
- Mention prices when relevant.
- Keep responses under 120 words.
- Do not use markdown.
- Do not use: * ** # -
- Use plain readable text only.
- Be concise and friendly.
- Use numbered recommendations.
Example:
1. Paneer Butter Masala (₹289)
2. Palak Paneer (₹259)
Then explain briefly.
`;

  try {

  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  return (
    response.text ??
    "I couldn't generate a recommendation."
  );

} catch (error) {

  console.error(error);

  return `
I'm currently experiencing high demand.

Try asking again in a few moments.

Meanwhile, for ${profile.name}, I'd recommend exploring ${profile.cuisine} ${profile.favoriteCategory} dishes that match the preferred ${profile.spiceLevel} spice level.
`;

}
}