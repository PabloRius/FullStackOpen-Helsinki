import fs from "fs/promises";
import path from "path";

import { StatusError } from "../custom/error.js";

const filePath = path.resolve("data", "persons.json");

const readData = async () => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    throw new StatusError(500, "Error reading the file");
  }
};

const writeData = async (data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (e) {
    throw new StatusError(500, "Error writing data to file");
  }
};

const getAll = async () => {
  return await readData();
};

const getOne = async (id) => {
  const data = await readData();
  const person = data.find((p) => p.id === id);
  if (!person) throw new StatusError(404, `Id ${id} doesn't exist`);

  return person;
};

const getOneName = async (name) => {
  const data = await readData();
  const person = data.find((p) => p.name === name);
  if (!person) throw new StatusError(404, `Name ${name} doesn't exist`);

  return person;
};

const deleteOne = async (id) => {
  const data = await readData();
  const index = data.findIndex((p) => p.id === id);
  if (index === -1) throw new StatusError(404, `Id ${id} doesn't exist`);
  const [deletedPerson] = data.splice(index, 1);
  await writeData(data);

  return deletedPerson;
};

const createOne = async (id, name, number) => {
  if (!id) throw new StatusError(500, "ID is required");
  if (!name) throw new StatusError(400, "Name is required");
  if (!number) throw new StatusError(400, "Number is required");

  const data = await readData();
  const same_name = data.find((p) => p.name === name);

  if (same_name) throw new StatusError(400, `${name} is already in use`);

  const newPerson = { id, name, number };
  data.push(newPerson);
  await writeData(data);

  return newPerson;
};

export { getAll, getOne, createOne, deleteOne };
