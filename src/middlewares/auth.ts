import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: Role;
      };
    }
  }
}

export const auth = (...requiedRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error(
        "You are not logged in. Please log into access this resource",
      );
    }

    const veryfyToken = jwtUtils.veryfyToken(
      token,
      config.jwt_access_secret as string,
    );

    if (!veryfyToken.success) {
      throw new Error(veryfyToken.error);
    }

    const { id, email, name, role } = veryfyToken.data as JwtPayload;

    if (requiedRoles.length && !requiedRoles.includes(role)) {
      throw new Error(
        "Forbidden. You don't have permission to access this resource",
      );
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: { id, email, name, role },
    });

    if (!user) {
      throw new Error("User not found. Please log in again");
    }

    if (user.status === "BLOCKED") {
      throw new Error("Your account has been blocked. Please contact support");
    }

    req.user = {
      id,
      name,
      email,
      role,
    };

    next();
  });
};
