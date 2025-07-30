/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import passport from "passport";
import AppError from "../../errorHelper/appError";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { createUserToken } from "../../utils/userToken";
import { setAuthCookie } from "../../utils/setAuthCookie.";

const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      if (err) {
        return next(new AppError(401, err));
      }
      if (!user) {
        return next(new AppError(401, info.message));
      }

      const userToken = createUserToken(user);
      const { password, ...rest } = user.toObject();
      setAuthCookie(res, userToken);

      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User Login Successfully",
        data: {
          accessToken: userToken.accessToken,
          refreshToken: userToken.refreshToken,
          user: rest,
        },
      });
    })(req, res, next);
  }
);

export const autController = {
  credentialLogin,
};
