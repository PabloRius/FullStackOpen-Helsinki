import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, minlength: 3, required: true },
  author: { type: String, minlength: 3, required: true },
  url: { type: String, minlength: 5, required: true },
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Blog = mongoose.model("Blog", blogSchema, "Blogs");

export default Blog;
