import { Router } from "express";
import { rideController } from "./ride.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/book-ride", rideController.createRide);
router.patch(
  "/accept/:rideId",
  checkAuth(Role.DRIVER),
  rideController.acceptRideByDrier
);
router.patch(
  "/reject/:rideId",
  checkAuth(Role.DRIVER),
  rideController.rejectRide
);
router.patch(
  "/cancel/:rideId",
  checkAuth(Role.RIDER),
  rideController.cancelRide
);
router.patch(
  "/status/:rideId",
  checkAuth(Role.DRIVER),
  rideController.updateRideStatus
);
router.patch(
  "/availability",
  checkAuth(Role.DRIVER),
  rideController.setOnlineStatus
);

export const rideRoute = router;
