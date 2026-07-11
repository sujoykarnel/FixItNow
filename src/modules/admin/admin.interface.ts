import { ActiveStatus } from "../../../generated/prisma/enums";

export interface IUserUpdateAdminPayload {
  status: ActiveStatus;
}

export interface ICategoryPayload {
  name: string;
  discription: string;
}

