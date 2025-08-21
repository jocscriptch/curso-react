import { useReducer, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const initialState = {
	name: "",
	email: "",
	birthdate: "",
	username: "",
	password: "",
	errors: {},
};

const isDateBeforeToday = (dateStr) => {
	const today = new Date();
	today.setHours(0,0,0,0);
	const date = new Date(dateStr + 'T00:00:00');
	return date < today;
};

function validate({ name, email, birthdate, username, password }) {
	const rules = [
		{
			field: "name",
			valid: /^\w{2,}(\s\w{2,})+$/.test(name),
			message: "Nombre completo requerido (mínimo 2 palabras)"
		},
		{
			field: "email",
			valid: /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email),
			message: "Correo electrónico inválido"
		},
		{
			field: "birthdate",
			valid: !!birthdate,
			message: "Fecha de nacimiento requerida"
		},
		{
			field: "username",
			valid: /^[a-zA-Z0-9_]{4,}$/.test(username),
			message: "Usuario mínimo 4 caracteres, solo letras, números o _"
		},
		{
			field: "password",
			valid: /^.{6,}$/.test(password),
			message: "Contraseña mínimo 6 caracteres"
		}
	];
	const errors = {};
	rules.forEach(({ field, valid, message }) => {
		if (!valid) errors[field] = message;
	});

	if (birthdate && !isDateBeforeToday(birthdate)) {
		errors.birthdate = "La fecha de nacimiento no puede ser hoy ni una fecha futura";
	}
	return errors;
}

function reducer(state, action) {
	switch (action.type) {
		case "CHANGE":
			return { ...state, [action.field]: action.value };
		case "RESET":
			return { ...initialState };
		case "SET_ERRORS":
			return { ...state, errors: action.errors };
		default:
			return state;
	}
}


export const RegisterForm = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [records, setRecords] = useLocalStorage("register-records", []);
	const [showModal, setShowModal] = useState(false);
	const { name, email, birthdate, username, password, errors } = state;

	const handleChange = (e) => {
		dispatch({ type: "CHANGE", field: e.target.name, value: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validation = validate(state);
		if (Object.keys(validation).length > 0) {
			dispatch({ type: "SET_ERRORS", errors: validation });
			return;
		}
		setRecords((prev) => [
			...prev,
			{ name, email, birthdate, username, password },
		]);
		dispatch({ type: "RESET" });
		setShowModal(false);
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-start pt-16 bg-white">
			<div className="w-full max-w-5xl mx-auto">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-bold text-blue-700">Registros de usuarios</h2>
								<button
									className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition shadow"
									onClick={() => {
										dispatch({ type: "SET_ERRORS", errors: {} });
										setShowModal(true);
									}}
								>
									+ Agregar nuevo
								</button>
				</div>
				   <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-white">
					   <table className="w-full text-center">
						   <thead>
							   <tr className="bg-blue-100/80">
								   <th className="px-8 py-3 text-sm font-bold text-black tracking-wide rounded-tl-2xl">Nombre</th>
								   <th className="px-8 py-3 text-sm font-bold text-black tracking-wide">Correo</th>
								   <th className="px-8 py-3 text-sm font-bold text-black tracking-wide">Fecha de nacimiento</th>
								   <th className="px-8 py-3 text-sm font-bold text-black tracking-wide">Usuario</th>
								   <th className="px-8 py-3 text-sm font-bold text-black tracking-wide rounded-tr-2xl">Contraseña</th>
							   </tr>
						   </thead>
						   <tbody>
							   {records.length === 0 ? (
								   <tr>
									   <td colSpan={5} className="py-8 text-gray-400 text-base">Sin registros.</td>
								   </tr>
							   ) : (
								   records.map((r, i) => (
									   <tr key={i} className={
										   `border-b last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-blue-50/60'} hover:bg-blue-100/60 transition`}
									   >
										   <td className="px-8 py-3 font-medium text-gray-700 text-sm">{r.name}</td>
										   <td className="px-8 py-3 text-gray-700 text-sm">{r.email}</td>
										   <td className="px-8 py-3 text-gray-700 text-sm">{r.birthdate}</td>
										   <td className="px-8 py-3 text-gray-700 text-sm">{r.username}</td>
										   <td className="px-8 py-3 text-gray-700 text-sm">{r.password}</td>
									   </tr>
								   ))
							   )}
						   </tbody>
					   </table>
				   </div>
			</div>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
					<div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
						<button
							className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
							onClick={() => setShowModal(false)}
							aria-label="Close"
						>
							&times;
						</button>
						<h3 className="text-xl font-bold mb-4 text-blue-700">Agregar nuevo usuario</h3>
						<form onSubmit={handleSubmit} className="space-y-4">
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
								/>
								{errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
							</div>
							<button
								type="submit"
								className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
							>
								Guardar
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};
