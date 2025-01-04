import { test, after, beforeEach, describe } from "node:test";
import assert, { strictEqual } from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";

import { app } from "../app.js";
import Blog from "../models/blog.js";
import {
  extraBlog,
  extraBlogMissingAuthor,
  extraBlogMissingLikes,
  extraBlogMissingTitle,
  initialBlogs,
} from "./test_helper.js";

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

describe("blogs api", () => {
  test("blogs are returned as a json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs");

    strictEqual(response.body.length, initialBlogs.length);
  });

  test("there is a id for each blog", async () => {
    const response = await api.get("/api/blogs");
    assert(
      response.body.every((blog) => {
        return "id" in blog;
      })
    );
  });

  test("adds every blog received through a post to the database", async () => {
    await api
      .post("/api/blogs")
      .send(extraBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allBlogs = await api.get("/api/blogs");
    const authors = allBlogs.body.map((e) => e.author);
    strictEqual(allBlogs.body.length, initialBlogs.length + 1);
    assert(authors.includes(extraBlog.author));
  });

  test("sets likes to 0 when not specified", async () => {
    const newBlogResponse = await api
      .post("/api/blogs")
      .send(extraBlogMissingLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const newId = newBlogResponse.body.id;

    const createdBlogResponse = await api
      .get(`/api/blogs/${newId}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    strictEqual(createdBlogResponse.body.likes, 0);
  });

  test("missing an attribute throws a 400", async () => {
    await api.post("/api/blogs").send(extraBlogMissingAuthor).expect(400);
    await api.post("/api/blogs").send(extraBlogMissingTitle).expect(400);
    await api.post("/api/blogs").send(extraBlogMissingTitle).expect(400);
  });

  test("deletes one blog correctly", async () => {
    const allBlogs = await api.get("/api/blogs").expect(200);

    await api
      .delete(`/api/blogs/${allBlogs.body[0].id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const result = await api.get("/api/blogs").expect(200);
    strictEqual(result.body.length, allBlogs.body.length - 1);
    const ids = result.body.map((e) => e.id);
    assert(!(initialBlogs[0]._id in ids));
  });

  test("wrong id throws a 404", async () => {
    await api.delete(`/api/blogs/randomid`).expect(404);
  });
});
