import express from "express";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  getTodoById
} from "../controllers/todoController.js";
const router = express.Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;
