/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import { envVars } from "./app/config/env";
import app from "./app";
import superAdmin from "./app/utils/supperSeedAdmin";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server;
const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("connected to DB");

    server = app.listen(envVars.PORT, () => {
      console.log(`server is connected to listening on port:${envVars.PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await superAdmin();
})();
