import axios from "axios";

const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";

const getOne = async (city, country) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API;

  const result = await axios.get(
    `${API_ENDPOINT}?q=${city},${country}&units=metric&APPID=${API_KEY}`
  );
  return result.data;
};

export { getOne };
