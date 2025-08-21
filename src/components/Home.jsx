import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white pt-24">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-lg">
        Curso React <span className="text-blue-600">Tareas</span>
      </h1>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link to="/todo">
          <button
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Ir al Todo List
          </button>
        </Link>
        <Link to="/form-register">
          <button
            className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-base font-semibold rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Formulario de Registro
          </button>
        </Link>
      </div>
    </div>
  );
};


