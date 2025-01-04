import express from "express";
import { hash } from "bcrypt";
import User from "../models/user.js";

const users_app = express();

users_app.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    });
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

users_app.post("/", async (req, res, next) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    const passwordHash = await hash(password, saltRounds);
    const newUser = new User({ ...req.body, passwordHash });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

export { users_app };
