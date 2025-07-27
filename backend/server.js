import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import todoRoutes from './routes/todoRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
