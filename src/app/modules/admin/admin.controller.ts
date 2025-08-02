/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { adminServices } from "./admin.service";

/////////////////////////////////
const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await adminServices.getAllUsers();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "All user Retrieved successfully",
      data: users,
    });
  }
);

const getAllRides = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rides = await adminServices.getAllRides();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "All Ride Retrieved successfully",
      data: rides,
    });
  }
);
const getAllDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driver = await adminServices.getAllDriver();
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
    const driver = await adminServices.driverApprovedStatus(driverId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Driver Status Approved successfully",
      data: driver,
    });
  }
);
const blockUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const driver = await adminServices.blockUser(userId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User Blocked successfully",
      data: driver,
    });
  }
);

export const adminController = {
  getAllUsers,
  getAllRides,
  getAllDriver,
  driverApprovedStatus,
  blockUser,
};
