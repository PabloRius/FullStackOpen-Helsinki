import express from "express";

import { info_api } from "./info.js";
import { persons_api } from "./persons.js";

export const api = express();

api.get("/", (req, res) => {
  res.json("Healthcheck OK!");
});

api.use("/persons", persons_api);

api.use("/info", info_api);
