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

export const driverController = {
  applyDriver,
};
