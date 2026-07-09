import { Role } from "../../../generated/prisma/enums";

export interface IRegisterUserPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
}

export interface ILoginPayload {
  email: string;
  password: string;
}
