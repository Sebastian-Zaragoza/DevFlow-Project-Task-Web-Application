import { useForm } from "react-hook-form"
import type {UserLoginForm} from "../../types/auth.ts";
import ErrorMessage from "../../components/ErrorMessage.tsx"
import {Link, useNavigate} from "react-router-dom"
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";
import {authenticateUser} from "../../api/AuthApi.ts";


export default function LoginView() {

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const navigate = useNavigate()

    const {mutate} = useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: ()=>{
            navigate('/')
        }
    })

    const handleLogin = (formData: UserLoginForm) => {
        mutate(formData)
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Login</h1>
            <p className="text-2xl font-light text-white mt-5">
                Fill out the form to{' '}
                <span className="text-red-400 font-bold">login</span>
            </p>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 mt-10 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Registration email"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail invalid",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Registration password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Login'
                    className="bg-red-500 hover:bg-red-600 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link to={'/auth/register'} className="text-center text-gray-300 font-normal">Don't have an account? Create one</Link>
                <Link to={'/auth/forgot-password'} className="text-center text-gray-300 font-normal">Don't remember the password? Reset</Link>
                <Link to={'/auth/request-code'} className="text-center text-gray-300 font-normal">Don't have confirm your account? Click here</Link>
            </nav>
        </>
    )
}