import Person from "../models/person.js";
import { StatusError } from "../custom/error.js";

const getAll = async () => {
  try {
    const data = await Person.find({});
    return data;
  } catch (e) {
    throw e;
  }
};

const getOne = async (id) => {
  try {
    const person = await Person.findById(id);

    if (!person) throw new StatusError(404, `Id ${id} doesn't exist`);

    return person;
  } catch (e) {
    throw e;
  }
};

export const getOneName = async (name) => {
  try {
    const person = await Person.findOne({ name });

    if (!person) throw new StatusError(404, `Name ${name} doesn't exist`);

    return person;
  } catch (e) {
    throw e;
  }
};

const deleteOne = async (id) => {
  try {
    const person = await Person.findByIdAndDelete(id);
    if (!person) throw new StatusError(404, `Id ${id} doesn't exist`);

    return person;
  } catch (e) {
    throw e;
  }
};

const createOne = async (name, number) => {
  if (!name) throw new StatusError(400, "Name is required");
  if (!number) throw new StatusError(400, "Number is required");

  try {
    const existingPerson = await Person.findOne({ name });
    if (existingPerson) {
      const conflictingError = new StatusError(
        409,
        `${name} is already in use.`
      );
      conflictingError.id = existingPerson._id;
      throw conflictingError;
    }

    const newPerson = new Person({ name, number });
    await newPerson.save();
    return newPerson;
  } catch (error) {
    throw error;
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
    const updatedPerson = await Person.findByIdAndUpdate(
      id,
      { number },
      { runValidators: true }
    );

    return updatedPerson;
  } catch (e) {
    throw e;
  }
};

export { getAll, getOne, createOne, deleteOne, updateOne };
