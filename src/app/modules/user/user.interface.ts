import { Types } from "mongoose";

export enum IsActive {
  Active = "ACTIVE",
  InActive = "IN-ACTIVE",
  Blocked = "BLOCKED",
}
export enum Role {
  RIDER = "RIDER",
  DRIVER = "DRIVER",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface IAuthProvider {
  provider: "credentials" | "google";
  providerId: string;
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  isDeleted?: boolean;
  isActive?: IsActive;
  role: Role;
  auth: IAuthProvider[];
  bookings?: Types.ObjectId[];
}
