import type { ConfirmToken, NewPasswordFormToken } from "../../types/auth.ts";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage.tsx";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "../../api/AuthApi.ts";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
  token: ConfirmToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: NewPasswordFormToken = {
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate("/auth/login");
    },
  });
  const handleNewPassword = (formData: NewPasswordFormToken) => {
    const data = {
      formData,
      token,
    };
    mutate(data);
  };
  const password = watch("password");
  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="mt-8 space-y-6"
        noValidate
      >
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
              required: "La contraseña es requerida",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
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
            placeholder="Repite la contraseña"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            {...register("password_confirmation", {
              required: "Repite la misma contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no son iguales",
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
          Restablecer contraseña
        </button>
      </form>
    </>
  );
}
