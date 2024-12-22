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

export { getAll };
