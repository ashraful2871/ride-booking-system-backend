/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/appError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { StatusCodes } from "http-status-codes";
import { IsActive } from "../modules/user/user.interface";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization || req?.cookies?.access;
      if (!accessToken) {
        throw new AppError(403, "No token Received");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken.email });
      if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "user Dose not Exist");
      }

      if (isUserExist.isActive === IsActive.InActive) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `user is ${isUserExist.isActive}`
        );
      }

      if (isUserExist.isDeleted) {
        throw new AppError(StatusCodes.BAD_REQUEST, "user is deleted");
      }
      //   if (!isUserExist) {
      //     throw new AppError(StatusCodes.BAD_REQUEST, "user is deleted");
      //   }
      console.log(verifiedToken);
      if (!authRoles.includes(verifiedToken.role)) {
        console.log("in if block", verifiedToken);
        throw new AppError(405, "you are not permitted view this route");
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
