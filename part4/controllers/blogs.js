import express from "express";
import jwt from "jsonwebtoken";
import { StatusError } from "../../part3/utils/StatusError.js";
import Blog from "../models/blog.js";
import User from "../models/user.js";

const blogs_app = express();

blogs_app.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    return res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
});

blogs_app.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate("user", {
      username: 1,
      name: 1,
    });
    if (!blog) throw new StatusError(404, `Id ${id} not found`);
    return res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
});

blogs_app.post("/", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) throw new StatusError(401, "invalid token");
    const user = await User.findById(decodedToken.id);
    if (!user)
      throw new StatusError(404, `No user was found for the userId ${userId}`);
    const newBlog = new Blog({ ...req.body, user: user.id });
    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    const populatedBlog = await savedBlog.populate("user", {
      username: 1,
      name: 1,
    });
    return res.status(201).json(populatedBlog);
  } catch (err) {
    next(err);
  }
});

blogs_app.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) throw new StatusError(404, `Id ${id} not found`);
    return res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

blogs_app.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) throw new StatusError(404, `Id ${id} not found`);
    return res.status(200).json(deletedBlog);
  } catch (err) {
    next(err);
  }
});

export { blogs_app };
