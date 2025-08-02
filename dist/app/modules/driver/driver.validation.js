"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyDriverZodSchema = exports.DriverApproveStatusEnum = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = __importDefault(require("zod"));
exports.DriverApproveStatusEnum = zod_1.default.enum([
    "PENDING",
    "APPROVED",
    "REJECTED",
]);
const objectIdString = zod_1.default
    .string()
    .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
})
    .optional();
exports.applyDriverZodSchema = zod_1.default.object({
    user: objectIdString,
    vehicleNumber: zod_1.default.string().min(1, "Vehicle number is required"),
    vehicleType: zod_1.default.string().min(1, "Vehicle type is required"),
    licenseNumber: zod_1.default.string().min(1, "License number is required"),
    nationalId: zod_1.default.string().min(1, "National ID is required"),
    profileImage: zod_1.default.string().url().optional(),
    vehicleImage: zod_1.default.string().url().optional(),
    isOnline: zod_1.default.boolean().optional(),
    approvedStatus: exports.DriverApproveStatusEnum.optional(),
    totalEarning: zod_1.default.number().nonnegative().optional(),
    currentRideId: zod_1.default.string().nullable().optional(),
});
