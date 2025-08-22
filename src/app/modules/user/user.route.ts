import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUSerZodSchema } from "./user.validation";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(createUSerZodSchema),
  userController.createUser
);
router.get("/me", checkAuth(...Object.values(Role)), userController.getMe);

export const userRoute = router;
