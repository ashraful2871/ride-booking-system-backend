import { Router } from "express";
import { locationController } from "./location.controller";

const router = Router();

router.post("/create-location", locationController.createLocation);
router.get("/all-location", locationController.allLocation);

export const locationRoute = router;
