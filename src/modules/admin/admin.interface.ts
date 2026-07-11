import { ActiveStatus } from "../../../generated/prisma/enums";

export interface IUserUpdateAdminPayload {
  status: ActiveStatus;
}
