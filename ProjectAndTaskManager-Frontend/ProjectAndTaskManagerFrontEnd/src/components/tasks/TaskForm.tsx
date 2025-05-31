import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type {TaskFormData} from "../../types";
import ErrorMessage from "../ErrorMessage";
import {useState} from "react";
import {useEffect} from "react";
import api from "../../lib/axios.ts";
import {useLocation} from "react-router";

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
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const currentTaskId = query.get("editTask")

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const { data } = await api.get<Task[]>(`/projects/${projectId}/tasks`);
                setTasks(data)
            } finally {
                setLoadingTasks(false);
            }
        }
        loadTasks()
    }, [projectId])
    return (
        <>
            {/* Nombre de la tarea */}
            <div className="flex flex-col space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre de la tarea
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register('name', {
                        required: 'El nombre de la tarea es obligatorio',
                    })}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>

            {/* Descripción de la tarea */}
            <div className="flex flex-col space-y-1">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descripción de la tarea
                </label>
                <textarea
                    id="description"
                    rows={4}
                    placeholder="Descripción de la tarea"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register('description', {
                        required: 'La descripción de la tarea es obligatoria',
                    })}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            {/* Rol del usuario */}
            <div className="flex flex-col space-y-1">
                <label htmlFor="rol" className="block text-sm font-medium text-gray-700">
                    Rol del usuario
                </label>
                <select
                    id="rol"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register('rol', {
                        required: 'El rol es obligatorio',
                    })}
                    defaultValue=""
                >
                    <option value="" disabled>
                        Selecciona un rol
                    </option>
                    <option value="Diseñador">Diseñador</option>
                    <option value="Desarrollador">Desarrollador</option>
                    <option value="Testeador">Testeador</option>
                </select>
                {errors.rol && <ErrorMessage>{errors.rol.message}</ErrorMessage>}
            </div>

            {/* Correo del usuario */}
            <div className="flex flex-col space-y-1">
                <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                    Correo del usuario
                </label>
                <input
                    id="user"
                    type="text"
                    placeholder="Correo del usuario"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register('user', {
                        required: 'El nombre del usuario es obligatorio',
                    })}
                />
                {errors.user && <ErrorMessage>{errors.user.message}</ErrorMessage>}
            </div>

            {/* Dependencia de tareas */}
            <div className="flex flex-col space-y-1">
                <label htmlFor="relation" className="block text-sm font-medium text-gray-700">
                    Dependencia de tareas
                </label>
                <select
                    id="relation"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register('relation', {
                        required: 'Elige la tarea de la cual depende. Si no, selecciona \'Ninguna\'',
                    })}
                    defaultValue="Ninguna"
                    defaultChecked={loadingTasks}
                >
                    <option value="Ninguna">Ninguna</option>
                    {tasks
                        .filter((taskItem) => taskItem._id !== currentTaskId)
                        .map((taskItem) => (
                            <option key={taskItem._id} value={taskItem._id}>
                                {taskItem.name}
                            </option>
                        ))}
                </select>
                {errors.relation && <ErrorMessage>{errors.relation.message}</ErrorMessage>}
            </div>
        </>
    );
}