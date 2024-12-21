import axios from "axios";

const API_ENDPOINT = "http://localhost:3001/persons";

const getAll = async () => {
  const result = await axios.get(API_ENDPOINT);
  return result.data;
};
const exists = (name, persons) => {
  return persons.some((person) => person.name === name);
};

const create = async (name, number) => {
  const result = await axios.post(API_ENDPOINT, {
    name,
    number,
  });
  if (result.status === 201) {
    return result.data;
  }
  return null;
};

export { getAll, exists, create };
