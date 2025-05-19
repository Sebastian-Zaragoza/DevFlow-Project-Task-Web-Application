import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type {TaskFormData} from "../../types";
import ErrorMessage from "../ErrorMessage";
import {useState} from "react";
import {useEffect} from "react";
import api from "../../lib/axios.ts";

type TaskFormProps = {
    projectId: string
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

type Task = {
    _id: string,
    name: string
}

export default function TaskForm({errors, register, projectId} : TaskFormProps) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loadingTasks, setLoadingTasks] = useState<boolean>(true)

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const { data } = await api.get<Task[]>(`/projects/${projectId}/tasks`);
                setTasks(data)
            } catch (error) {
                console.error("Error al cargar tareas:", error)
            } finally {
                setLoadingTasks(false);
            }
        }
        loadTasks()
    }, [projectId])
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >Nombre de la tarea</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full p-3  border-gray-300 border"
                    {...register("name", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Descripción de la tarea</label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className="w-full p-3  border-gray-300 border"
                    {...register("description", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="rol"
                >
                    Rol del usuario
                </label>
                <select
                    id="rol"
                    className="w-full p-3 border-gray-300 border"
                    {...register("rol", {
                        required: "El rol es obligatorio",
                    })}
                    defaultValue=""
                >
                    <option value="" disabled>Selecciona un rol</option>
                    <option value="Diseñador">Diseñador</option>
                    <option value="Desarrollador">Desarrollador</option>
                    <option value="Testeador">Testeador</option>
                </select>
                {errors.rol && (
                    <ErrorMessage>{errors.rol.message}</ErrorMessage>
                )}
            </div>


            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="user"
                >Correo del usuario</label>
                <input
                    id="user"
                    type="text"
                    placeholder="Nombre del usuario"
                    className="w-full p-3  border-gray-300 border"
                    {...register("user", {
                        required: "El nombre del usuario es obligatorio",
                    })}
                />
                {errors.user && (
                    <ErrorMessage>{errors.user.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label className="font-normal text-2xl" htmlFor="relation">
                    Dependencia de tareas
                </label>
                <select
                    id="relation"
                    className="w-full p-3 border-gray-300 border"
                    {...register("relation", {
                        required:
                            "Elige la tarea de la cual depende. Si no, selecciona 'Ninguna'",
                    })}
                    defaultValue="Ninguna"
                    disabled={loadingTasks}
                >
                    <option value="Ninguna">Ninguna</option>

                    {tasks.map((task) => (
                        <option key={task._id} value={task._id}>
                            {task.name}
                        </option>
                    ))}
                </select>
                {errors.relation && (
                    <ErrorMessage>{errors.relation.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}