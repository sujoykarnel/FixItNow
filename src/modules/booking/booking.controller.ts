import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createBooking = catchAsync(
    async(req: Request, res: Response, next: NextFunction)=>{}
);
const getAllBookings = catchAsync(
    async(req: Request, res: Response, next: NextFunction)=>{}
);
const getBooingById = catchAsync(
    async(req: Request, res: Response, next: NextFunction)=>{}
);


export const bookingController = {
  createBooking,
  getAllBookings,
  getBooingById,
};