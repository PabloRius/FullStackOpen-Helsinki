import axios from "axios";

const getAll = async () => {
  try {
    const result = await axios.get("http://localhost:3002/persons");
    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const getOne = async (id) => {
  try {
    const result = await axios.get(`http://localhost:3002/persons/${id}`);

    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const deleteOne = async (id) => {
  try {
    const result = await axios.delete(`http://localhost:3002/persons/${id}`);
    return result.data;
  } catch (e) {
    console.error(e);
    if (e.status === 404) return {};
    return null;
  }
};

export { getAll, getOne, deleteOne };
