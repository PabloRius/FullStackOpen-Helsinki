import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { SECRET } from "./config.js";
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

export const userExtractor = async (request, response, next) => {
  if (!request.token) {
    request.user = null;
    next();
  }
  console.log("PRE", request.token);
  const decodedToken = jwt.verify(request.token, SECRET);
  console.log("POST");
  if (!decodedToken.id)
    return response.status(401).json({ error: "invalid token" });
  const user = await User.findById(decodedToken.id);
  if (!user)
    return response
      .status(404)
      .json({ error: `No user was found for the userId ${decodedToken.id}` });
  request.user = user;
  next();
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, request, response, next) => {
  error("----Error thrown during execution----");
  console.error(err);
  error(
    `Error: ${err.message || "No error message"}, status: ${err.status || "undefined"}`
  );

  if (err.name === "ValidationError") {
    return response
      .status(400)
      .json({ error: err.message || "Error validating input" });
  }

  if (err.name === "CastError") {
    return response.status(404).json({ error: "Malformatted ID" });
  }

  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "Invalid token" });
  }

  if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "Token expired" });
  }

  if (error.name === "MongoServerError" && error.code === 11000) {
    return response
      .status(400)
      .json({ error: "Duplicate key error: expected 'username' to be unique" });
  }

  return response
    .status(err.status || 500)
    .json({ ...err, error: err.message || "Internal server error" });
};
