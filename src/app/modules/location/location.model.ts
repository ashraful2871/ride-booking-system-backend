// ride.model.ts
import { Schema, model } from "mongoose";

// Define a location schema
const locationSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { _id: false }
);

// Define the ride schema
const rideSchema = new Schema({
  pickupLocation: { type: locationSchema, required: true },
  destinationLocation: { type: locationSchema, required: true },
});

// Export the model
export const Location = model("Location", rideSchema);
