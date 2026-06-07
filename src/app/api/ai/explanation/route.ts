import { NextRequest, NextResponse }
from "next/server";

import {
  generateFoodExplanation,
} from "@/services/ai-explanation-service";

export async function POST(
  request: NextRequest
) {
  try {

    const {
      foodName,
      reasons,
    } = await request.json();

    const explanation =
      await generateFoodExplanation(
        foodName,
        reasons
      );

    return NextResponse.json({
      explanation,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        explanation:
          "Recommended based on your preferences.",
      },
      {
        status: 500,
      }
    );
  }
}