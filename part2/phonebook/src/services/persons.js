import axios from "axios";

const API_ENDPOINT = "/api/persons";

const getAll = async () => {
  const result = await axios.get(API_ENDPOINT);
  return result.data;
};

const create = async (name, number) => {
  const result = await axios.post(API_ENDPOINT, {
    name,
    number,
  });
  return result.data;
};

const getOneName = async (name) => {
  const result = await axios.get(`${API_ENDPOINT}?name=${name}`);
  return result.data;
};

const deleteOne = async (id) => {
  const result = await axios.delete(`${API_ENDPOINT}/${id}`);
  return result;
};

const updateOne = async (id, number) => {
  const result = await axios.put(`${API_ENDPOINT}/${id}`, { number });
  return result.data;
};

export { getAll, getOneName, create, deleteOne, updateOne };
