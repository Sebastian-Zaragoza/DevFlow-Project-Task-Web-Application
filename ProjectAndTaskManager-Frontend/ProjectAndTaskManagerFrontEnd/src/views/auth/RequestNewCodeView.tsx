import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import type {RequestConfirmationCodeForm} from "../../types/auth.ts";
import ErrorMessage from "../../components/ErrorMessage.tsx"
import {useMutation} from "@tanstack/react-query"
import {requestConfirmationCode} from "../../api/AuthApi.ts";
import {toast} from "react-toastify";

export default function RequestNewCodeView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
        }
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
        mutate(formData)
        reset()
    };

    return (
        <>
            <h1 className="text-5xl font-black text-white">
                Request Confirmation Code
            </h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter your email to receive{' '}
                <span className="text-red-500 font-bold">a new code</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Registration Email"
                        className="w-full p-3 rounded-lg border-gray-300 border"
                        {...register("email", {
                            required: "Registration email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Send Code"
                    className="bg-red-500 hover:bg-red-600 w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link to="/auth/login" className="text-center text-gray-300 font-normal">
                    Already have an account? Log In
                </Link>
                <Link
                    to="/auth/forgot-password"
                    className="text-center text-gray-300 font-normal"
                >
                    Forgot your password? Reset
                </Link>
            </nav>
        </>
    );
}
