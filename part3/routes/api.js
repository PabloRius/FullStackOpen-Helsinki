import express from "express";
import morgan from "morgan";

import { info_api } from "./info.js";
import { persons_api } from "./persons.js";

export const api = express();

api.use(morgan("tiny"));

api.get("/", (req, res) => {
  res.json("Healthcheck OK!");
});

api.use("/persons", persons_api);

api.use("/info", info_api);
