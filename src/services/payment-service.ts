
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