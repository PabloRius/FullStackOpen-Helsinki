import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const connectionString = `mongodb+srv://pablogrius:${password}@fullstackopen.flmxp.mongodb.net/FullStackOpen?retryWrites=true&w=majority&appName=FullStackOpen`;
console.log(connectionString);
mongoose.set("strictQuery", false);

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
    if (name && number) {
      const personSchema = new mongoose.Schema({
        name: String,
        number: String,
      });

      const Person = mongoose.model("Person", personSchema, "phonebook");

      const person = new Person({ name, number });

      person
        .save()
        .then(() => {
          console.log(`Added ${name} number ${number} to phonebook`);
          mongoose.connection.close();
        })
        .catch((err) => {
          console.error(err);
          mongoose.connection.close();
        });
    } else {
      const personSchema = new mongoose.Schema({
        name: String,
        number: String,
      });

      const Person = mongoose.model("Person", personSchema, "phonebook");

      Person.find({})
        .then((persons) => {
          console.log("Phonebook:");
          persons.forEach((person) => {
            console.log(`${person.name} ${person.number}`);
          });
          mongoose.connection.close();
        })
        .catch((err) => {
          console.error(err);
          mongoose.connection.close();
        });
    }
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
