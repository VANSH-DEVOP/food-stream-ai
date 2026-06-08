import { NextRequest, NextResponse }
from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import {
  generateFoodExplanation,
} from "@/services/ai-explanation-service";
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
        `ai-explanation-${user.uid}`,
        30,
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
      foodName,
      reasons,
    } = await request.json();

    if (
      !foodName ||
      foodName.length > 100
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid food",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Array.isArray(reasons)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid reasons",
        },
        {
          status: 400,
        }
      );
    }

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