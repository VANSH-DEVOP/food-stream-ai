export async function getAIExplanation(
  foodName: string,
  reasons: string[]
) {

  const response =
    await fetch(
      "/api/ai/explanation",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify({
            foodName,
            reasons,
          }),
      }
    );

  const data =
    await response.json();

  return data.explanation;
}

export async function getAIInsight(
  foods: {
    name: string;
    reasons?: string[];
  }[]
) {

  const response =
    await fetch(
      "/api/ai/insights",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify({
            foods,
          }),
      }
    );

  const data =
    await response.json();

  return data.insight;
}