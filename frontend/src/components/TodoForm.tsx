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
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 w-full max-w-lg">
      <input
        className="flex-1 p-3 rounded-lg border border-white/50 bg-white/50 placeholder-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-pink-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
      />
      <button
        type="submit"
        className="px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:scale-105 transition-transform"
      >
        Add
      </button>
    </form>
  );
}
