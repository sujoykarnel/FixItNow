import { prisma } from "../../lib/prisma";
import { IReviewPayload } from "./review.interface";

const createReviewIntoDb = async (
  payload: IReviewPayload,
  bookingId: string,
  customerId: string,
) => {
  const transectionResult = prisma.$transaction(async (tx) => {
    const { rating, comment } = payload;
    const booking = await tx.booking.findUniqueOrThrow({
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

    const review = await tx.review.create({
      data: {
        customerId,
        bookingId,
        technicianId: booking.service.technicianId,
        rating,
        comment,
      },
    });

    // avg rating

    const avgRating = await tx.review.aggregate({
      where: {
        technicianId: booking.service.technicianId,
      },
      _avg: {
        rating: true,
      },
    });

    await tx.technicianProfile.update({
      where: {
        id: booking.service.technicianId,
      },
      data: {
        avgRating: avgRating._avg.rating ?? 0,
      },
    });

    return review;
  });
  return transectionResult;
};

export const reviewService = {
  createReviewIntoDb,
};
