import Razorpay from "razorpay";

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export async function createPaymentOrder(
  amount: number
) {
  const response =
    await fetch(
      "/api/razorpay/order",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      }
    );

  const data =
    await response.json();

  console.log(
    "Razorpay Order Response:",
    data
  );

  return data;
}

export async function openRazorpayCheckout(
  order: any
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
          console.log(
            "PAYMENT SUCCESS",
            response
          );

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
  const response =
    await fetch(
      "/api/razorpay/verify",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          payment
        ),
      }
    );

  return response.json();
}