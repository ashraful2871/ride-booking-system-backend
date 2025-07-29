import { Types } from "mongoose";

export enum IsActive {
  Active = "ACTIVE",
  InActive = "IN-ACTIVE",
  Blocked = "BLOCKED",
}
export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  USER = "USER",
  RIDER = "RIDER",
  DRIVER = "DRIVER",
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
  isDeleted?: boolean;
  isActive?: IsActive;
  role: Role;
  auth: IAuthProvider[];
  bookings?: Types.ObjectId[];
}
