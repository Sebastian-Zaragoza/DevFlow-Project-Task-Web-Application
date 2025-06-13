import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { RequestConfirmationCodeForm } from "../../types/auth.ts";
import ErrorMessage from "../../components/ErrorMessage.tsx";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCode } from "../../api/AuthApi.ts";
import { toast } from "react-toastify";

export default function RequestNewCodeView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
    mutate(formData);
    reset();
  };
  return (
    <>
      <h1 className="text-3xl font-extrabold text-gray-900 text-center">
        Solicitar código de confirmación
      </h1>
      <p className="text-lg text-gray-600 mt-4 text-center">
        Ingresa tu correo para recibir{" "}
        <span className="text-blue-600 font-semibold">un nuevo código</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
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

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 rounded-lg shadow transition-colors"
        >
          Enviar código
        </button>
      </form>

      <nav className="mt-8 flex flex-col space-y-3 text-center">
        <Link
          to="/auth/login"
          className="text-sm text-blue-600 hover:underline"
        >
          ¿Ya tienes cuenta? Iniciar sesión
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
