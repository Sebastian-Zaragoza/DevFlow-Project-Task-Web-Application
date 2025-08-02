import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { ForgotPasswordForm } from "../../types/auth.ts";
import ErrorMessage from "../../components/ErrorMessage.tsx";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../api/AuthApi.ts";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  const handleForgotPassword = (formData: ForgotPasswordForm) => {
    mutate(formData);
    reset();
  };

  return (
    <>
      <h1 className="text-3xl font-extrabold text-gray-900 text-center">
        Reset Password
      </h1>
      <p className="text-lg text-gray-600 mt-4 text-center">
        Complete the form to{" "}
        <span className="text-blue-600 font-semibold">
          reset your password
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="mt-8 space-y-6"
        noValidate
      >
        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@domain.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 rounded-lg shadow transition-colors"
        >
          Send Email
        </button>
      </form>

      <nav className="mt-8 flex flex-col space-y-3 text-center">
        <Link
          to="/auth/register"
          className="text-sm text-blue-600 hover:underline"
        >
          Don't have an account? Sign up
        </Link>
        <Link
          to="/auth/login"
          className="text-sm text-blue-600 hover:underline"
        >
          Already have an account? Log in
        </Link>
      </nav>
    </>
  );
}
