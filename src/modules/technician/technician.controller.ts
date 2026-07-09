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
      message: "Technicians retrived successfully",
      data: result,
    });
  },
);
const getSingleTechnician = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await technicianService.getSingleTechnician(id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician retrived successfully",
      data: result,
    });
  },
);
const updateTechnicianProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const payload = req.body;

    const result = await technicianService.updateTechnicianProfile(
      payload,
      userId as string,
        );
        
        sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "Profile Update successfully",
          data: result,
        });
  },
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
  getTechnicianBookings,
  updateTechnicianBookingById,
};
