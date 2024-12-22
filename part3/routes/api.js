import { persons_api } from "./persons.js";
import express from "express";

export const api = express();

api.get("/", (req, res) => {
  res.json("Healthcheck OK!");
});

api.use("/persons", persons_api);
