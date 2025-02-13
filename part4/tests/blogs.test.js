import { describe, test } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import helper from "../utils/list_helper.js";
import { blogs, emptyBlogsList, oneBlogList } from "./test_helper.js";

test("dummy returns one", () => {
  const result = helper.dummy(blogs);
  strictEqual(result, 1);
});
describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = helper.totalLikes(emptyBlogsList);
    strictEqual(result, 0);
  });
  test("when list has only one blog equales the likes of that", () => {
    const result = helper.totalLikes(oneBlogList);
    strictEqual(result, 7);
  });
  test("of a bigger list is calculated right", () => {
    const result = helper.totalLikes(blogs);
    strictEqual(result, 36);
  });
});

describe("favorite blog", () => {
  test("of empty list is null", () => {
    const result = helper.favoriteBlog(emptyBlogsList);
    strictEqual(result, null);
  });
  test("when list has only one blog equals that", () => {
    const result = helper.favoriteBlog(oneBlogList);
    deepStrictEqual(result, {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    });
  });
  test("of a bigger list is calculated right", () => {
    const result = helper.favoriteBlog(blogs);
    deepStrictEqual(result, {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

describe("top blogger (by # of posts)", () => {
  test("of empty list is null", () => {
    const result = helper.mostBlogs(emptyBlogsList);
    strictEqual(result, null);
  });
  test("when list has only one blog equals that", () => {
    const result = helper.mostBlogs(oneBlogList);
    deepStrictEqual(result, {
      author: "Michael Chan",
      blogs: 1,
    });
  });
  test("of a bigger list is calculated right", () => {
    const result = helper.mostBlogs(blogs);
    deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("top blogger (by likes)", () => {
  test("of empty list is null", () => {
    const result = helper.mostLikes(emptyBlogsList);
    strictEqual(result, null);
  });
  test("when list has only one blog equals that", () => {
    const result = helper.mostLikes(oneBlogList);
    deepStrictEqual(result, {
      author: "Michael Chan",
      likes: 7,
    });
  });
  test("of a bigger list is calculated right", () => {
    const result = helper.mostLikes(blogs);
    deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
