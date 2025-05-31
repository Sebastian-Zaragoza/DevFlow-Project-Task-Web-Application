import ErrorMessage from "../ErrorMessage.tsx";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProjectFormData } from "../../types";

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>;
    errors: FieldErrors<ProjectFormData>;
};

export default function ProjectForm({ register, errors }: ProjectFormProps) {
    return (
        <div className="space-y-6">
            <div>
                <label
                    htmlFor="projectName"
                    className="block text-sm font-semibold text-gray-700 mb-1 uppercase"
                >
                    Nombre del proyecto
                </label>
                <input
                    id="projectName"
                    type="text"
                    placeholder="Ingresa el nombre del proyecto"
                    className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("projectName", {
                        required: "El nombre del proyecto es requerido",
                    })}
                />
                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div>
                <label
                    htmlFor="clientName"
                    className="block text-sm font-semibold text-gray-700 mb-1 uppercase"
                >
                    Nombre del cliente
                </label>
                <input
                    id="clientName"
                    type="text"
                    placeholder="Ingresa el nombre del cliente"
                    className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("clientName", {
                        required: "El nombre del cliente es requerido",
                    })}
                />
                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700 mb-1 uppercase"
                >
                    Descripción
                </label>
                <textarea
                    id="description"
                    rows={4}
                    placeholder="Describe brevemente el proyecto"
                    className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("description", {
                        required: "La descripción del proyecto es requerida",
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </div>
    );
}