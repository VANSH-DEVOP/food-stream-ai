export async function processPayment(
  amount: number
) {
  console.log(
    `Processing payment of ₹${amount}`
  );

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 1500)
  );

  return {
    success: true,
    paymentId:
      crypto.randomUUID(),
  };
}