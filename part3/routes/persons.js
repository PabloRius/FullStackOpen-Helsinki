import express from "express";

import { deleteOne, getAll, getOne } from "../services/persons.js";

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

persons_api.get("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await getOne(id);
  if (person.length === 0) {
    return res.status(404).send(`<p>Element not found on the server</p>`);
  } else if (!person) {
    return res.status(500).send(`<p>Internal server error</p>`);
  }
  return res.status(200).json(person);
});

persons_api.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await deleteOne(id);
  console.log(person);
  if (Object.keys(person).length === 0) {
    return res.status(404).send(`<p>Element not found on the server</p>`);
  } else if (!person) {
    return res.status(500).send(`<p>Internal server error</p>`);
  }
  return res.status(200).json(person);
});
