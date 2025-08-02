import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import { IRide, RideStatus } from "./ride.interface";
import { Ride } from "./ride.model";
import { User } from "../user/user.model";
import { Types } from "mongoose";
import { haversineDistanceInKm } from "../../utils/distance";

const BASE_FARE = 1.5;
const PER_KM_RATE = 0.75;

const CANCEL_TIME = 10;

const createRide = async (payload: Partial<IRide>) => {
  const rider = await User.findOne({ _id: payload.rider });

  if (!rider) {
    throw new AppError(StatusCodes.BAD_REQUEST, "rider not found");
  }

  if (
    !payload.pickupLocation ||
    !payload.destinationLocation ||
    typeof payload.pickupLocation.lat !== "number" ||
    typeof payload.pickupLocation.lng !== "number" ||
    typeof payload.destinationLocation.lat !== "number" ||
    typeof payload.destinationLocation.lng !== "number"
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Invalid pickup or destination"
    );
  }

  const distanceKm = haversineDistanceInKm(
    payload.pickupLocation.lat,
    payload.pickupLocation.lng,
    payload.destinationLocation.lat,
    payload.destinationLocation.lng
  );

  const fare = BASE_FARE + distanceKm * PER_KM_RATE;

  const newRide = await Ride.create({ ...payload, fare });

  return newRide;
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

const viewRideHistory = async (userId: string) => {
  const rideHistory = await Ride.find({ rider: new Types.ObjectId(userId) });

  if (!rideHistory) {
    throw new AppError(StatusCodes.NOT_FOUND, "Ride History Not Found");
  }

  return rideHistory;
};

const getAllRider = async () => {
  const allUsers = await User.find({})
    .select("-password")
    .sort({ createdAt: -1 });

  return allUsers;
};

export const rideServices = {
  createRide,
  cancelRide,
  viewRideHistory,
  getAllRider,
};
