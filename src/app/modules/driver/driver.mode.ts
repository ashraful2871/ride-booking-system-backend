import { model, Schema } from "mongoose";
import { DriverApproveStatus, IDriver } from "./driver.interface";

const driverSchema = new Schema<IDriver>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    vehicleNumber: { type: String, required: true },
    vehicleType: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    nationalId: { type: String, required: true },
    vehicleImage: { type: String },
    profileImage: { type: String },
    isOnline: { type: Boolean, default: false },
    approvedStatus: {
      type: String,
      enum: Object.values(DriverApproveStatus),
      default: DriverApproveStatus.Pending,
    },
    totalEarning: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

export const Driver = model<IDriver>("Driver", driverSchema);
