/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

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
const updateUserProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req?.user as JwtPayload)?.userId;
    const user = await userServices.updateUserProfile(
      req.body,
      userId as string
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Profile Updated Successfully",
      data: user,
    });
  }
);
const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await userServices.getMe(decodedToken.userId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Your profile Retrieved Successfully",
      data: result,
    });
  }
);

export const userController = {
  createUser,
  updateUserProfile,
  getMe,
};
