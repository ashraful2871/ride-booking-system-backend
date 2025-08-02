"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const mongoose_1 = require("mongoose");
const driver_interface_1 = require("./driver.interface");
const driverSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        enum: Object.values(driver_interface_1.DriverApproveStatus),
        default: driver_interface_1.DriverApproveStatus.Pending,
    },
    totalEarning: { type: Number, default: 0 },
}, { timestamps: true, versionKey: false });
exports.Driver = (0, mongoose_1.model)("Driver", driverSchema);
