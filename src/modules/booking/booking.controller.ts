import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id;
    const payload = req.body;

    const result = await bookingService.createBookingIntoDB(
      payload,
      customerId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Service booking successfully",
      data: result,
    });
  },
);
const getUserBooings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id;

    const result = await bookingService.getUserBooingsFromDB(
      customerId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrived successfully",
      data: result,
    });
  },
);
const getBooingById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const customerId = req.user?.id
        const bookingId = req.params.id

        const result = await bookingService.getBookingById(bookingId as string, customerId as string)

        sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "Booking retrived successfully",
          data: result,
        });
  },
);

export const bookingController = {
  createBooking,
  getUserBooings,
  getBooingById,
};
