import { error } from "./logger.js";

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, request, response, next) => {
  error("-ERROR MIDDLEWARE CALL-");
  if (err.url && err.url === "/") {
    return null;
  }
  error(
    `Error: ${err.message || "<No error message>"}, status: ${
      err.status || "<undefined>"
    }`
  );

  if (err.name === "ValidationError") {
    return response
      .status(400)
      .json({ error: err.message || "Error validating input" });
  }

  return response
    .status(err.status || 500)
    .json({ ...err, error: err.message || "Internal server error" });
};
