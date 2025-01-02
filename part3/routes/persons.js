import express from "express";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  getOneName,
  updateOne,
} from "../services/persons.js";

export const persons_api = express();

persons_api.get("/", async (req, res) => {
  const name = req.query.name;
  try {
    if (name) {
      const person = await getOneName(name);
      return res.status(200).json(person);
    }
    const persons = await getAll();

    return res.status(200).json(persons);
  } catch (e) {
    return res
      .status(e.status || 500)
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
          .status(e.status || 500)
          .json({ error: e.message || "Internal server error" });
    }
  }
});

persons_api.post("/", async (req, res) => {
  try {
    const { name, number } = req.body;
    const person = await createOne(name, number);
    return res.status(200).json(person);
  } catch (e) {
    return res
      .status(e.status || 500)
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
          .status(e.status || 500)
          .json({ error: e.message || "Internal server error" });
    }
  }
});

persons_api.put("/:id", async (req, res) => {
  console.log(req);
  const id = req.params.id;
  const { number } = req.body;
  try {
    const person = await updateOne(id, number);
    return res.status(200).json(person);
  } catch (e) {
    return res
      .status(e.status || 500)
      .json({ error: e.message || "Internal server error" });
  }
});
