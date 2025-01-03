import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { errorHandler } from "./utils/middleware.js";

import { blogs_app } from "./controllers/blogs.js";

import { MONGODB_URI } from "./utils/config.js";
import { error, info } from "./utils/logger.js";

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info("Connected to MongoDB");
  })
  .catch((err) => {
    error(`Error connecting to MongoDB: ${err.message}`);
  });

export const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan("tiny"));

app.use("/api/blogs", blogs_app);

app.use(errorHandler);