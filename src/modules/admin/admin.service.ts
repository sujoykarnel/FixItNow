import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
  const users = prisma.user.findMany({
    omit: {
      password: true,
    },
  });

  return users;
};

export const adminService = {
  getAllUsersFromDB,
};
