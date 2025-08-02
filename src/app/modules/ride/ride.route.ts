import { Router } from "express";
import { rideController } from "./ride.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/book-ride", checkAuth(Role.RIDER), rideController.createRide);
router.get(
  "/view-ride-history",
  checkAuth(Role.RIDER),
  rideController.viewRideHistory
);

router.get(
  "/all-rider",
  checkAuth(Role.SUPER_ADMIN),
  rideController.getAllRider
);

router.patch(
  "/cancel/:rideId",
  checkAuth(Role.RIDER),
  rideController.cancelRide
);

export const rideRoute = router;
