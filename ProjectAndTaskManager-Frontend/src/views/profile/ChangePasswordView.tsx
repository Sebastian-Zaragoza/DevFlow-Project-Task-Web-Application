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
                    Change Password
                </h1>
                <p className="mt-2 text-lg text-gray-500">
                    Use this form to change your password
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
                        Current Password
                    </label>
                    <input
                        id="current_password"
                        type="password"
                        placeholder="Current password"
                        className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("current_password", {
                            required: "Current password is required",
                        })}
                    />
                    {errors.current_password && (
                        <ErrorMessage>{errors.current_password.message}</ErrorMessage>
                    )}
                </div>

                <div className="space-y-3">
                    <label htmlFor="password" className="text-sm uppercase font-bold">
                        New Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="New password"
                        className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("password", {
                            required: "New password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
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
                        Confirm Password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Confirm password"
                        className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("password_confirmation", {
                            required: "This field is required",
                            validate: (value) =>
                                value === password || "Passwords do not match",
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
                    Change password
                </button>
            </form>
        </div>
    );
}
