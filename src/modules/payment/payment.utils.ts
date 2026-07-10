import Stripe from "stripe";
import { prisma } from "../../lib/prisma";

export const handleCheckoutComplete = async (
  session: Stripe.Checkout.Session,
) => {
  const bookingId = session.metadata?.bookingId;

  if (!bookingId) {
    console.log("Webhook: Missing values for create checkout session");
    return;
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.upsert({
      where: {
        bookingId,
      },
      update: {
        status: "SUCCESS",
        amount: (session.amount_total ?? 0) / 100,
        transectionId: session.payment_intent?.toString(),
        provider: "STRIPE",
        method: session.payment_method_types?.join(", "),
        paidAt: new Date(),
      },
      create: {
        bookingId,
        status: "SUCCESS",
        amount: (session.amount_total ?? 0) / 100,
        transectionId: session.payment_intent?.toString(),
        provider: "STRIPE",
        method: session.payment_method_types?.join(", "),
        paidAt: new Date(),
      },
    });

    await tx.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "COMPLETED",
      },
    });
  });
};
