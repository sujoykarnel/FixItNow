import { BookingStatus } from "../../../generated/prisma/enums";
import { TechnicianProfileWhereInput } from "../../../generated/prisma/models";

export interface IUpdateTechnicianPayload {
  bio?: string;
  experience?: number;
  location?: string;
  availableStart?: string;
  availableEnd?: string;
}

export interface IUpdateTechnicianBookinPayload {
  status: BookingStatus;
}

export interface ITechnicianQuery extends TechnicianProfileWhereInput {
  searchTerm?: string;
  limit?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;
}