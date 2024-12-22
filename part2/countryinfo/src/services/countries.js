import axios from "axios";

const API_ENDPOINT = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = async () => {
  try {
    const result = await axios.get(`${API_ENDPOINT}/all`);
    if (result.status === 200) {
      return result.data;
    }
    return null;
  } catch {
    return null;
  }
};

const getOne = async (props) => {
  const { country } = props;
  if (!country) return null;
  try {
    const result = await axios.get(`${API_ENDPOINT}/name/${country}`);
    if (result.status === 200) {
      return result.data;
    }
    return null;
  } catch {
    return null;
  }
};

export { getAll, getOne };
