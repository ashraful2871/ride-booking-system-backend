import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import { IRide, RideStatus } from "./ride.interface";
import { Ride } from "./ride.model";
import { User } from "../user/user.model";
import { Types } from "mongoose";

const CANCEL_TIME = 10;

const createRide = async (payload: Partial<IRide>) => {
  const rider = await User.findOne({ _id: payload.rider });

  if (!rider) {
    throw new AppError(StatusCodes.BAD_REQUEST, "rider not found");
  }
  const newRide = await Ride.create(payload);

  return newRide;
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

const cancelRide = async (rideId: string, riderId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new AppError(StatusCodes.NOT_FOUND, "ride not found");
  }
  if (ride.rider.toString() !== riderId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Not authorized to cancel this ride"
    );
  }

  if (
    !(ride.status === RideStatus.PENDING || ride.status === RideStatus.ACCEPTED)
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Ride cannot be cancelled at this stage"
    );
  }

  const now = new Date();
  const requestedAt = ride.requestedAt;
  if (!requestedAt) {
    throw new AppError(StatusCodes.NOT_FOUND, "Requested Date Not Found");
  }
  const differentInMinutes =
    (now.getTime() - requestedAt?.getTime()) / 1000 / 60;

  if (differentInMinutes > CANCEL_TIME) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Cancellation window has expired"
    );
  }
  ride.status = RideStatus.CANCELLED;
  ride.canceledAt = now;
  await ride.save();

  return ride;
};

export const rideServices = {
  createRide,
  acceptRideByDrier,
  cancelRide,
};
