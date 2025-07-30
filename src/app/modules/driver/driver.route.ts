import { Router } from "express";
import { driverController } from "./driver.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/register",
  checkAuth(...Object.values(Role)),
  driverController.applyDriver
);

export const driverRoutes = router;
