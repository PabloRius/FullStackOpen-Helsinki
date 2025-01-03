import { ENV } from "./config.js";

const info = (...params) => {
  if (ENV !== "test") {
    console.log(...params);
  }
};
const error = (...params) => {
  if (ENV !== "test") {
    console.error(...params);
  }
};

export { info, error };
