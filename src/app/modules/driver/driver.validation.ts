import { Types } from "mongoose";
import z from "zod";

export const DriverApproveStatusEnum = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

const objectIdString = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  })
  .optional();

export const applyDriverZodSchema = z.object({
  user: objectIdString,
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  nationalId: z.string().min(1, "National ID is required"),
  profileImage: z.string().url().optional(),
  vehicleImage: z.string().url().optional(),
  isOnline: z.boolean().optional(),
  approvedStatus: DriverApproveStatusEnum.optional(),
  totalEarning: z.number().nonnegative().optional(),
  currentRideId: z.string().nullable().optional(),
});
