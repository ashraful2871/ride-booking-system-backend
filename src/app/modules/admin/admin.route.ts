import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

router.get("/all-users", adminController.getAllUsers);
router.get("/all-rides", adminController.getAllRides);
router.get("/all-drivers", adminController.getAllDriver);
router.patch("/driver-status/:driverId", adminController.driverApprovedStatus);
router.patch("/block-user/:userId", adminController.blockUser);

export const adminRoutes = router;
