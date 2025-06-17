import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import type {User, UserProfileForm} from "../../types/auth.ts";

type ProfileFormProps = {
    data: User;
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    const handleEditProfile = (formData: UserProfileForm) => {
        console.log(formData)
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Mi Perfil
                </h1>
                <p className="mt-2 text-lg text-gray-500">
                    Aquí puedes actualizar tu información
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
                        Nombre
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("name", {
                            required: "Nombre de usuario es obligatorio",
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
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Tu Email"
                        className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("email", {
                            required: "El e-mail es obligatorio",
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

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow focus:outline-none transition-colors"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    )

}
