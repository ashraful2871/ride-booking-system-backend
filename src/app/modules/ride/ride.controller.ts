/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { rideServices } from "./ride.service";
import { sendResponse } from "../../utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const createRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const ride = await rideServices.createRide(payload);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "ride Created Successfully",
      data: ride,
    });
  }
);

const acceptRideByDrier = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rideId } = req.params;
    const { userId: driverId } = req.user as JwtPayload;
    const ride = await rideServices.acceptRideByDrier(rideId, driverId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Ride Accepted Successfully",
      data: ride,
    });
  }
);

const cancelRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rideId } = req.params;
    const { userId: riderId } = req.user as JwtPayload;
    const ride = await rideServices.cancelRide(rideId, riderId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Ride Cancel Successfully",
      data: ride,
    });
  }
);
const rejectRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rideId } = req.params;
    const { userId: driverUserId } = req.user as JwtPayload;
    const ride = await rideServices.rejectRide(rideId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Ride Rejected Successfully",
      data: ride,
    });
  }
);

export const rideController = {
  createRide,
  acceptRideByDrier,
  cancelRide,
  rejectRide,
};
