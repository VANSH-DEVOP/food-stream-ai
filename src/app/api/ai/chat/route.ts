import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  generateChatResponse,
} from "@/services/ai-chat-service";

export async function POST(
  request: NextRequest
) {
  try {

    const {
      question,
      foods,
      profile,
    } =
      await request.json();

    const response =
      await generateChatResponse(
        question,
        foods,
        profile
      );

    return NextResponse.json({
      response,
    });

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