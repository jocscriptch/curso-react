const FILTERS = [
  { id: "all", label: "Todas" },
  { id: "active", label: "Pendientes" },
  { id: "done", label: "Completadas" },
];

export const FilterButtons = ({ value, onChange, pendingCount }) => {
  return (
    <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2">
        {FILTERS.map((f) => {
          const active = value === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onChange(f.id)}
              className={[
                "rounded-full px-3 py-1 text-sm font-medium transition",
                active
                  ? "bg-indigo-600 text-white shadow hover:bg-indigo-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300",
              ].join(" ")}
              aria-pressed={active}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
        Pendientes: <b className="ml-1">{pendingCount}</b>
      </span>
    </div>
  );
};
