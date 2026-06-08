import {
  NextRequest,
  NextResponse,
} from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import {
  generateChatResponse,
} from "@/services/ai-chat-service";

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
        `ai-chat-${user.uid}`,
        10,
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
      question,
      foods,
      profile,
    } =
      await request.json();

    if (
      !question ||
      typeof question !== "string"
    ) {
      return NextResponse.json(
        {
          error: "Question required",
        },
        {
          status: 400,
        }
      );
    }

    if (
      question.length > 500
    ) {
      return NextResponse.json(
        {
          error:
            "Question too long",
        },
        {
          status: 400,
        }
      );
    }

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
      foods.length > 100
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

    const result =
      await generateChatResponse(
        question,
        foods,
        profile
      );

    console.log(
      "AI RESULT:",
      result
    );

    return NextResponse.json(
      result
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        response:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}