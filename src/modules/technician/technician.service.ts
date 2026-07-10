import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import {
  IUpdateTechnicianBookinPayload,
  IUpdateTechnicianPayload,
} from "./technician.interface";

const getAllTechnicians = async () => {
  const technicians = prisma.technicianProfile.findMany({
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
    orderBy: {
      user: {
        name: "asc",
      },
    },
  });

  return technicians;
};
const getSingleTechnician = async (id: string) => {
  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: { id },
    include: {
      user: {
        omit: {
          password: false,
        },
      },
      reviews: true,
    },
  });

  return technician;
};
const updateTechnicianProfile = async (
  payload: IUpdateTechnicianPayload,
  userId: string,
) => {
  const { bio, experience, location, availableStart, availableEnd } = payload;
  const updateProfile = await prisma.technicianProfile.update({
    where: { userId },
    data: {
      bio,
      experience,
      location,
      availableStart,
      availableEnd,
    },
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
  });

  return updateProfile;
};
const getTechnicianBookings = async (userId: string) => {
  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: { userId },
  });

  const bookings = await prisma.booking.findMany({
    where: {
      service: {
        technicianId: technician.id,
      },
    },
    include: {
      service: true,
      customer: {
        omit: {
          password: true,
        },
      },
    },
  });
  console.log(bookings, "Teechnician Service");

  return bookings;
};

const updateTechnicianBookingById = async (
  payload: IUpdateTechnicianBookinPayload,
  userId: string,
  bookingId: string,
) => {

    const transectionResult = await prisma.$transaction(async (tx) => {
        const { status } = payload;
        const upperCaseStatus = status.toUpperCase();
        const technician = await tx.technicianProfile.findUniqueOrThrow({
          where: { userId },
        });

        const updatedBooking = await tx.booking.update({
          where: {
            id: bookingId,
            service: {
              technicianId: technician.id,
            },
          },
          data: {
            status: upperCaseStatus as BookingStatus,
          },
        });


        await tx.payment.create({})

        return updatedBooking;
    })
    return transectionResult
};

export const technicianService = {
  getAllTechnicians,
  getSingleTechnician,
  updateTechnicianProfile,
  getTechnicianBookings,
  updateTechnicianBookingById,
};
