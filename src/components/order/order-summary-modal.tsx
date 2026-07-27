"use client";

import { useOrderStore } from "@/store/order-store";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { placeOrder } from "@/services/order-service";
import {
  createPaymentOrder,
  openRazorpayCheckout,
  verifyPayment
} from "@/services/payment-service";
import { useState } from "react";
import {
  savePayment,
} from "@/services/payment-record-service";
import { toast } from "sonner";
import { priceOrder } from "@/lib/pricing";

export default function OrderSummaryModal() {
  const isOpen =
    useOrderStore(
      (state) =>
        state.isOrderSummaryOpen
    );

  const [isProcessing, setIsProcessing] =
  useState(false); 
  
  const user = useAuthStore(
    (state) => state.user
    );

  const clearCart =
    useCartStore(
        (state) => state.clearCart
    );

  const closeOrderSummary =
    useOrderStore(
      (state) =>
        state.closeOrderSummary
    );

  const items =
    useCartStore(
      (state) => state.items
    );

  if (!isOpen) return null;

  // Display only — the server reprices the cart and is the authority on
  // what is actually charged and recorded.
  const {
    subtotal,
    deliveryFee,
    gst,
    total,
  } = priceOrder(items);


  async function handleConfirmOrder() {
    if (
      !user ||
      items.length === 0
    ) {
      return;
    }

    try {
      setIsProcessing(true);

      const {
        order: razorpayOrder,
        breakdown,
      } =
      await createPaymentOrder(
        items
      );

      const paymentResult =
        await openRazorpayCheckout(
          razorpayOrder
      );

      const verification =
        await verifyPayment(
          paymentResult
        );

      if (
        !verification.success
      ) {
        throw new Error(
          verification.error ??
            "Payment verification failed"
        );
      }

      await savePayment({
        paymentId:
          paymentResult.razorpay_payment_id,

        razorpayOrderId:
          paymentResult.razorpay_order_id,

        amount:
          breakdown.total,

        userId:
          user.uid,

        userEmail:
          user.email ?? "",

        status:
          "success",
      });

      await placeOrder({
        userId: user.uid,

        userEmail:
          user.email ?? "",

        items,

        subtotal:
          breakdown.subtotal,

        deliveryFee:
          breakdown.deliveryFee,

        gst:
          breakdown.gst,

        total:
          breakdown.total,

        paymentStatus:
          "paid",

        paymentId:
          paymentResult.razorpay_payment_id,

        status: "Pending",
      });

      clearCart();

      closeOrderSummary();

      toast.success(
        "Payment successful! Order placed."
      );
    } catch (error) {

      console.error(
        "Payment Error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70">
      <div className="w-full max-w-lg rounded-2xl bg-zinc-950 p-6 text-white">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Review Order
          </h2>

          <button
          aria-label="Close order summary"
          type="button"
            onClick={
              closeOrderSummary
            }
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          {Object.entries(
            items.reduce(
                (acc, item) => {
                if (!acc[item.profileName]) {
                    acc[item.profileName] = [];
                }

                acc[item.profileName].push(item);

                return acc;
                },
                {} as Record<string, typeof items>
            )
            ).map(([profileName, profileItems]) => (
            <div
                key={profileName}
                className="mb-4"
            >
                <h3 className="mb-2 text-lg font-bold text-orange-500">
                {profileName}
                </h3>

                <div className="space-y-2 pl-4">
                {profileItems.map((item) => (
                    <div
                    key={`${item.id}-${item.profileId}`}
                    className="flex justify-between"
                    >
                    <span>
                        {item.name}
                    </span>

                    <span>
                        x{item.quantity}
                    </span>
                    </div>
                ))}
                </div>
            </div>
            ))}
        </div>

        <div className="mt-6 border-t border-zinc-800 pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>
              ₹{subtotal}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>

            <span>
              ₹{deliveryFee}
            </span>
          </div>

          <div className="flex justify-between">
            <span>GST (5%)</span>

            <span>
              ₹{gst}
            </span>
          </div>

          <div className="mt-3 flex justify-between text-xl font-bold">
            <span>Total</span>

            <span>
              ₹{total}
            </span>
          </div>
        </div>

        <button
        aria-label="Process Payment"
        type="button"
        disabled={isProcessing}
          onClick={handleConfirmOrder}
          className="mt-6 w-full rounded-xl bg-orange-500 p-3 font-bold text-black"
        >
          {isProcessing
          ? "Processing Payment..."
          : `Pay ₹${total}`}
        </button>
      </div>
    </div>
  );
}