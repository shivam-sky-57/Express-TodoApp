import type { Todo } from "../types";

interface Props {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-100 rounded mb-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className={todo.completed ? "line-through text-gray-500" : ""}>
          {todo.title}
        </span>
      </div>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-600 font-bold"
      >
        X
      </button>
    </div>
  );
}
