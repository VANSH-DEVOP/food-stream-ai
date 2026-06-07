import { ai } from "@/lib/gemini";

interface FoodRecommendation {
  name: string;
  reasons?: string[];
}

export async function generateRecommendationInsight(
  foods: FoodRecommendation[]
) {
  const foodList =
    foods
      .map(
        (food, index) =>
          `${index + 1}. ${food.name}
Reasons:
${food.reasons?.join(", ")}`
      )
      .join("\n\n");

  const prompt = `
You are a food recommendation assistant.

Top recommended foods:

${foodList}

Generate a personalized recommendation insight in 2-3 concise sentences.

Rules:
- Mention user preferences naturally.
- Mention 2-3 recommended foods.
- Keep it under 60 words.
- No bullet points.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  return (
    response.text ??
    "Recommendations generated based on your preferences."
  );
}