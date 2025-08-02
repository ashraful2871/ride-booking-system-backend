"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const ride_interface_1 = require("./ride.interface");
const locationSchema = new mongoose_1.Schema({
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
    address: { type: String },
}, { _id: false });
const rideSchema = new mongoose_1.Schema({
    rider: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: mongoose_1.Schema.Types.ObjectId, ref: "Driver", default: null },
    pickupLocation: locationSchema,
    destinationLocation: locationSchema,
    status: {
        type: String,
        enum: Object.values(ride_interface_1.RideStatus),
        default: ride_interface_1.RideStatus.PENDING,
    },
    fare: { type: Number },
    requestedAt: { type: Date, default: Date.now },
    acceptedAt: { type: Date },
    pickedUpAt: { type: Date },
    completedAt: { type: Date },
    canceledAt: { type: Date },
}, { timestamps: true, versionKey: false });
exports.Ride = (0, mongoose_1.model)("Ride", rideSchema);
