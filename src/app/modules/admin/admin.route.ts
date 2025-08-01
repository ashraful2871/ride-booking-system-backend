import { Router } from "express";
import { adminController } from "./admin.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.get(
  "/all-users",
  checkAuth(Role.SUPER_ADMIN),
  adminController.getAllUsers
);
router.get(
  "/all-rides",
  checkAuth(Role.SUPER_ADMIN),
  adminController.getAllRides
);
router.get(
  "/all-drivers",
  checkAuth(Role.SUPER_ADMIN),
  adminController.getAllDriver
);
router.patch(
  "/driver-status/:driverId",
  checkAuth(Role.SUPER_ADMIN),
  adminController.driverApprovedStatus
);
router.patch(
  "/block-user/:userId",
  checkAuth(Role.SUPER_ADMIN),
  adminController.blockUser
);

export const adminRoutes = router;
