import axios from "axios";
import { StatusError } from "../custom/error.js";

const getAll = async () => {
  const result = await axios.get("http://localhost:3002/persons");
  return result.data;
};

const getOne = async (id) => {
  if (!id) throw new StatusError(400, "An id must be specified");

  const result = await axios.get(`http://localhost:3002/persons/${id}`);
  return result.data;
};

const getOneName = async (name) => {
  const result = await axios.get(`http://localhost:3002/persons?name=${name}`);
  return result.data;
};

const deleteOne = async (id) => {
  if (!id) throw new StatusError(400, "An id must be specified");

  const result = await axios.delete(`http://localhost:3002/persons/${id}`);
  return result.data;
};

const createOne = async (id, name, number) => {
  if (!id) throw new StatusError(500, "Error asigning a unique id, try again");
  if (!name)
    throw new StatusError(400, "A name must be specified for the new person");
  if (!number)
    throw new StatusError(400, "A number must be specified for the new person");

  const same_name = await getOneName(name);
  console.log(same_name);
  if (same_name && same_name.length > 0)
    throw new StatusError(
      400,
      `${name} is already in use, choose a different name`
    );

  const result = await axios.post("http://localhost:3002/persons", {
    id: id.toString(),
    name,
    number,
  });
  return result.data;
};

export { getAll, getOne, createOne, deleteOne };
