import { useState } from "react";

interface Props {
  addTodo: (title: string) => void;
}

export default function TodoForm({ addTodo }: Props) {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}
