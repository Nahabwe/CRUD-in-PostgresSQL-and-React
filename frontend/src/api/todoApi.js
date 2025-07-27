const API_URL = "http://localhost:3000/api/todos";

export async function deleteTodo(id) {
  const res=await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res
      .json()
      .catch(() => ({ message: "Failed to delete todo" }));
    throw new Error(err.message || "Failed to delete todo");
  }
  return true;
}

export async function fetchTodo() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
}

export async function createTodo(todo) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create todo");
  }

  return res.json();
}

export async function updateTodo(id, updatedTodo) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTodo),
  });

  const data = await res.json();
  return data;
}
