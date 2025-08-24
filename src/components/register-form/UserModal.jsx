export const UserModal = ({
  show,
  onClose,
  onSubmit,
  state,
  handleChange,
  editId,
  errors
}) => {
  if (!show) return null;
  const { name, email, birthdate, username, password } = state;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold mb-4 text-blue-700">
          {editId ? "Editar usuario" : "Agregar nuevo usuario"}
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Nombre completo</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1"
              name="name"
              value={name}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block font-semibold">Correo electrónico</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block font-semibold">Fecha de nacimiento</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1"
              type="date"
              name="birthdate"
              value={birthdate}
              onChange={handleChange}
            />
            {errors.birthdate && <p className="text-red-500 text-sm">{errors.birthdate}</p>}
          </div>
          <div>
            <label className="block font-semibold">Usuario</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1"
              name="username"
              value={username}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div>
            <label className="block font-semibold">Contraseña</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              autoComplete="off"
              placeholder={editId ? "Dejar en blanco para no cambiar" : ""}
            />
            {editId && <p className="text-gray-400 text-xs">Dejar en blanco para no cambiar la contraseña</p>}
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
          >
            {editId ? "Actualizar" : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
};

