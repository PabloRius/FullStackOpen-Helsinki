import express from "express";
import Blog from "../models/blog.js";
import { StatusError } from "../../part3/utils/StatusError.js";
import { info } from "../utils/logger.js";

const blogs_app = express();

blogs_app.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    return res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
});

blogs_app.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) throw new StatusError(404, `Id ${id} not found`);
    return res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
});

blogs_app.post("/", async (req, res, next) => {
  const newBlog = new Blog(req.body);
  newBlog
    .save()
    .then((savedBlog) => {
      res.status(200).json(savedBlog);
    })
    .catch((err) => {
      info(next);
      next(err);
    });
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
