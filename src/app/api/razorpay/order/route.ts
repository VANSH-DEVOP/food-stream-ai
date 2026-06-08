import { NextRequest,NextResponse }
from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { razorpay }
from "@/lib/razorpay";

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
        user.uid,
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
      amount,
    } =
      await request.json();

    if (
      typeof amount !==
      "number"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid amount",
        },
        {
          status: 400,
        }
      );
    }

    if (
      amount <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Amount must be positive",
        },
        {
          status: 400,
        }
      );
    }

    if (
      amount > 50000
    ) {
      return NextResponse.json(
        {
          error:
            "Amount too large",
        },
        {
          status: 400,
        }
      );
    }

    const order =
      await razorpay.orders.create({
        amount:
          amount * 100,
        currency: "INR",
      });

    return NextResponse.json(
      order
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create Razorpay order",
      },
      {
        status: 500,
      }
    );

  }
}