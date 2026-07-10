import { BookingStatus } from "../../../generated/prisma/enums";

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
