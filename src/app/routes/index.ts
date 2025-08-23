import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { driverRoutes } from "../modules/driver/driver.route";
import { rideRoute } from "../modules/ride/ride.route";
import { locationRoute } from "../modules/location/location.route";

export const router = Router();

const moduleRouts = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/driver",
    route: driverRoutes,
  },
  {
    path: "/ride",
    route: rideRoute,
  },
  {
    path: "/location",
    route: locationRoute,
  },
];

moduleRouts.forEach((route) => {
  router.use(route.path, route.route);
});
