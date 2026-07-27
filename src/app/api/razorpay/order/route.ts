import { NextRequest,NextResponse }
from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { getRazorpay }
from "@/lib/razorpay";
import { getAdminDb } from "@/lib/firebase-admin";
import { priceOrder } from "@/lib/pricing";

import { verifyAuth } from "@/lib/verify-auth";

const MAX_LINES = 50;

const MAX_QUANTITY = 20;

const MAX_TOTAL_RUPEES = 50_000;

interface RequestedLine {
  id: string;
  quantity: number;
}

function parseLines(
  value: unknown
): RequestedLine[] | null {

  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.length > MAX_LINES
  ) {
    return null;
  }

  const lines: RequestedLine[] = [];

  for (const entry of value) {

    if (
      typeof entry !== "object" ||
      entry === null
    ) {
      return null;
    }

    const {
      id,
      quantity,
    } = entry as Record<
      string,
      unknown
    >;

    if (
      typeof id !== "string" ||
      !id ||
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY
    ) {
      return null;
    }

    lines.push({
      id,
      quantity,
    });
  }

  return lines;
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
        `razorpay-order-${user.uid}`,
        10,
        60_000
      );

    if (!allowed) {

      return NextResponse.json(
        {
          error:
            "Too many requests. Please wait a minute.",
        },
        {
          status: 429,
        }
      );

    }

    const {
      items,
    } =
      await request.json();

    const lines =
      parseLines(items);

    if (!lines) {
      return NextResponse.json(
        {
          error:
            "Invalid items",
        },
        {
          status: 400,
        }
      );
    }

    // Prices are read from Firestore, never taken from the request body —
    // otherwise a tampered client could pay ₹1 for any cart.
    const db = getAdminDb();

    const foodDocs =
      await db.getAll(
        ...lines.map(
          (line) =>
            db
              .collection("foods")
              .doc(line.id)
        )
      );

    const pricedLines = [];

    for (
      let i = 0;
      i < lines.length;
      i++
    ) {

      const snapshot =
        foodDocs[i];

      const food =
        snapshot.data();

      if (
        !snapshot.exists ||
        !food ||
        food.isAvailable === false ||
        typeof food.price !== "number"
      ) {
        return NextResponse.json(
          {
            error:
              "One or more items are no longer available",
          },
          {
            status: 409,
          }
        );
      }

      pricedLines.push({
        price: food.price,

        quantity:
          lines[i].quantity,
      });
    }

    const breakdown =
      priceOrder(pricedLines);

    if (
      breakdown.total <= 0 ||
      breakdown.total >
        MAX_TOTAL_RUPEES
    ) {
      return NextResponse.json(
        {
          error:
            "Order total out of range",
        },
        {
          status: 400,
        }
      );
    }

    const order =
      await getRazorpay().orders.create({
        amount:
          breakdown.total * 100,

        currency: "INR",

        // Lets the verify route prove the payment belongs to this user.
        notes: {
          userId: user.uid,
        },
      });

    return NextResponse.json({
      order,
      breakdown,
    });

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
