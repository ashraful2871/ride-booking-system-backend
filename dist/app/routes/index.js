"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const driver_route_1 = require("../modules/driver/driver.route");
const ride_route_1 = require("../modules/ride/ride.route");
exports.router = (0, express_1.Router)();
const moduleRouts = [
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/user",
        route: user_route_1.userRoute,
    },
    {
        path: "/driver",
        route: driver_route_1.driverRoutes,
    },
    {
        path: "/ride",
        route: ride_route_1.rideRoute,
    },
];
moduleRouts.forEach((route) => {
    exports.router.use(route.path, route.route);
});
