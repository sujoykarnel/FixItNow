import { emit } from "node:cluster";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { handleCheckoutComplete } from "./payment.utils";

const createCheckoutSession = async (bookingId: string, userId: string) => {
  const transectionResult = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUniqueOrThrow({
      where: {
        id: bookingId,
        customerId: userId,
      },
      include: {
        service: true,
      },
    });

    const customer = await tx.user.findUniqueOrThrow({
      where: { id: userId },
      omit: { password: true },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customer.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "bdt",
            unit_amount: Math.round(booking.amount * 100),
            product_data: {
              name: booking.service.title,
              description: booking.service.discription,
            },
          },
        },
      ],

      success_url: `${config.app_url}/payment?success=true`,
      cancel_url: `${config.app_url}/payment?success=false`,
      metadata: {
        bookingId,
      },
    });

    return session.url;
  });

  return transectionResult;
};

const handleWebhook = async (payload: Buffer, signature: string) => {
  const endpointSecret = config.stripe_webhook_secret as string;
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endpointSecret,
  );

  // handle event
  switch (event.type) {
    case "checkout.session.completed":
      console.log(event.data.object);

      await handleCheckoutComplete(event.data.object);
      break;
    default:
      //unexpected event type
      console.log(`No event matchMedia. Unhandle event type ${event.type}`);
      break;
  }
};

export const paymentService = {
  createCheckoutSession,
  handleWebhook,
};
