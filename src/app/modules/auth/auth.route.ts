import { Router } from "express";
import { autController } from "./auth.controller";

const router = Router();

router.post("/login", autController.credentialLogin);
router.post("/logout", autController.logout);

export const authRoutes = router;
