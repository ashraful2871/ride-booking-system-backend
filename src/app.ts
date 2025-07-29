import express, { Request, Response } from "express";
import { router } from "./app/routes";
const app = express();
app.use(express.json());

app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to Ride Booking System",
  });
});
export default app;
