import mongoose, { mongo } from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const CONNECTION_STRING = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Person = mongoose.model("Person", personSchema, "phonebook");

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection disconnected due to app termination");
    process.exit(0);
  });
});

export default Person;
