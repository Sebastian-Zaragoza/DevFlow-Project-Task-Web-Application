import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import type { TeamMemberForm } from "../../types/team";
import {findUserByEmail} from "../../api/TeamApi.ts";
import SearchResult from "./SearchResult.tsx";
import type {TeamMember} from "../../types/team";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation<
        TeamMember,
        Error,
        { projectId: string; formData: TeamMemberForm }
    >({
        // @ts-ignore
        mutationFn: findUserByEmail
    });

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = {projectId, formData}
        mutation.mutate(data)
    }

    const resetData = () => {
        reset();
        mutation.reset();
    }
    return (
        <>
            <form
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
                className="space-y-6"
            >
                <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="text-2xl font-normal text-gray-800">
                        Email de usuario
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="usuario@correo.com"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: { value: /\S+@\S+\.\S+/, message: "E-mail no válido" },
                        })}
                    />

                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow transition-colors disabled:opacity-60"
                >
                    Buscar usuario
                </button>
            </form>
            <div className="mt-10">
                {mutation.isPending && <p className="text-center"></p>}
                {mutation.isError && <p className="text-center"><ErrorMessage>Usuario no encontrado</ErrorMessage></p>}
                {mutation.data && <SearchResult user={mutation.data} reset={resetData}/>}
            </div>
        </>
    );
}
