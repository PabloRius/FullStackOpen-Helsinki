import express from "express";

import { getAll } from "../services/persons.js";

export const persons_api = express();

persons_api.get("/", async (req, res) => {
  const persons = await getAll();
  if (!persons) {
    return res
      .status(500)
      .send("<p>Error retrieving the data form the server</p>");
  }
  return res.status(200).json(persons);
});