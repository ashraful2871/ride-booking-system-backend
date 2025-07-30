import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import { IDriver } from "./driver.interface";
import { Driver } from "./driver.mode";

const applyDriver = async (userId: string, payload: Partial<IDriver>) => {
  const existingDrive = await Driver.findOne({ user: userId });
  if (existingDrive) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Already applied or registered as a driver"
    );
  }

  const newDriver = await Driver.create({
    user: userId,
    ...payload,
  });
  return newDriver;
};
export const driverServices = {
  applyDriver,
};
