import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import userRouter from "./routes/userRoute.js";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import dotenv from "dotenv"
import categoryRouter from "./routes/categoryRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import cors from 'cors'
dotenv.config();

const app = express();
app.use(cors())

app.use(bodyParser.json());

const conectionString =process.env.MONGO_URL;

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next();
  }
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ messge: "Invalid or expired token" });
    }
    req.body.user = decoded;
    next();
  });
});

mongoose
  .connect(conectionString)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(() => {
    console.log("Connection Faild");
  });

app.use("/api/user/", userRouter);
app.use("/api/gallery", galleryItemRouter);
app.use("/api/category", categoryRouter);
app.use("/api/room", roomRouter);
app.use("/api/bookings", bookingRouter);

app.listen(3000, () => {
  console.log("Express app Start...");
});
