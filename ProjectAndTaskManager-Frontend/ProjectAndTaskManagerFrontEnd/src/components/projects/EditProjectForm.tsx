import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm.tsx";
import type { Project, ProjectFormData } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../api/ProjectApi.ts";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data: ProjectFormData;
    projectId: Project["_id"];
};

export default function EditProjectForm({ data, projectId }: EditProjectFormProps) {
    const initialValues: ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormData>({ defaultValues: initialValues });

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error: any) => {
            toast.error(error.message);
        },
        onSuccess: (msg: any) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
            toast.success(msg);
            navigate("/");
        },
    });

    const onSubmit = (formData: ProjectFormData) => {
        mutate({ formData, projectId });
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">Editar Proyecto</h1>
                <p className="mt-2 text-lg text-gray-500">
                    Edita la información del proyecto
                </p>
                <Link
                    to="/"
                    className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-md shadow transition-colors"
                >
                    Regresar a Proyectos
                </Link>
            </header>

            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="bg-white rounded-lg shadow-md border-l-4 border-blue-600 p-8 space-y-6"
            >
                <ProjectForm register={register} errors={errors} />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow focus:outline-none transition-colors"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    );
}
