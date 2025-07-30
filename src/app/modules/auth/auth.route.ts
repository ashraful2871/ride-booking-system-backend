import { Router } from "express";
import { autController } from "./auth.controller";

const router = Router();

router.use("/login", autController.credentialLogin);

export const authRoutes = router;
