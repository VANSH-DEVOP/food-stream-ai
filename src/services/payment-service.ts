import {auth} from "@/lib/firebase";
import { PriceBreakdown } from "@/lib/pricing";
import { CartItem } from "@/types";


interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

interface CreatedPaymentOrder {
  order: RazorpayOrder;
  breakdown: PriceBreakdown;
}

// The cart keys items by food *and* profile, so the same dish can appear
// more than once. Collapse them so each food is priced a single time.
function mergeByFoodId(
  items: CartItem[]
) {

  const quantities =
    new Map<string, number>();

  items.forEach((item) => {
    quantities.set(
      item.id,
      (quantities.get(item.id) ?? 0) +
        item.quantity
    );
  });

  return Array.from(
    quantities,
    ([id, quantity]) => ({
      id,
      quantity,
    })
  );
}

// Only ids and quantities are sent: the server looks up prices itself, so
// the amount charged can't be dictated by the browser.
export async function createPaymentOrder(
  items: CartItem[]
): Promise<CreatedPaymentOrder> {
  const token =
    await auth.currentUser
      ?.getIdToken();

  const response =
    await fetch(
      "/api/razorpay/order",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          items:
            mergeByFoodId(items),
        }),
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error ??
        "Could not start payment."
    );
  }

  return data;
}

export async function openRazorpayCheckout(
  order: RazorpayOrder
):Promise<RazorpayPaymentResponse> {
  return new Promise<RazorpayPaymentResponse>(
    (resolve, reject) => {

      const options = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount:
          order.amount,

        currency:
          order.currency,

        order_id:
          order.id,

        name:
          "FoodStream AI",

        description:
          "Food Order Payment",

        prefill: {
          name: "Vansh",
          email: "test@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#f97316",
        },

        handler: function (
          response: RazorpayPaymentResponse
        ) {
          resolve(response);
        },

        modal: {
          ondismiss() {
            reject(
              new Error(
                "Payment cancelled"
              )
            );
          },
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();
    }
  );
}

export async function verifyPayment(
  payment: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
) {
  const token =
    await auth.currentUser
      ?.getIdToken();

  const response =
    await fetch(
      "/api/razorpay/verify",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify(
          payment
        ),
      }
    );

  return response.json();
}