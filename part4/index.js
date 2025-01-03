import express from "express";
import cors from "cors";
import morgan from "morgan";

import { init_mongo } from "./app.js";
import { errorHandler } from "./utils/middleware.js";
import { PORT } from "./utils/config.js";
import { info } from "./utils/logger.js";

import { blogs_app } from "./controllers/blogs.js";

const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan("tiny"));

init_mongo();

app.use("/api/blogs", blogs_app);

app.use(errorHandler);

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
