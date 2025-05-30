import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import type {ForgotPasswordForm} from "../../types/auth.ts";
import ErrorMessage from "../../components/ErrorMessage.tsx"
import {useMutation} from "@tanstack/react-query"
import {forgotPassword} from "../../api/AuthApi.ts";
import {toast} from "react-toastify";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
        mutationFn: forgotPassword,
        onError: (error)=>{
            toast.error(error.message)
        },
        onSuccess: (data)=>{
            toast.success(data)
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => {
        mutate(formData)
        reset()
    }


    return (
        <>
            <h1 className="text-5xl font-black text-white">Reset Password</h1>
            <p className="text-2xl font-light text-white mt-5">
                Fill out the form to{' '}
                <span className="text-red-400 font-bold">reset your password</span>
            </p>
            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-8 p-10 mt-10 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Registry email"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Send email'
                    className="bg-red-500 hover:bg-red-600 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link to={'/auth/register'} className="text-center text-gray-300 font-normal">Don't have an account? Create one</Link>
                <Link to={'/auth/login'} className="text-center text-gray-300 font-normal">Do have an account? Login</Link>
            </nav>
        </>
    )
}