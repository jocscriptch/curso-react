import { TaskItem } from "./TaskItem";

export const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white/60 p-6 text-center">
        <p className="text-gray-500">
          No tasks yet... <span className="font-medium text-indigo-600">add the first one!</span> ✍️
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-6 space-y-2">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
};
