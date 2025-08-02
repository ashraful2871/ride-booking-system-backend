import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import { Driver } from "../driver/driver.mode";
import { Ride } from "../ride/ride.model";
import { User } from "../user/user.model";
import { DriverApproveStatus } from "../driver/driver.interface";
import { Role } from "../user/user.interface";

const getAllUsers = async () => {
  const allUsers = await User.find({})
    .select("-password")
    .sort({ createdAt: -1 });

  return allUsers;
};

const getAllRides = async () => {
  const allRides = await Ride.find({}).sort({ createdAt: -1 });

  return allRides;
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
const blockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "Driver Not Found");
  }
  if (user.isDeleted) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User Already Blocked");
  }

  user.isDeleted = true;
  await user.save();
  return user;
};

export const adminServices = {
  getAllUsers,
  getAllRides,
  getAllDriver,
  driverApprovedStatus,
  blockUser,
};
