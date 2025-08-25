"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
// ride.model.ts
const mongoose_1 = require("mongoose");
// Define a location schema
const locationSchema = new mongoose_1.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true },
}, { _id: false });
// Define the ride schema
const rideSchema = new mongoose_1.Schema({
    pickupLocation: { type: locationSchema, required: true },
    destinationLocation: { type: locationSchema, required: true },
});
// Export the model
exports.Location = (0, mongoose_1.model)("Location", rideSchema);
