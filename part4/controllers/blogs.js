import express from "express";
import { StatusError } from "../../part3/utils/StatusError.js";
import Blog from "../models/blog.js";

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
    const { user } = req;
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
    const { user } = req;

    const blogToDelete = await Blog.findById(id);
    if (!blogToDelete) throw new StatusError(404, `Id ${id} not found`);

    if (user.id.toString() !== blogToDelete.user.toString())
      throw new StatusError(401, "Can't delete other user's blog");

    const deletedBlog = await Blog.findByIdAndDelete(id);
    return res.status(200).json(deletedBlog);
  } catch (err) {
    next(err);
  }
});

export { blogs_app };
