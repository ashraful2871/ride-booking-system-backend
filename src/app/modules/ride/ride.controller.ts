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

const viewRideHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const rideHistory = await rideServices.viewRideHistory(userId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "All View Ride History Retrieved Successfully",
      data: rideHistory,
    });
  }
);

const getAllRider = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await rideServices.getAllRider();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "All user Retrieved successfully",
      data: users,
    });
  }
);

export const rideController = {
  createRide,
  cancelRide,
  viewRideHistory,
  getAllRider,
};
