import { ServiceWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IServicePayload, IServiceQuery } from "./service.interface";

const createServiceIntoDB = async (
  payload: IServicePayload,
  userId: string,
) => {
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

const getAllServicesFromDB = async (query: IServiceQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";

  const andConditions: ServiceWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          discription: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          technicianProfile: {
            location: {
              contains: query.searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  if (query.title) {
    andConditions.push({
      title: query.title,
    });
  }

  if (query.discription) {
    andConditions.push({
      discription: query.discription,
    });
  }

  if (query.type) {
    andConditions.push({
      category: {
        name: query.type,
      },
    });
  }

  if (query.location) {
    andConditions.push({
      technicianProfile: {
        location: query.location,
      },
    });
  }

  if (query.rating) {
    andConditions.push({
      technicianProfile: {
        avgRating: Number(query.rating),
      },
    });
  }

  if (query.price) {
    andConditions.push({
      price: {
        lte: Number(query.price),
      },
    });
  }

  const services = await prisma.service.findMany({
    where: {
      AND: andConditions,
    },

    take: limit,
    skip: skip,

    orderBy: {
      [sortBy]: sortOrder,
    },

    include: {
      category: true,
      technicianProfile: true,
    },
  });

  const totalServiceCount = await prisma.service.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: services,
    meta: {
      page,
      limit,
      total: totalServiceCount,
      totalPage: Math.ceil(totalServiceCount / limit),
    },
  };
};

export const serviceService = {
  createServiceIntoDB,
  getAllServicesFromDB,
};
