import { prisma } from "../../lib/prisma";
import { IServicePayload } from "./service.interface";

const createServiceIntoDB = async (
  payload: IServicePayload,
  userId: string,
) => {
  const { categoryId, title, discription, price } = payload;

  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  const technicianId = technician?.id as string;
  console.log(technicianId);

  const service = await prisma.service.create({
    data: { ...payload, technicianId },
  });

  return service;
};

const getAllServicesFromDB = async () => {
  const services = await prisma.service.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      category: true,
    },
  });
    
  return services
};

export const serviceService = {
  createServiceIntoDB,
  getAllServicesFromDB,
};
