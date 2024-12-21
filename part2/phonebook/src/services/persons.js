import axios from "axios";

const API_ENDPOINT = "http://localhost:3001/persons";

const getAll = async () => {
  const result = await axios.get(API_ENDPOINT);
  return result.data;
};
const exists = (name, persons) => {
  const exists = persons.find((person, index, array) => person.name === name);
  return exists ? exists : false;
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

const deleteOne = async (id) => {
  const result = await axios.delete(`${API_ENDPOINT}/${id}`);
  if (result.status === 200) {
    return true;
  }
  return false;
};

const updateOne = async (id, name, number) => {
  const result = await axios.put(`${API_ENDPOINT}/${id}`, { name, number });
  return result.data;
};

export { getAll, exists, create, deleteOne, updateOne };