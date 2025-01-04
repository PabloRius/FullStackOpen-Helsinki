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

describe("when there is only one user in the db", () => {
  test("the get endpoint returns only one element", async () => {
    const result = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    strictEqual(result.body.length, 1);
  });
  test("creation succeeds with a fresh username", async () => {
    const allUsers = await helper.usersInDB();
    await api
      .post("/api/users")
      .send(helper.randomUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const result = await helper.usersInDB();
    strictEqual(result.length, allUsers.length + 1);
    const usernames = result.map((e) => e.username);
    assert(usernames.includes(helper.randomUser.username));
    await api.get("/api/users").expect(200);
  });
  test("the user can create a new blog under his name", async () => {
    const allUsers = await helper.usersInDB();
    const newBlog = { ...helper.extraBlog, userId: allUsers[0].id };
    await api.post("/api/blogs").send(newBlog).expect(201);
    const result = await api.get("/api/users").expect(200);
    console.log(result.body);
    strictEqual(result.body[0].blogs.length, 1);
  });
});
