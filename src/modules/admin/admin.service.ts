import { prisma } from "../../lib/prisma";

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

export const adminService = {
  getAllUsersFromDB,
  getSingleUserFromDB,
};
