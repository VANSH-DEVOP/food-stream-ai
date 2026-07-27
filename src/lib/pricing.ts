export const DELIVERY_FEE = 49;

export const GST_RATE = 0.05;

export interface PricedLine {
  price: number;
  quantity: number;
}

export interface PriceBreakdown {
  subtotal: number;
  deliveryFee: number;
  gst: number;
  total: number;
}

// Shared by the cart UI and the payment API so the amount a user is shown
// is derived the same way as the amount the server charges.
export function priceOrder(
  lines: PricedLine[]
): PriceBreakdown {

  const subtotal =
    lines.reduce(
      (total, line) =>
        total +
        line.price * line.quantity,
      0
    );

  const gst = Math.round(
    subtotal * GST_RATE
  );

  return {
    subtotal,

    deliveryFee: DELIVERY_FEE,

    gst,

    total:
      subtotal +
      DELIVERY_FEE +
      gst,
  };
}
