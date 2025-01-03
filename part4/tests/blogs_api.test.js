import { test, after, beforeEach } from "node:test";
import { strictEqual } from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";

import { app } from "../app.js";
import Blog from "../models/blog.js";
import { initialBlogs } from "./test_helper.js";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

after(async () => {
  await mongoose.connection.close();
});

test("blogs are returned as a json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes", async () => {
  const response = await api.get("/api/blogs");

  strictEqual(response.body.length, initialBlogs.length);
});
