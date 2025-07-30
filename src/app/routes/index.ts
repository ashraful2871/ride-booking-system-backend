import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";

export const router = Router();

const moduleRouts = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoute,
  },
];

moduleRouts.forEach((route) => {
  router.use(route.path, route.route);
});
