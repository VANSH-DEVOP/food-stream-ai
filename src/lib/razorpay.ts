import Razorpay from "razorpay";

let client: Razorpay | undefined;

// Constructed lazily so importing a route module (during `next build`, for
// example) never requires the API keys to be present.
export function getRazorpay() {

  if (client) {
    return client;
  }

  const keyId =
    process.env
      .NEXT_PUBLIC_RAZORPAY_KEY_ID;

  const keySecret =
    process.env
      .RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      "Missing NEXT_PUBLIC_RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET"
    );
  }

  client = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  return client;
}
