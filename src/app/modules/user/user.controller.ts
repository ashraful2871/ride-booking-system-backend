/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";
import { NextFunction, Request, Response } from "express";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  }
);

export const userController = {
  createUser,
};
