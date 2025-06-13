import { useForm } from "react-hook-form";
import type { UserRegistrationForm } from "../../types/auth.ts";
import ErrorMessage from "../../components/ErrorMessage.tsx";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../api/AuthApi.ts";
import { toast } from "react-toastify";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const password = watch("password");

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold text-gray-900 text-center">
        Crear cuenta
      </h1>
      <p className="text-lg text-gray-600 mt-4 text-center">
        Completa el formulario para{" "}
        <span className="text-blue-600 font-semibold">crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
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
              required: "El correo es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Correo inválido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Nombre de usuario
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
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
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "Debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password_confirmation"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Repetir contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite tu contraseña"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            {...register("password_confirmation", {
              required: "La confirmación es obligatoria",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 rounded-lg shadow transition-colors"
        >
          Registrarse
        </button>
      </form>

      <nav className="mt-8 flex flex-col space-y-3 text-center">
        <Link
          to="/auth/login"
          className="text-sm text-blue-600 hover:underline"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          ¿Olvidaste tu contraseña? Restablecer
        </Link>
      </nav>
    </>
  );
}
