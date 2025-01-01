import axios, { AxiosError } from "axios";

const API_ENDPOINT = "http://localhost:3001/api/persons";

const getAll = async () => {
  const result = await axios.get(API_ENDPOINT);
  console.log(result);
  return result.data;
};
const exists = (name, persons) => {
  const exists = persons.find((person, index, array) => person.name === name);
  return exists ? exists : false;
};

const create = async (name, number) => {
  try {
    const result = await axios.post(API_ENDPOINT, {
      name,
      number,
    });
    return result.data;
  } catch (e) {
    return null;
  }
};

const deleteOne = async (id) => {
  try {
    const result = await axios.delete(`${API_ENDPOINT}/${id}`);
    if (result.status === 200) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

const updateOne = async (id, name, number) => {
  try {
    const result = await axios.put(`${API_ENDPOINT}/${id}`, { number });
    if (result.status === 200) return result.data;
    return null;
  } catch {
    return null;
  }
};

export { getAll, exists, create, deleteOne, updateOne };
