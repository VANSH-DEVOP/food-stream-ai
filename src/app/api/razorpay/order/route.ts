import { NextResponse }
from "next/server";

import { razorpay }
from "@/lib/razorpay";

export async function POST(
  request: Request
) {
  try {

    const {
      amount,
    } =
      await request.json();

    console.log(
    "Razorpay initialized"
    );

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