import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import { DriverApproveStatus, IDriver } from "./driver.interface";
import { Driver } from "./driver.mode";
import { Types } from "mongoose";
import { Ride } from "../ride/ride.model";
import { RideStatus } from "../ride/ride.interface";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";

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

const acceptRideByDrier = async (rideId: string, driverId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(StatusCodes.NOT_FOUND, "ride not found");
  }
  if (ride.status !== RideStatus.PENDING) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Ride is not available to accept"
    );
  }

  if (ride.driver) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Ride is already taken by another driver"
    );
  }

  ride.driver = new Types.ObjectId(driverId);
  ride.status = RideStatus.ACCEPTED;
  ride.acceptedAt = new Date();
  await ride.save();

  return ride;
};

const setOnlineStatus = async (driverUserId: string, IsOnline: boolean) => {
  const driver = await Driver.findOne({
    user: new Types.ObjectId(driverUserId),
  });
  if (!driver) {
    throw new AppError(StatusCodes.NOT_FOUND, "Driver Not Found");
  }

  if (driver.approvedStatus !== DriverApproveStatus.Approved) {
    throw new AppError(StatusCodes.NOT_FOUND, "Driver Is Not Approved");
  }

  driver.isOnline = IsOnline;
  await driver.save();
  return driver;
};

const rejectRide = async (rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(StatusCodes.NOT_FOUND, "ride not found");
  }

  if (ride.status !== RideStatus.PENDING) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Pending Eide Only can rejected"
    );
  }
  ride.status = RideStatus.REJECTED;
  await ride.save();

  return ride;
};

const updateRideStatus = async (
  rideId: string,
  driverUserId: string,
  status: string
) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(StatusCodes.NOT_FOUND, "ride not found");
  }

  if (!ride.driver || ride.driver.toString() !== driverUserId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Your Are not Permitted To update this Status"
    );
  }
  const allowedTransitions: Record<string, string[]> = {
    [RideStatus.ACCEPTED]: [RideStatus.PICKED_UP],
    [RideStatus.PICKED_UP]: [RideStatus.IN_PROGRESS],
    [RideStatus.IN_PROGRESS]: [RideStatus.COMPLETED],
  };
  if (
    !(ride.status in allowedTransitions) ||
    !allowedTransitions[ride.status].includes(status)
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Can't transit from ${ride.status} to ${status}`
    );
  }

  ride.status = status as RideStatus;
  if (status === RideStatus.PICKED_UP) {
    ride.pickedUpAt = new Date();
  }
  if (ride.status === RideStatus.COMPLETED) {
    ride.completedAt = new Date();

    if (ride.driver) {
      await Driver.findOneAndUpdate(
        { user: new Types.ObjectId(driverUserId) },
        {
          $inc: { totalEarning: ride.fare || 0 },
          $set: { currentRideId: null },
        }
      );
    }
  }
  await ride.save();
  return ride;
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

const getAllDriver = async () => {
  const allRides = await Driver.find({}).sort({ createdAt: -1 });

  return allRides;
};

const driverApprovedStatus = async (driverId: string) => {
  const driver = await Driver.findById(driverId);
  const user = await User.findById(driver?.user);
  if (!driver) {
    throw new AppError(StatusCodes.NOT_FOUND, "Driver Not Found");
  }
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
  }
  if (driver.approvedStatus === DriverApproveStatus.Approved) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Driver Already Approved");
  }

  driver.approvedStatus = DriverApproveStatus.Approved;
  user.role = Role.DRIVER;

  await driver.save();
  await user.save();
  return driver;
};

export const driverServices = {
  applyDriver,
  viewEarningsHistory,
  acceptRideByDrier,
  setOnlineStatus,
  rejectRide,
  updateRideStatus,
  getAllDriver,
  driverApprovedStatus,
};
