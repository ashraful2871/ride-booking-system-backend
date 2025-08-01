import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import { IDriver } from "./driver.interface";
import { Driver } from "./driver.mode";
import { Types } from "mongoose";
import { Ride } from "../ride/ride.model";
import { RideStatus } from "../ride/ride.interface";

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

const viewEarningsHistory = async (driverUserId: string) => {
  const existingDrive = await Driver.findOne({
    user: new Types.ObjectId(driverUserId),
  });
  if (!existingDrive) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Driver Not Found");
  }

  const rides = await Ride.find({
    driver: new Types.ObjectId(driverUserId),
    status: RideStatus.COMPLETED,
  });
  console.log(rides);

  const totalEarningFromRides = rides.reduce(
    (sum, r) => sum + (r.fare || 0),
    0
  );

  return {
    totalEarningStored: existingDrive.totalEarning,
    totalEarningsCalculated: totalEarningFromRides,
    rides,
  };
};

export const driverServices = {
  applyDriver,
  viewEarningsHistory,
};
