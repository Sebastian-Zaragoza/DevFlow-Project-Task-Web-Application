import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import type {User, UserProfileForm} from "../../types/auth.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateProfile} from "../../api/ProfileApi.ts";
import {toast} from "react-toastify";

type ProfileFormProps = {
    data: User;
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })
    const query = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: updateProfile,
        onError: (error) =>{
            toast.error(error.message)
        },
        onSuccess: (data) =>{
            toast.success(data);
            query.invalidateQueries({queryKey: ['user']})
        }
    })

    const handleEditProfile = (formData: UserProfileForm) => {
        mutate(formData)
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    My Profile
                </h1>
                <p className="mt-2 text-lg text-gray-500">
                    Here you can update your information
                </p>
            </header>

            <form
                onSubmit={handleSubmit(handleEditProfile)}
                noValidate
                className="bg-white rounded-lg shadow-md border-l-4 border-blue-600 p-8 space-y-6"
            >
                <div className="space-y-3">
                    <label
                        htmlFor="name"
                        className="text-sm uppercase font-bold"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("name", {
                            required: "Username is required",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="space-y-3">
                    <label
                        htmlFor="email"
                        className="text-sm uppercase font-bold"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow focus:outline-none transition-colors"
                >
                    Save Changes
                </button>
            </form>
        </div>
    )

}
