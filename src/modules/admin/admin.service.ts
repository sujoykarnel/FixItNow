import { ActiveStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IUserUpdateAdminPayload } from "./admin.interface";

const getAllUsersFromDB = async () => {
  const users = prisma.user.findMany({
    omit: {
      password: true,
    },
  });

  return users;
};

const getSingleUserFromDB = async (userId: string) => {
  const user = prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: { password: true },
  });

  return user;
};

const updateUserStatusIntoDB = async (
  payload: IUserUpdateAdminPayload,
  userId: string,
) => {
  const { status } = payload;

  const upperCaseStatus = status.toUpperCase();
  const user = prisma.user.update({
    where: { id: userId },
    data: {
      status: upperCaseStatus as ActiveStatus,
    },
    omit: { password: true },
  });

  return user;
};

const getAllBookingsFromDB = async () => {
  const bookings = prisma.booking.findMany({
    orderBy: {
      createdAt: "desc",
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

export const adminService = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserStatusIntoDB,
  getAllBookingsFromDB,
};
