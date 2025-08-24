import { useReducer, useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import {UserTable} from "./UserTable";
import {UserModal} from "./UserModal";

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
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateStr + "T00:00:00");
  return date < today;
};

const formatDateDMY = (iso) => {
  if (!iso) return '';
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
};

function validate({ name, email, birthdate, username, password }, isEdit) {
  const rules = [
    {
      field: "name",
      valid: /^\w{2,}(\s\w{2,})+$/.test(name),
      message: "Nombre completo requerido (mínimo 2 palabras)",
    },
    {
      field: "email",
      valid: /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email),
      message: "Correo electrónico inválido",
    },
    {
      field: "birthdate",
      valid: !!birthdate,
      message: "Fecha de nacimiento requerida",
    },
    {
      field: "username",
      valid: /^[a-zA-Z0-9_]{4,}$/.test(username),
      message: "Usuario mínimo 4 caracteres, solo letras, números o _",
    },
  ];

  if (!isEdit || password) {
    rules.push({
      field: "password",
      valid: /^.{6,}$/.test(password),
      message: "Contraseña mínimo 6 caracteres",
    });
  }
  const errors = {};
  rules.forEach(({ field, valid, message }) => {
    if (!valid) errors[field] = message;
  });
  if (birthdate && !isDateBeforeToday(birthdate)) {
    errors.birthdate =
      "La fecha de nacimiento no puede ser hoy ni una fecha futura";
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
  const { data, getAll, create, update, remove } = useApi("users");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const { name, email, birthdate, username, password, errors } = state;

  const handleChange = (e) => {
    dispatch({ type: "CHANGE", field: e.target.name, value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!editId;
    const validation = validate(state, isEdit);
    if (Object.keys(validation).length > 0) {
      dispatch({ type: "SET_ERRORS", errors: validation });
      return;
    }
    if (isEdit) {
      const updateBody = { name, email, dob: birthdate, username };
      if (password) updateBody.password = password;
      await update(editId, updateBody);
    } else {
      await create({ name, email, dob: birthdate, username, password });
    }
    getAll();
    dispatch({ type: "RESET" });
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (user) => {
    dispatch({ type: "CHANGE", field: "name", value: user.name });
    dispatch({ type: "CHANGE", field: "email", value: user.email });
    dispatch({
      type: "CHANGE",
      field: "birthdate",
      value: user.birthdate || user.dob ? new Date(user.birthdate || user.dob).toISOString().slice(0, 10) : "",
    });
    dispatch({ type: "CHANGE", field: "username", value: user.username });
    dispatch({ type: "CHANGE", field: "password", value: "" });
    dispatch({ type: "SET_ERRORS", errors: {} });
    setEditId(user._id);
    setShowModal(true);
  };


  const handleDelete = async (user) => {
    if (window.confirm("¿Seguro que deseas borrar este usuario?")) {
      await remove(user._id);
      getAll();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 bg-white">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-blue-700">Registros de usuarios</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition shadow"
            onClick={() => {
              dispatch({ type: "RESET" });
              setEditId(null);
              setShowModal(true);
            }}
          >
            + Agregar nuevo
          </button>
        </div>
        <UserTable
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          formatDateDMY={formatDateDMY}
        />
      </div>
      <UserModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        state={state}
        handleChange={handleChange}
        editId={editId}
        errors={errors}
      />
    </div>
  );
};
