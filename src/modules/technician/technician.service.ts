import { BookingStatus } from "../../../generated/prisma/enums";
import { TechnicianProfileWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import {
  ITechnicianQuery,
  IUpdateTechnicianBookinPayload,
  IUpdateTechnicianPayload,
} from "./technician.interface";

const getAllTechnicians = async (query: ITechnicianQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? Number(query.sortBy) : "createdAt";
  const sortOrder = query.sortOrder ? Number(query.sortOrder) : "desc";

  const andConditions: TechnicianProfileWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          service: {
            some: {
              title: {
                contains: query.searchTerm,
                mode: "insensitive",
              },
            },
          },
        },
        {
          service: {
            some: {
              discription: {
                contains: query.searchTerm,
                mode: "insensitive",
              },
            },
          },
        },
        {
          location: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (query.location) {
    andConditions.push({
      location: query.location,
    });
  }

  if (query.avgRating) {
    andConditions.push({
      avgRating: Number(query.avgRating),
    });
  }
  if (query.avgRating) {
    andConditions.push({
      avgRating: Number(query.avgRating),
    });
  }
  if (query.avgRating) {
    andConditions.push({
      avgRating: Number(query.avgRating),
    });
  }
  if (query.experience) {
    andConditions.push({
      experience: {
        gte: Number(query.experience),
      },
    });
  }

  const technicians = prisma.technicianProfile.findMany({
    where: {
      AND: andConditions,
    },

    take: limit,
    skip: skip,

    orderBy: {
      [sortBy]: sortOrder,
    },

    include: {
      user: {
        omit: {
          password: true,
        },
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
    const upperCaseStatus = status.toUpperCase() as BookingStatus;
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
        status: upperCaseStatus,
      },
    });

    return updatedBooking;
  });
  return transectionResult;
};

export const technicianService = {
  getAllTechnicians,
  getSingleTechnician,
  updateTechnicianProfile,
  getTechnicianBookings,
  updateTechnicianBookingById,
};
