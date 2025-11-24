import { useEffect, useState } from "react";
import { api } from "./api";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import type { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos from backend
  async function loadTodos() {
    const res = await api.get("/todos");
    setTodos(res.data);
  }

  // Add todo
  async function addTodo(title: string) {
    const res = await api.post("/todos", { title });
    setTodos([...todos, res.data]);
  }

  // Toggle todo
  async function toggleTodo(id: number) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const res = await api.put(`/todos/${id}`, {
      completed: !todo.completed,
    });

    setTodos(todos.map((t) => (t.id === id ? res.data : t)));
  }

  // Delete todo
  async function deleteTodo(id: number) {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter((t) => t.id !== id));
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Todo App 🚀</h1>

      <TodoForm addTodo={addTodo} />

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default App;
