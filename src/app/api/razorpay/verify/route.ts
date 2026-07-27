import crypto from "crypto";
import { NextRequest,NextResponse } from "next/server";
import { verifyAuth } from "@/lib/verify-auth";
import { rateLimit } from "@/lib/rate-limit";
import { getRazorpay } from "@/lib/razorpay";

function signaturesMatch(
  expected: string,
  received: string
) {

  const expectedBuffer =
    Buffer.from(
      expected,
      "utf8"
    );

  const receivedBuffer =
    Buffer.from(
      received,
      "utf8"
    );

  if (
    expectedBuffer.length !==
    receivedBuffer.length
  ) {
    return false;
  }

  return crypto.timingSafeEqual(
    expectedBuffer,
    receivedBuffer
  );
}

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
          success: false,
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
        `razorpay-verify-${user.uid}`,
        10,
        60_000
      );

    if (!allowed) {

      return NextResponse.json(
        {
          success: false,
          error:
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

    if (
      typeof razorpay_order_id !==
        "string" ||
      typeof razorpay_payment_id !==
        "string" ||
      typeof razorpay_signature !==
        "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid payment payload",
        },
        {
          status: 400,
        }
      );
    }

    const secret =
      process.env
        .RAZORPAY_KEY_SECRET;

    if (!secret) {
      throw new Error(
        "Missing RAZORPAY_KEY_SECRET"
      );
    }

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          secret
        )
        .update(body)
        .digest("hex");

    if (
      !signaturesMatch(
        expectedSignature,
        razorpay_signature
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Signature mismatch",
        },
        {
          status: 400,
        }
      );
    }

    // A valid signature only proves the payment is genuine, not that it
    // belongs to the caller. Re-read the order from Razorpay and confirm
    // both the owner we recorded at creation time and the paid amount.
    const order =
      await getRazorpay()
        .orders.fetch(
          razorpay_order_id
        );

    if (
      order.notes?.userId !==
      user.uid
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Order does not belong to this user",
        },
        {
          status: 403,
        }
      );
    }

    if (
      order.status !== "paid"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Order is not paid",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,

      // The authoritative amount, in rupees, for the client to record.
      amount:
        Number(order.amount) / 100,
    });

  } catch (error) {

    console.error(error);

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
