import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUSerZodSchema } from "./user.validation";
import { userController } from "./user.controller";

const router = Router();

router.post(
  "/register",
  validateRequest(createUSerZodSchema),
  userController.createUser
);

export const userRoute = router;
