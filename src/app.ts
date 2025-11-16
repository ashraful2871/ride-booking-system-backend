import cors from "cors";
import express, { Request, Response } from "express";
import { router } from "./app/routes";
import passport from "passport";
import "./app/config/passport";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ride-booking-a725a.web.app"],

    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to Ride Booking System",
  });
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
