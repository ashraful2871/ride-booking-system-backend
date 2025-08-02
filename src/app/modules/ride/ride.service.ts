import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelper/appError";
import { IRide, RideStatus } from "./ride.interface";
import { Ride } from "./ride.model";
import { User } from "../user/user.model";
import { Types } from "mongoose";
import { Driver } from "../driver/driver.mode";
import { DriverApproveStatus } from "../driver/driver.interface";
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

export const rideServices = {
  createRide,
  acceptRideByDrier,
  cancelRide,
  rejectRide,
  updateRideStatus,
  setOnlineStatus,
};
