"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errorHelper/appError"));
const ride_interface_1 = require("./ride.interface");
const ride_model_1 = require("./ride.model");
const user_model_1 = require("../user/user.model");
const mongoose_1 = require("mongoose");
const distance_1 = require("../../utils/distance");
const BASE_FARE = 1.5;
const PER_KM_RATE = 0.75;
const CANCEL_TIME = 10;
const createRide = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const rider = yield user_model_1.User.findOne({ _id: payload.rider });
    if (!rider) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "rider not found");
    }
    if (!payload.pickupLocation ||
        !payload.destinationLocation ||
        typeof payload.pickupLocation.lat !== "number" ||
        typeof payload.pickupLocation.lng !== "number" ||
        typeof payload.destinationLocation.lat !== "number" ||
        typeof payload.destinationLocation.lng !== "number") {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid pickup or destination");
    }
    const distanceKm = (0, distance_1.haversineDistanceInKm)(payload.pickupLocation.lat, payload.pickupLocation.lng, payload.destinationLocation.lat, payload.destinationLocation.lng);
    const fare = BASE_FARE + distanceKm * PER_KM_RATE;
    const newRide = yield ride_model_1.Ride.create(Object.assign(Object.assign({}, payload), { fare }));
    return newRide;
});
const cancelRide = (rideId, riderId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "ride not found");
    }
    if (ride.rider.toString() !== riderId) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Not authorized to cancel this ride");
    }
    if (!(ride.status === ride_interface_1.RideStatus.PENDING || ride.status === ride_interface_1.RideStatus.ACCEPTED)) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Ride cannot be cancelled at this stage");
    }
    const now = new Date();
    const requestedAt = ride.requestedAt;
    if (!requestedAt) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Requested Date Not Found");
    }
    const differentInMinutes = (now.getTime() - (requestedAt === null || requestedAt === void 0 ? void 0 : requestedAt.getTime())) / 1000 / 60;
    if (differentInMinutes > CANCEL_TIME) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Cancellation window has expired");
    }
    ride.status = ride_interface_1.RideStatus.CANCELLED;
    ride.canceledAt = now;
    yield ride.save();
    return ride;
});
const viewRideHistory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const rideHistory = yield ride_model_1.Ride.find({ rider: new mongoose_1.Types.ObjectId(userId) });
    if (!rideHistory) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Ride History Not Found");
    }
    return rideHistory;
});
const getAllRider = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_model_1.User.find({})
        .select("-password")
        .sort({ createdAt: -1 });
    return allUsers;
});
const getAllRides = () => __awaiter(void 0, void 0, void 0, function* () {
    const allRides = yield ride_model_1.Ride.find({}).sort({ createdAt: -1 });
    return allRides;
});
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Driver Not Found");
    }
    if (user.isDeleted) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User Already Blocked");
    }
    user.isDeleted = true;
    yield user.save();
    return user;
});
exports.rideServices = {
    createRide,
    cancelRide,
    viewRideHistory,
    getAllRider,
    blockUser,
    getAllRides,
};
