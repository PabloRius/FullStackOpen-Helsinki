import { error } from "./logger.js";

export const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }
  next();
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, request, response, next) => {
  error("----Error thrown during execution----");
  console.error(err);
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

  if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  }

  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "Invalid token" });
  }

  return response
    .status(err.status || 500)
    .json({ ...err, error: err.message || "Internal server error" });
};
