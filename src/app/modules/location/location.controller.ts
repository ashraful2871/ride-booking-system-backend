/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { locationService } from "./location.service";

const createLocation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const location = await locationService.createLocation(payload);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "location Created Successfully",
      data: location,
    });
  }
);
const allLocation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const location = await locationService.allLocation();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "location get Successfully",
      data: location,
    });
  }
);

export const locationController = {
  createLocation,
  allLocation,
};
