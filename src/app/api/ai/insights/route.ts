import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  generateRecommendationInsight,
} from "@/services/ai-insight-service";

export async function POST(
  request: NextRequest
) {
  try {

    const {
      foods,
    } =
      await request.json();

    const insight =
      await generateRecommendationInsight(
        foods
      );

    return NextResponse.json({
      insight,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        insight:
          "Recommendations generated based on your preferences.",
      },
      {
        status: 500,
      }
    );
  }
}