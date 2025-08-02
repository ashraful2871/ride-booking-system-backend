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
exports.driverServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errorHelper/appError"));
const driver_interface_1 = require("./driver.interface");
const driver_mode_1 = require("./driver.mode");
const mongoose_1 = require("mongoose");
const ride_model_1 = require("../ride/ride.model");
const ride_interface_1 = require("../ride/ride.interface");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const applyDriver = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDrive = yield driver_mode_1.Driver.findOne({ user: userId });
    if (existingDrive) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Already applied or registered as a driver");
    }
    const newDriver = yield driver_mode_1.Driver.create(Object.assign({ user: userId }, payload));
    return newDriver;
});
const acceptRideByDrier = (rideId, driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "ride not found");
    }
    if (ride.status !== ride_interface_1.RideStatus.PENDING) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Ride is not available to accept");
    }
    if (ride.driver) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Ride is already taken by another driver");
    }
    ride.driver = new mongoose_1.Types.ObjectId(driverId);
    ride.status = ride_interface_1.RideStatus.ACCEPTED;
    ride.acceptedAt = new Date();
    yield ride.save();
    return ride;
});
const setOnlineStatus = (driverUserId, IsOnline) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_mode_1.Driver.findOne({
        user: new mongoose_1.Types.ObjectId(driverUserId),
    });
    if (!driver) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Driver Not Found");
    }
    if (driver.approvedStatus !== driver_interface_1.DriverApproveStatus.Approved) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Driver Is Not Approved");
    }
    driver.isOnline = IsOnline;
    yield driver.save();
    return driver;
});
const rejectRide = (rideId) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "ride not found");
    }
    if (ride.status !== ride_interface_1.RideStatus.PENDING) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Pending Eide Only can rejected");
    }
    ride.status = ride_interface_1.RideStatus.REJECTED;
    yield ride.save();
    return ride;
});
const updateRideStatus = (rideId, driverUserId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "ride not found");
    }
    if (!ride.driver || ride.driver.toString() !== driverUserId) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Your Are not Permitted To update this Status");
    }
    const allowedTransitions = {
        [ride_interface_1.RideStatus.ACCEPTED]: [ride_interface_1.RideStatus.PICKED_UP],
        [ride_interface_1.RideStatus.PICKED_UP]: [ride_interface_1.RideStatus.IN_PROGRESS],
        [ride_interface_1.RideStatus.IN_PROGRESS]: [ride_interface_1.RideStatus.COMPLETED],
    };
    if (!(ride.status in allowedTransitions) ||
        !allowedTransitions[ride.status].includes(status)) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Can't transit from ${ride.status} to ${status}`);
    }
    ride.status = status;
    if (status === ride_interface_1.RideStatus.PICKED_UP) {
        ride.pickedUpAt = new Date();
    }
    if (ride.status === ride_interface_1.RideStatus.COMPLETED) {
        ride.completedAt = new Date();
        if (ride.driver) {
            yield driver_mode_1.Driver.findOneAndUpdate({ user: new mongoose_1.Types.ObjectId(driverUserId) }, {
                $inc: { totalEarning: ride.fare || 0 },
                $set: { currentRideId: null },
            });
        }
    }
    yield ride.save();
    return ride;
});
const viewEarningsHistory = (driverUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingDrive = yield driver_mode_1.Driver.findOne({
        user: new mongoose_1.Types.ObjectId(driverUserId),
    });
    if (!existingDrive) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Driver Not Found");
    }
    const rides = yield ride_model_1.Ride.find({
        driver: new mongoose_1.Types.ObjectId(driverUserId),
        status: ride_interface_1.RideStatus.COMPLETED,
    });
    const totalEarningFromRides = rides.reduce((sum, r) => sum + (r.fare || 0), 0);
    return {
        totalEarningStored: existingDrive.totalEarning,
        totalEarningsCalculated: totalEarningFromRides,
        rides,
    };
});
const getAllDriver = () => __awaiter(void 0, void 0, void 0, function* () {
    const allRides = yield driver_mode_1.Driver.find({}).sort({ createdAt: -1 });
    return allRides;
});
const driverApprovedStatus = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_mode_1.Driver.findById(driverId);
    const user = yield user_model_1.User.findById(driver === null || driver === void 0 ? void 0 : driver.user);
    if (!driver) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Driver Not Found");
    }
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User Not Found");
    }
    if (driver.approvedStatus === driver_interface_1.DriverApproveStatus.Approved) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Driver Already Approved");
    }
    driver.approvedStatus = driver_interface_1.DriverApproveStatus.Approved;
    user.role = user_interface_1.Role.DRIVER;
    yield driver.save();
    yield user.save();
    return driver;
});
const driverSuspendStatus = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_mode_1.Driver.findById(driverId);
    const user = yield user_model_1.User.findById(driver === null || driver === void 0 ? void 0 : driver.user);
    if (!driver) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Driver Not Found");
    }
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User Not Found");
    }
    if (driver.approvedStatus === driver_interface_1.DriverApproveStatus.Suspended) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Driver Already Suspended");
    }
    driver.approvedStatus = driver_interface_1.DriverApproveStatus.Suspended;
    user.role = user_interface_1.Role.RIDER;
    yield driver.save();
    yield user.save();
    return driver;
});
exports.driverServices = {
    applyDriver,
    viewEarningsHistory,
    acceptRideByDrier,
    setOnlineStatus,
    rejectRide,
    updateRideStatus,
    getAllDriver,
    driverApprovedStatus,
    driverSuspendStatus,
};
