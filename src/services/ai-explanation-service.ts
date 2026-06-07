import { ai } from "@/lib/gemini";

export async function generateFoodExplanation(
  foodName: string,
  reasons: string[]
) {
  const prompt = `
Food: ${foodName}

Reasons:
${reasons.join("\n")}

Explain in one short sentence why this food is recommended.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  return (
    response.text ??
    "Recommended based on your preferences."
  );
}