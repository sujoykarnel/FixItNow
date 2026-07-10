import { prisma } from "../../lib/prisma";
import { ICategoryPayload } from "./category.interface";

const createCategoryIntoDB = async (payload: ICategoryPayload) => {
  const { name, discription } = payload;

  const category = await prisma.category.create({
    data: { name, discription },
  });

  return category;
};

const getAllCategoriesFromDB = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      services: true,
    },
  });

  return categories;
};

export const categoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
