import { Router } from "express";
import { driverController } from "./driver.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { applyDriverZodSchema } from "./driver.validation";

const router = Router();

router.post(
  "/register",
  checkAuth(Role.RIDER),
  validateRequest(applyDriverZodSchema),
  driverController.applyDriver
);

router.patch(
  "/accept/:rideId",
  checkAuth(Role.DRIVER),
  driverController.acceptRideByDrier
);

router.patch(
  "/availability",
  checkAuth(Role.DRIVER),
  driverController.setOnlineStatus
);

router.patch(
  "/status/:rideId",
  checkAuth(Role.DRIVER),
  driverController.updateRideStatus
);

router.patch(
  "/reject/:rideId",
  checkAuth(Role.DRIVER),
  driverController.rejectRide
);

router.get(
  "/earnings",
  checkAuth(Role.DRIVER),
  driverController.viewEarningsHistory
);

export const driverRoutes = router;
