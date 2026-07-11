import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllUsersFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrived successfully",
      data: result,
    });
  },
);

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const result = await adminService.getSingleUserFromDB(userId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrived successfully",
      data: result,
    });
  },
);

export const adminController = {
  getAllUsers,
  getSingleUser,
};
