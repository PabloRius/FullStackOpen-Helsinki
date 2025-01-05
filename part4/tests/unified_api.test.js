import { test, after, beforeEach, describe } from "node:test";
import assert, { strictEqual } from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import bcrypt from "bcrypt";

import { app } from "../app.js";
import helper from "./test_helper.js";
import User from "../models/user.js";
import Blog from "../models/blog.js";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash(helper.rootUser.password, 10);
  const user = new User({ ...helper.rootUser, passwordHash });

  await user.save();

  console.log("TEST SETUP DONE");
});

after(async () => {
  await mongoose.connection.close();
});

describe("when only one user exists", () => {
  test("the user can log in with the right credentials", async () => {
    const response = await api
      .post("/api/login")
      .send({
        username: helper.rootUser.username,
        password: helper.rootUser.password,
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const token = response.body.token;
    assert(token);
  });
  test("the server throws a 401 if the password is wrong", async () => {
    await api
      .post("/api/login")
      .send({
        username: helper.rootUser.username,
        password: "wrongpassword",
      })
      .expect(401);
  });
  test("the server throws a 400 if the request body is malformed", async () => {
    await api
      .post("/api/login")
      .send({
        name: "should be 'username'",
        secret: "should be 'password'",
      })
      .expect(400);
  });
  test("the user can create a new blog using the generated token", async () => {
    const response = await api
      .post("/api/login")
      .send({
        username: helper.rootUser.username,
        password: helper.rootUser.password,
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const token = response.body.token;
    const startBlogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert(startBlogs.body.length === 0);
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(helper.extraBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const endBlogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert(endBlogs.body.length === 1);
  });
  test("the user can delete the new blog using the geenrated token", async () => {
    const response = await api
      .post("/api/login")
      .send({
        username: helper.rootUser.username,
        password: helper.rootUser.password,
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const token = response.body.token;
    const startBlogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert(startBlogs.body.length === 0);
    const newBlog = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(helper.extraBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const midBlogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert(midBlogs.body.length === 1);
    await api
      .delete(`/api/blogs/${newBlog.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const endBlogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert(endBlogs.body.length === 0);
  });
});
