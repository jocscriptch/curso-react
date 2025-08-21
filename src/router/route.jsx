import { createBrowserRouter } from "react-router-dom";
import { Home } from "../components/Home";
import { App as TodoApp } from "../App";
import { RegisterForm } from "../components/register-form/RegisterForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/todo",
    element: <TodoApp />,
  },
  {
    path: "/form-register",
  element: <RegisterForm />,
  },
]);
