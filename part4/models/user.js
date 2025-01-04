import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, minlength: 3, required: true, unique: true },
  name: { type: String, minlength: 3, required: true },
  passwordHash: { type: String, required: true },
  blogs: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    default: [],
  },
});
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});
const User = mongoose.model("User", userSchema, "Users");

export default User;
