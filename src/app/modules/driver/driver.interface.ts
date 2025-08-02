import { Types } from "mongoose";

export enum DriverApproveStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Suspended = "SUSPENDED",
}

export enum DriverAvailability {
  AVAILABLE = "AVAILABLE",
}

export interface IDriver {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  vehicleNumber: string;
  vehicleType: string;
  licenseNumber: string;
  nationalId: string;
  profileImage?: string;
  vehicleImage?: string;
  isOnline?: boolean;
  approvedStatus?: DriverApproveStatus;
  totalEarning?: number;
  currentRideId?: string | null;
}
