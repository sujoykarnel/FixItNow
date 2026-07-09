import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { technicianService } from "./technician.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllTechnicians = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await technicianService.getAllTechnicians();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician retrived successfully",
      data: result,
    });
  },
);
const getSingleTechnician = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const updateTechnicianProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const updateTechnicianAvailability = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getTechnicianBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const updateTechnicianBookingById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const technicianController = {
  getAllTechnicians,
  getSingleTechnician,
  updateTechnicianProfile,
  updateTechnicianAvailability,
  getTechnicianBookings,
  updateTechnicianBookingById,
};
