export const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <li className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white/70 px-3 py-2 shadow-sm transition hover:shadow-md">
      <label className="flex flex-1 items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-4 w-4 accent-indigo-600"
          aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
        />
        <span
          className={`flex-1 select-none ${
            task.completed ? "text-gray-400 line-through" : "text-gray-800"
          }`}
        >
          {task.text}
        </span>
      </label>

      <button
        onClick={() => onDelete(task.id)}
        className="rounded-lg bg-rose-500 px-3 py-1 text-sm font-semibold text-white opacity-90 shadow transition hover:bg-rose-600 hover:opacity-100 active:translate-y-[1px]"
        aria-label="Delete task"
        title="Delete"
      >
        Delete
      </button>
    </li>
  );
};
