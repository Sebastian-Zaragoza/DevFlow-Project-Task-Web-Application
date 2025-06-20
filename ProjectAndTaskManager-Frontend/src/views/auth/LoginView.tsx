import { useForm } from "react-hook-form";
import type { UserLoginForm } from "../../types/auth.ts";
import ErrorMessage from "../../components/ErrorMessage.tsx";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "../../api/AuthApi.ts";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold text-gray-900 text-center">
        Inicio de sesión
      </h1>
      <p className="text-lg text-gray-600 text-center">
        Llena el formulario para{" "}
        <span className="text-blue-600 font-semibold">iniciar sesión</span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-8 space-y-6"
        noValidate
      >
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="ejemplo@dominio.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Correo electrónico inválido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Nueva contraseña (min 8 caracteres)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            {...register("password", {
              required: "Contraseña es requerida",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 rounded-lg shadow transition-colors"
        >
          Iniciar sesión
        </button>
      </form>

      <nav className="mt-8 flex flex-col space-y-3 text-center">
        <Link
          to="/auth/register"
          className="text-sm text-blue-600 hover:underline"
        >
          ¿No tienes cuenta? Regístrate
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          ¿Olvidaste tu contraseña? Restablecer
        </Link>
        <Link
          to="/auth/request-code"
          className="text-sm text-blue-600 hover:underline"
        >
          ¿No has confirmado tu cuenta? Confirmar
        </Link>
      </nav>
    </>
  );
}
