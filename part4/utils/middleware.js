import { error } from "./logger.js";

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, request, response, next) => {
  error("----Error thrown during execution----");
  error(err);
  if (err.url && err.url === "/") {
    return null;
  }

  if (err.name === "ValidationError") {
    return response
      .status(400)
      .json({ error: err.message || "Error validating input" });
  }

  if (err.name === "CastError") {
    return response
      .status(404)
      .json({ error: err.message || "Error casting an object" });
  }

  return response
    .status(err.status || 500)
    .json({ ...err, error: err.message || "Internal server error" });
};
