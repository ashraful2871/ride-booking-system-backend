import { model, Schema } from "mongoose";
import { IRide, RideStatus } from "./ride.interface";

const locationSchema = new Schema(
  {
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
    address: { type: String },
  },
  { _id: false }
);

const rideSchema = new Schema<IRide>(
  {
    rider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: Schema.Types.ObjectId, ref: "Driver", default: null },
    pickupLocation: locationSchema,
    destinationLocation: locationSchema,
    status: {
      type: String,
      enum: Object.values(RideStatus),
      default: RideStatus.PENDING,
    },
    fare: { type: Number },
    requestedAt: { type: Date, default: Date.now },
    acceptedAt: { type: Date },
    pickedUpAt: { type: Date },
    completedAt: { type: Date },
    canceledAt: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

export const Ride = model<IRide>("Ride", rideSchema);
