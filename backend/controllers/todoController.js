import pool from "../database/db.js";

export const getTodos = async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  res.json(result.rows);
};

export const createTodo = async (req, res) => {
  const { title, description } = req.body;

  const result = await pool.query(
    "INSERT INTO todos (title,description) VALUES($1,$2) RETURNING *",
    [title, description]
  );
  res.json(result.rows[0]);
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM todos WHERE id=$1", [id]);
  res.json({ messagse: "Todo deleted" });
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const result = await pool.query(
    "UPDATE todos SET title=$1,description=$2 WHERE id =$3 RETURNING *",
    [title, description, id]
  );
  res.json(result.rows[0]);
};

export const getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM todos WHERE id=$1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ messagse: "Todo not found " });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching todo by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
