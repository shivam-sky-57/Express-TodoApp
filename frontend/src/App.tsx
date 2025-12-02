import { useEffect, useState } from "react";
import { api } from "./api";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import type { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  
  async function loadTodos() {
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Failed to load todos:", err);
    }
  }

  
  async function addTodo(title: string) {
    try {
      console.log("Adding todo:", title);
      const res = await api.post("/todos", { title });
      console.log("Response:", res.data);
      setTodos([...todos, res.data]);
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  }

  
  async function toggleTodo(id: number) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const res = await api.put(`/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  }

  
  async function deleteTodo(id: number) {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center py-10 overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <h1 className="text-4xl font-bold text-white text-center mb-8">Todo App 🚀</h1>

      <TodoForm addTodo={addTodo} />

      {todos.length === 0 && (
        <p className="text-white text-center mt-4">No todos yet!</p>
      )}

      <div className="w-full max-w-lg mt-6 bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
