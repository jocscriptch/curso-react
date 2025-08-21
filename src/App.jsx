import { useMemo, useReducer, useCallback } from "react";
import { TaskForm } from "./components/todo-list/TaskForm";
import { TaskList } from "./components/todo-list/TaskList";
import { FilterButtons } from "./components/todo-list/FilterButtons";
import useLocalStorage from "./hooks/useLocalStorage";

// acciones
const ACTION = {
  INIT: "INIT",
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  REMOVE: "REMOVE",
};

function tasksReducer(state, action) {
  switch (action.type) {
    case ACTION.INIT:
      return action.payload;
    case ACTION.ADD:
      return [action.payload, ...state];
    case ACTION.TOGGLE:
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );
    case ACTION.REMOVE:
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
}

export const App = () => {
  // guardar en local storage
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", []);
  const [tasks, dispatch] = useReducer(tasksReducer, storedTasks);

  useMemo(() => setStoredTasks(tasks), [tasks, setStoredTasks]);

  const addTask = useCallback(
    (newTask) => dispatch({ type: ACTION.ADD, payload: newTask }),
    []
  );
  const toggleTask = useCallback(
    (id) => dispatch({ type: ACTION.TOGGLE, payload: id }),
    []
  );
  const removeTask = useCallback(
    (id) => dispatch({ type: ACTION.REMOVE, payload: id }),
    []
  );

  const [filter, setFilter] = useLocalStorage("filter", "all");
  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "done") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const pendingCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700 p-6">
      <div className="mx-auto max-w-xl rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-white/40 backdrop-blur">
        <header className="mb-2 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-700 drop-shadow-sm">
            Lista de Tareas ✨
          </h1>
        </header>

        <TaskForm onAdd={addTask} />

        <FilterButtons
          value={filter}
          onChange={setFilter}
          pendingCount={pendingCount}
        />

        <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={removeTask} />
      </div>
    </div>
  );
}
