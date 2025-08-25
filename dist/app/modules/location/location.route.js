"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRoute = void 0;
const express_1 = require("express");
const location_controller_1 = require("./location.controller");
const router = (0, express_1.Router)();
router.post("/create-location", location_controller_1.locationController.createLocation);
router.get("/all-location", location_controller_1.locationController.allLocation);
exports.locationRoute = router;
