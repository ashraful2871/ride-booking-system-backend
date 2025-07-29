import express, { Request, Response } from "express";
const app = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to Ride Booking System",
  });
});
export default app;
