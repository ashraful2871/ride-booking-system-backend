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
router.get(
  "/earnings",
  checkAuth(Role.DRIVER),
  driverController.viewEarningsHistory
);

export const driverRoutes = router;
