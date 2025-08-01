import { Types } from "mongoose";

export enum RideStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
  PICKED_UP = "PICKED_UP",
}

export interface IRide {
  _id?: Types.ObjectId;
  rider: Types.ObjectId;
  driver?: Types.ObjectId;
  pickupLocation: {
    lat: number;
    lng: number;
    address?: string;
  };
  destinationLocation: {
    lat: number;
    lng: number;
    address?: string;
  };
  fare?: number;
  status: RideStatus;
  requestedAt?: Date;
  acceptedAt?: Date;
  pickedUpAt?: Date;
  completedAt?: Date;
  canceledAt?: Date;
}
