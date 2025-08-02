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
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const driver_service_1 = require("./driver.service");
const applyDriver = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const payload = req.body;
    const newDriver = yield driver_service_1.driverServices.applyDriver(userId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Driver application Successfully",
        data: newDriver,
    });
}));
const acceptRideByDrier = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { rideId } = req.params;
    const { userId: driverId } = req.user;
    const ride = yield driver_service_1.driverServices.acceptRideByDrier(rideId, driverId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Ride Accepted Successfully",
        data: ride,
    });
}));
const setOnlineStatus = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { IsOnline } = req.body;
    const { userId: driverUserId } = req.user;
    const driver = yield driver_service_1.driverServices.setOnlineStatus(driverUserId, IsOnline);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Availability updated",
        data: driver,
    });
}));
const rejectRide = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { rideId } = req.params;
    const ride = yield driver_service_1.driverServices.rejectRide(rideId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Ride Rejected Successfully",
        data: ride,
    });
}));
const updateRideStatus = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { rideId } = req.params;
    const { status } = req.body;
    const { userId: driverUserId } = req.user;
    const ride = yield driver_service_1.driverServices.updateRideStatus(rideId, driverUserId, status);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Ride Status Update Successfully",
        data: ride,
    });
}));
const viewEarningsHistory = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId: driverUserId } = req.user;
    const earnings = yield driver_service_1.driverServices.viewEarningsHistory(driverUserId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Earnings history retrieved Successfully",
        data: earnings,
    });
}));
const getAllDriver = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield driver_service_1.driverServices.getAllDriver();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "All Driver Retrieved successfully",
        data: driver,
    });
}));
const driverApprovedStatus = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverId } = req.params;
    const driver = yield driver_service_1.driverServices.driverApprovedStatus(driverId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Driver Status Approved successfully",
        data: driver,
    });
}));
const driverSuspendStatus = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverId } = req.params;
    const driver = yield driver_service_1.driverServices.driverSuspendStatus(driverId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Driver Status Suspended",
        data: driver,
    });
}));
exports.driverController = {
    applyDriver,
    viewEarningsHistory,
    acceptRideByDrier,
    setOnlineStatus,
    updateRideStatus,
    rejectRide,
    getAllDriver,
    driverApprovedStatus,
    driverSuspendStatus,
};
