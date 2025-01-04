import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { StatusError } from "../../part3/utils/StatusError.js";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      throw new StatusError(400, "username and password required");
    }

    const user = await User.findOne({ username });
    console.log(password, user.passwordHash);
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(username && passwordCorrect)) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    return res
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (err) {
    next(err);
  }
});
