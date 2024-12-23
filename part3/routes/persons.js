import express from "express";

import { createOne, deleteOne, getAll, getOne } from "../services/persons.js";

export const persons_api = express();

persons_api.get("/", async (req, res) => {
  try {
    const persons = await getAll();

    return res.status(200).json(persons);
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: e.message || "Internal server error" });
  }
});

persons_api.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await getOne(id);
    return res.status(200).json(person);
  } catch (e) {
    switch (e.status) {
      case 404:
        return res
          .status(404)
          .json({ error: `ID ${id} doesn't exist on the server` });

      default:
        return res
          .status(e.status)
          .json({ error: e.message || "Internal server error" });
    }
  }
});

persons_api.post("/", async (req, res) => {
  try {
    const { name, number } = req.body;
    const random_id = Math.floor(Math.random() * 100);
    const person = await createOne(random_id, name, number);
    return res.status(200).json(person);
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: e.message || "Internal server error" });
  }
});

persons_api.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await deleteOne(id);
    return res.status(200).json(person);
  } catch (e) {
    switch (e.status) {
      case 404:
        return res
          .status(404)
          .json({ error: `ID ${id} doesn't exist on the server` });

      default:
        return res
          .status(e.status)
          .json({ error: e.message || "Internal server error" });
    }
  }
});
