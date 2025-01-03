import dotenv from "dotenv";
dotenv.config();

const ENV = process.env.NODE_ENV;

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  ENV === "test" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

export { ENV, PORT, MONGODB_URI };
