import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "../../api/AuthApi.ts";
import { toast } from "react-toastify";
import type { ConfirmToken } from "../../types/auth.ts";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/auth/login");
    },
  });

  const handleComplete = (token: ConfirmToken["token"]) => {
    mutate({ token });
  };
  return (
    <>
      <h1 className="text-3xl font-extrabold text-gray-900 text-center">
        Confirmar cuenta
      </h1>
      <p className="text-lg text-gray-600 mt-4 text-center">
        Ingresa el código que recibiste{" "}
        <span className="text-blue-600 font-semibold">vía email</span>
      </p>

      <form className="mt-8 space-y-6" noValidate>
        <label className="text-sm font-medium text-gray-700 mb-1 block text-center">
          Código de 6 dígitos
        </label>

        <div className="flex justify-center gap-4">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-12 h-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-xl" />
            <PinInputField className="w-12 h-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-xl" />
            <PinInputField className="w-12 h-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-xl" />
            <PinInputField className="w-12 h-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-xl" />
            <PinInputField className="w-12 h-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-xl" />
            <PinInputField className="w-12 h-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-xl" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-8 flex flex-col space-y-3 text-center">
        <Link
          to="/auth/request-code"
          className="text-sm text-blue-600 hover:underline"
        >
          Solicitar un nuevo código
        </Link>
      </nav>
    </>
  );
}
