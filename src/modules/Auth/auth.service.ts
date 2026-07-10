import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginPayload, IRegisterUserPayload } from "./auth.interface";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";

const registerUserIntoDB = async (payload: IRegisterUserPayload) => {
  const transectionResult = await prisma.$transaction(async (tx) => {
    const { name, email, password, phone, role } = payload;

    // const isUserExist = await tx.user.findUnique({
    //   where: { email },
    // });

    const upperCaseRole = role.toUpperCase();
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bycript_salt_rounds),
    );

    const createdUser = await tx.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: upperCaseRole as Role,
      },
    });

    if (createdUser.role === "TECHNICIAN") {
      const technician = await tx.technicianProfile.create({
        data: {
          userId: createdUser.id,
        },
      });
    }

    const user = await tx.user.findUniqueOrThrow({
      where: {
        id: createdUser.id,
        email: createdUser.email || email,
      },

      omit: {
        password: true,
      },
      include: {
        techinicianProfile: true,
      },
    });

    return user;
  });

  return transectionResult;
};

const loginUserIntoDB = async (payload: ILoginPayload) => {
  const { email, password } = payload;

  
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });
  
  console.log(user)
  if (user.status === "BLOCKED") {
    throw new Error("Your account has been blocked. Please contat support");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Password is incorrenct");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getUserProfileFromDB = async (userId: string) => {

  console.log(userId,"Get Profile");
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: { password: true },
    include: { techinicianProfile: true },
  });

  return user
};

export const authServicce = {
  registerUserIntoDB,
  loginUserIntoDB,
  getUserProfileFromDB,
};
