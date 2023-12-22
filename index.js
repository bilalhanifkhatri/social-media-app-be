import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import AuthRoute from "./routers/AuthRouter.js";
// import UploadRoute from "./routers/UploadRouter.js";
import UserRoute from "./routers/UserRouter.js";
import PostRoute from "./routers/PostRouter.js";
import ChatRoute from "./routers/ChatRouter.js";
import MessageRoute from "./routers/MessageRouter.js";
import { configDotenv } from "dotenv";

const app = express();
configDotenv();

// middle wares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// set public folder
app.use(express.static("public"));
app.use("/images", express.static("images"));

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
// app.use("/upload", UploadRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/message", MessageRoute);
app.use("/chat", ChatRoute);
