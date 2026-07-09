import { prisma } from "../../lib/prisma";
import { IUpdateTechnicianPayload } from "./technician.interface";

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
const getTechnicianBookings = async () => {};
const updateTechnicianBookingById = async () => {};

export const technicianService = {
  getAllTechnicians,
  getSingleTechnician,
  updateTechnicianProfile,
  getTechnicianBookings,
  updateTechnicianBookingById,
};
