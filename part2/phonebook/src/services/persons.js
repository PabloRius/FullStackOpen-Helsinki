import axios from "axios";

const API_ENDPOINT = "/api/persons";

const getAll = async () => {
  const result = await axios.get(API_ENDPOINT);
  return result.data;
};

const create = async (name, number) => {
  try {
    const result = await axios.post(API_ENDPOINT, {
      name,
      number,
    });
    return result.data;
  } catch (e) {
    if (e.status === 409) {
      throw e;
    }
    return null;
  }
};

const getOneName = async (name) => {
  const result = await axios.get(`${API_ENDPOINT}?name=${name}`);
  return result.data;
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

const updateOne = async (id, number) => {
  try {
    const result = await axios.put(`${API_ENDPOINT}/${id}`, { number });
    console.log(`Updated: ${result}`);
    if (result.status === 200) return result.data;
    return null;
  } catch {
    return null;
  }
};

export { getAll, getOneName, create, deleteOne, updateOne };
