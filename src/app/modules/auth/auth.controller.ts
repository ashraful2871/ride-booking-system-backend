/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import passport from "passport";
import AppError from "../../errorHelper/appError";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      if (err) {
        return next(new AppError(401, err));
      }
      if (!user) {
        return next(new AppError(401, info.message));
      }

      const { password, ...rest } = user.toObject();

      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User Login Successfully",
        data: rest,
      });
    })(req, res, next);
  }
);

export const autController = {
  credentialLogin,
};
