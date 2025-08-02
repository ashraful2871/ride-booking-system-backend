/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { driverServices } from "./driver.service";
import { JwtPayload } from "jsonwebtoken";

const applyDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const payload = req.body;
    const newDriver = await driverServices.applyDriver(userId, payload);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Driver application Successfully",
      data: newDriver,
    });
  }
);

const acceptRideByDrier = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rideId } = req.params;
    const { userId: driverId } = req.user as JwtPayload;
    const ride = await driverServices.acceptRideByDrier(rideId, driverId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Ride Accepted Successfully",
      data: ride,
    });
  }
);

const setOnlineStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { IsOnline } = req.body;
    const { userId: driverUserId } = req.user as JwtPayload;
    const driver = await driverServices.setOnlineStatus(driverUserId, IsOnline);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Availability updated",
      data: driver,
    });
  }
);

const rejectRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rideId } = req.params;
    const ride = await driverServices.rejectRide(rideId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Ride Rejected Successfully",
      data: ride,
    });
  }
);

const updateRideStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rideId } = req.params;
    const { status } = req.body;
    const { userId: driverUserId } = req.user as JwtPayload;
    const ride = await driverServices.updateRideStatus(
      rideId,
      driverUserId,
      status
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Ride Status Update Successfully",
      data: ride,
    });
  }
);

const viewEarningsHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId: driverUserId } = req.user as JwtPayload;
    const earnings = await driverServices.viewEarningsHistory(driverUserId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Earnings history retrieved Successfully",
      data: earnings,
    });
  }
);

const getAllDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driver = await driverServices.getAllDriver();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "All Driver Retrieved successfully",
      data: driver,
    });
  }
);

const driverApprovedStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { driverId } = req.params;
    const driver = await driverServices.driverApprovedStatus(driverId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Driver Status Approved successfully",
      data: driver,
    });
  }
);

export const driverController = {
  applyDriver,
  viewEarningsHistory,
  acceptRideByDrier,
  setOnlineStatus,
  updateRideStatus,
  rejectRide,
  getAllDriver,
  driverApprovedStatus,
};
