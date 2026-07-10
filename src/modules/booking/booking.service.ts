import { prisma } from "../../lib/prisma";
import { IBookingPayload } from "./booking.interface";

const createBookingIntoDB = async (
  payload: IBookingPayload,
  customerId: string,
) => {
  const { serviceId } = payload;

  const service = await prisma.service.findUniqueOrThrow({
    where: {
      id: serviceId,
    },
  });

  const booking = await prisma.booking.create({
    data: {
      customerId,
      serviceId,
      amount: service.price,
    },
    include: {
      service: {
        include: {
          technicianProfile: true,
        },
      },
    },
  });

  return booking;
};

const getUserBooingsFromDB = async (customerId: string) => {
  const bookings = await prisma.booking.findMany({
    where: {
      customerId,
    },
    include: {
      service: {
        include: {
          technicianProfile: true,
        },
      },
    },
  });

  return bookings;
};


const getBookingById = async (bookingId: string, customerId: string) => {

    const booking = prisma.booking.findUniqueOrThrow({
        where: {
            id: bookingId,
            customerId
        },
        include: {
            service: {
                include: {
                    technicianProfile: {
                        include: {
                            user: {
                                omit: {
                                    password: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return booking
};

export const bookingService = {
  createBookingIntoDB,
  getUserBooingsFromDB,
  getBookingById,
};
