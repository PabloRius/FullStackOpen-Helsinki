import Person from "../models/person.js";
import { StatusError } from "../custom/error.js";

const getAll = async () => {
  try {
    const data = await Person.find({});
    return data;
  } catch (e) {
    console.error(e.message || "Undefined error message");
    throw new StatusError(500, "Error retrieving data");
  }
};

const getOne = async (id) => {
  try {
    const person = await Person.findById(id);

    if (!person) throw new StatusError(404, `Id ${id} doesn't exist`);

    return person;
  } catch (e) {
    console.error(e.message || "Undefined error message");
    throw new StatusError(500, "Error retrieving data");
  }
};

export const getOneName = async (name) => {
  try {
    const person = await Person.findOne({ name });
    if (!person) return null;

    return person;
  } catch (e) {
    console.error(e.message || "Undefined error message");
    throw new StatusError(500, "Error retrieving data");
  }
};

const deleteOne = async (id) => {
  try {
    const person = await Person.findByIdAndDelete(id);
    if (!person) throw new StatusError(404, `Id ${id} doesn't exist`);

    return person;
  } catch (e) {
    console.error(e.message || "Undefined error message");
    throw new StatusError(500, "Error retrieving data");
  }
};

const createOne = async (name, number) => {
  if (!name) throw new StatusError(400, "Name is required");
  if (!number) throw new StatusError(400, "Number is required");

  try {
    const existing_person = await getOneName(name);
    if (existing_person) {
      throw new StatusError(409, `${name} is already in use.`);
    }

    const newPerson = new Person({ name, number });
    await newPerson.save();
    return newPerson;
  } catch (e) {
    if (e instanceof StatusError) {
      throw e;
    }
    console.error(e.message || "Undefined error message");
    throw new StatusError(500, "Error creating data");
  }
};

const updateOne = async (id, number) => {
  if (!id) throw new StatusError(400, "ID is required");
  if (!number) throw new StatusError(400, "Number is required");

  try {
    const existing_person = await getOne(id);
    if (!existing_person) {
      throw new StatusError(404, `${id} not found.`);
    }
    const updatedPerson = await Person.findByIdAndUpdate(id, { number });
    console.log(updatedPerson);
    return updatedPerson;
  } catch (e) {
    if (e instanceof StatusError) {
      throw e;
    }
    console.error(e.message || "Undefined error message");
    throw new StatusError(500, "Error creating data");
  }
};

export { getAll, getOne, createOne, deleteOne, updateOne };
