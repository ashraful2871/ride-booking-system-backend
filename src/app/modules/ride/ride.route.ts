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

export const rideRoute = router;
