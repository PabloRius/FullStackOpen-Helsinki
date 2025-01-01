import express from "express";
import { api } from "./routes/api.js";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.static("dist"));

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
