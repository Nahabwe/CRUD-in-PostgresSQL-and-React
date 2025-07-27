import React, { useEffect, useState } from "react";
import { deleteTodo, fetchTodo, updateTodo } from "../api/todoApi";
import TodoForm from "./TodoForm"; // import your form component

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const handleFetchTodo = async () => {
      try {
        const data = await fetchTodo();
        setTodos(data);
      } catch (error) {
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    };
    handleFetchTodo();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log("Delete failed:", error);
    }
  };

  const handleUpdateSubmit = async (updatedFields) => {
    try {
      const updated = await updateTodo(editId, updatedFields);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === editId ? updated : todo))
      );
      setEditId(null);
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  if (loading)
    return <div className="text-center text-gray-800 text-2xl">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 text-2xl">{error}</div>;

  return (
    <div className="min-h-screen p-8 ">
      <h1 className="text-center text-gray-800 text-2xl">My Todo List</h1>

      {todos.map((todo) => (
        <div key={todo.id} className="bg-white shadow-md p-4 mb-4 rounded-lg">
          {editId === todo.id ? (
            <TodoForm
              onSubmit={handleUpdateSubmit}
              onCancel={() => setEditId(null)}
              initialTitle={todo.title}
              initialDescription={todo.description}
              editMode={true}
            />
          ) : (
            <>
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  className="bg-green-500 p-2 text-white rounded-md"
                  onClick={() => setEditId(todo.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 p-2 text-white rounded-md"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
