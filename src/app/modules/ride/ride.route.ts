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

export const rideRoute = router;
