import express, { Request, Response } from "express";
import { router } from "./app/routes";
import passport from "passport";
import "./app/config/passport";
const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to Ride Booking System",
  });
});
export default app;
