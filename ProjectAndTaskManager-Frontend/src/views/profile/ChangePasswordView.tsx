import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage.tsx";
import type {UpdateUserPassword} from "../../types/auth.ts";
import {useMutation} from "@tanstack/react-query";
import {changePassword} from "../../api/ProfileApi.ts";
import {toast} from "react-toastify";

export default function ChangePasswordView() {
    const initialValues: UpdateUserPassword= {
        current_password: '',
        password: '',
        password_confirmation: ''
    }

    const { register, handleSubmit, watch, formState: { errors }, reset} = useForm({ defaultValues: initialValues })
    const {mutate} = useMutation({
        mutationFn: changePassword,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        }
    })
    const password = watch('password');
    const handleChangePassword = (formData: UpdateUserPassword) => {mutate(formData)}

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Cambiar Contraseña
                </h1>
                <p className="mt-2 text-lg text-gray-500">
                    Utiliza este formulario para cambiar tu contraseña
                </p>
            </header>

            <form
                onSubmit={handleSubmit(handleChangePassword)}
                noValidate
                className="bg-white rounded-lg shadow-md border-l-4 border-blue-600 p-8 space-y-6"
            >
                <div className="space-y-3">
                    <label
                        htmlFor="current_password"
                        className="text-sm uppercase font-bold"
                    >
                        Contraseña Actual
                    </label>
                    <input
                        id="current_password"
                        type="password"
                        placeholder="Contraseña actual"
                        className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("current_password", {
                            required: "La contraseña actual es obligatoria",
                        })}
                    />
                    {errors.current_password && (
                        <ErrorMessage>{errors.current_password.message}</ErrorMessage>
                    )}
                </div>

                <div className="space-y-3">
                    <label htmlFor="password" className="text-sm uppercase font-bold">
                        Nueva Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Nuevo contraseña"
                        className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("password", {
                            required: "La nueva contraseña es obligatoria",
                            minLength: {
                                value: 8,
                                message: "La contraseña debe ser mínimo de 8 caracteres",
                            },
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="space-y-3">
                    <label
                        htmlFor="password_confirmation"
                        className="text-sm uppercase font-bold"
                    >
                        Repetir Contraseña
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir contraseña"
                        className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("password_confirmation", {
                            required: "Este campo es obligatorio",
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow focus:outline-none transition-colors"
                >
                    Cambiar contraseña
                </button>
            </form>
        </div>
    );
}
