import { useEffect, useRef, useState } from "react";

export const TaskForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => inputRef.current?.focus(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;

    onAdd({
      id: Date.now(),
      text: value,
      completed: false,
    });

    setText("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
      <label htmlFor="new-task" className="sr-only">
        Nueva tarea
      </label>
      <input
        id="new-task"
        ref={inputRef}
        className="flex-1 rounded-xl border border-gray-300/80 bg-white/70 px-3 py-2 text-gray-800 outline-none ring-2 ring-transparent transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-200"
        type="text"
  placeholder="Escribe una tarea..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-xl bg-indigo-500 px-4 py-2 font-semibold text-white shadow-md transition hover:bg-indigo-700 active:translate-y-[1px]"
      >
        Agregar
      </button>
    </form>
  );
};
