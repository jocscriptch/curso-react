export const UserTable = ({ data, onEdit, onDelete, formatDateDMY }) => (
  <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-white">
    <table className="w-full text-center">
      <thead>
        <tr className="bg-blue-100/80">
          <th className="px-8 py-3 text-sm font-bold text-black tracking-wide rounded-tl-2xl">Nombre</th>
          <th className="px-8 py-3 text-sm font-bold text-black tracking-wide">Correo</th>
          <th className="px-8 py-3 text-sm font-bold text-black tracking-wide">Fecha de nacimiento</th>
          <th className="px-8 py-3 text-sm font-bold text-black tracking-wide">Usuario</th>
          <th className="px-2 py-3 text-sm font-bold text-black tracking-wide w-24">Contraseña</th>
          <th className="px-8 py-3 text-sm font-bold text-black tracking-wide rounded-tr-2xl">Acción</th>
        </tr>
      </thead>
      <tbody>
        {!data || data.length === 0 ? (
          <tr>
            <td colSpan={6} className="py-8 text-gray-400 text-base">Sin registros.</td>
          </tr>
        ) : (
          data.map((r, i) => (
            <tr key={r._id || i} className={`border-b last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-blue-50/60'} hover:bg-blue-100/60 transition`}>
              <td className="px-8 py-3 font-medium text-gray-700 text-sm">{r.name}</td>
              <td className="px-8 py-3 text-gray-700 text-sm">{r.email}</td>
              <td className="px-8 py-3 text-gray-700 text-sm">{formatDateDMY(r.birthdate || r.dob)}</td>
              <td className="px-8 py-3 text-gray-700 text-sm">{r.username}</td>
              <td className="px-2 py-3 text-gray-700 text-sm w-24">*****</td>
              <td className="px-8 py-3 flex gap-2 justify-center items-center">
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded transition text-xs"
                  title="Editar"
                  onClick={() => onEdit(r)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition text-xs"
                  title="Borrar"
                  onClick={() => onDelete(r)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
