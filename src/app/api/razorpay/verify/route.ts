import crypto from "crypto";
import { NextRequest,NextResponse } from "next/server";
import { verifyAuth } from "@/lib/verify-auth";
import { rateLimit } from "@/lib/rate-limit";

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
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET!
        )
        .update(body)
        .digest("hex");

    const isValid =
      expectedSignature ===
      razorpay_signature;

    return NextResponse.json({
      success: isValid,
    });

  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}