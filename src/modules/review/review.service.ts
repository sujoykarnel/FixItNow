import { prisma } from "../../lib/prisma";
import { IReviewPayload } from "./review.interface";

const createReviewIntoDb = async (
  payload: IReviewPayload,
  bookingId: string,
  customerId: string,
) => {
  const { rating, comment } = payload;
  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId,
      customerId,
    },
    include: {
      service: true,
    },
  });

  if (booking.status !== "COMPLETED") {
    throw new Error("Please give your review after job complete");
  }

  const review = await prisma.review.create({
    data: {
      customerId,
      bookingId,
      technicianId: booking.service.technicianId,
      rating,
      comment,
    },
  });

  return review;
};

export const reviewService = {
  createReviewIntoDb,
};
