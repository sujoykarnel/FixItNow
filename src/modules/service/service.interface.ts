import { ServiceWhereInput } from "../../../generated/prisma/models";

export interface IServicePayload {
  categoryId: string;
  title: string;
  discription: string;
  price: number;
}

export interface IServiceQuery extends ServiceWhereInput {
  searchTerm?: string;
  type?: string;
  location?: string;
  rating?: number;
  limit?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;
}
