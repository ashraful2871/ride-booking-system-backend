import express, { Request, Response } from "express";
import { router } from "./app/routes";
import passport from "passport";
import "./app/config/passport";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to Ride Booking System",
  });
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
