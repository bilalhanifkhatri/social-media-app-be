import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import AuthRoute from "./routers/AuthRouter.js";
import UserRoute from "./routers/UserRouter.js";
import { configDotenv } from "dotenv";

const app = express();
configDotenv();

// middle wares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// database connections
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("There is something wrong", err);
  });

// runing server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on the port ${process.env.PORT}`);
});

// routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
