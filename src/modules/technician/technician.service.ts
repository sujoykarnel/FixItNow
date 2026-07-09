import { prisma } from "../../lib/prisma";

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
    
    return technicians
};
const getSingleTechnician = async () => {};
const updateTechnicianProfile = async () => {};
const updateTechnicianAvailability = async () => {};
const getTechnicianBookings = async () => {};
const updateTechnicianBookingById = async () => {};

export const technicianService = {
  getAllTechnicians,
  getSingleTechnician,
  updateTechnicianProfile,
  updateTechnicianAvailability,
  getTechnicianBookings,
  updateTechnicianBookingById,
};
