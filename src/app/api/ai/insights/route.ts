import {
  NextRequest,
  NextResponse,
} from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import {
  generateRecommendationInsight,
} from "@/services/ai-insight-service";

import { verifyAuth } from "@/lib/verify-auth";

export async function POST(
  request: NextRequest
) {
  try {
    const user =
      await verifyAuth(
        request
      );

    if (!user) {

      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }

    const allowed =
      rateLimit(
        `ai-insights-${user.uid}`,
        20,
        60_000
      );

    if (!allowed) {

      return NextResponse.json(
        {
          response:
            "Too many requests. Please wait a minute.",
        },
        {
          status: 429,
        }
      );

    }

    const {
      foods,
    } =
      await request.json();

    if (
      !Array.isArray(foods)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid foods",
        },
        {
          status: 400,
        }
      );
    }

    if (
      foods.length > 10
    ) {
      return NextResponse.json(
        {
          error:
            "Too many foods",
        },
        {
          status: 400,
        }
      );
    }

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