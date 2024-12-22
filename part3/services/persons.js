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
    const result = await axios.get(`http://localhost:3002/persons?id=${id}`);

    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const deleteOne = async (id) => {
  try {
    const result = await axios.get(`http://localhost:3002/persons/${id}`);

    console.log(result);
    if (filtered) return filtered[0];
    else return undefined;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export { getAll, getOne };
