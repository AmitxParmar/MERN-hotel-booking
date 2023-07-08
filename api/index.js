import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import hotelsRoute from "./routes/hotels.js";


const app = express();
dotenv.config();

// Setup Database connection! :: ->
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!!");
});

// Middlewares:: ->
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes:: ->
app.use("/api/hotels", hotelsRoute);

// Error handling:: ->
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Server port:: ->
app.listen(8800, () => {
  connect();
  console.log("Connected to backend. running on port 8800");
});
