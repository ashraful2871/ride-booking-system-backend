"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverAvailability = exports.DriverApproveStatus = void 0;
var DriverApproveStatus;
(function (DriverApproveStatus) {
    DriverApproveStatus["Pending"] = "PENDING";
    DriverApproveStatus["Approved"] = "APPROVED";
    DriverApproveStatus["Suspended"] = "SUSPENDED";
})(DriverApproveStatus || (exports.DriverApproveStatus = DriverApproveStatus = {}));
var DriverAvailability;
(function (DriverAvailability) {
    DriverAvailability["AVAILABLE"] = "AVAILABLE";
})(DriverAvailability || (exports.DriverAvailability = DriverAvailability = {}));
