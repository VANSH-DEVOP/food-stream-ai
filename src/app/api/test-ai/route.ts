import { NextResponse }
from "next/server";

import {
  generateFoodExplanation
}
from "@/services/ai-explanation-service";

export async function GET() {

  const result =
    await generateFoodExplanation(
      "Paneer Butter Masala",
      [
        "Matches favorite cuisine",
        "Ordered 5 times before",
        "Matches spice preference",
      ]
    );

  return NextResponse.json({
    result,
  });
}