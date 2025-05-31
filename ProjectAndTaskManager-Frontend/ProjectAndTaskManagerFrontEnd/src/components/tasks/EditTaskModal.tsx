import {Fragment} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {useNavigate} from "react-router-dom";
import type {Task, TaskFormData} from "../../types";
import {useForm} from "react-hook-form";
import TaskForm from "./TaskForm.tsx";
import {useParams} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateTask} from "../../api/TaskApi.ts";
import {toast} from "react-toastify";

type EditTaskModalProps = {
    data: Task,
    taskId: Task['_id']
}

export default function EditTaskModal({data, taskId}: EditTaskModalProps) {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!
    const {register, handleSubmit, formState:{errors}, reset} = useForm<TaskFormData>({defaultValues:
            {
                name: data.name,
                description: data.description,
                rol: data.rol,
                user: data.user,
                relation: data.relation
            }
    })
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
        }
    })

    const handleEditTask = (formData: TaskFormData) => {
        const data = {
            projectId,
            taskId,
            formData
        }
        mutate(data)
    }
    return (
        <Transition appear show as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => navigate(location.pathname, { replace: true })}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white border-l-4  shadow-xl transition-all p-8 sm:p-10 text-left">
                                <Dialog.Title className="text-3xl font-extrabold text-gray-900 mb-4">
                                    Editar Tarea
                                </Dialog.Title>
                                <p className="text-gray-700 mb-6">
                                    Realiza cambios a la tarea usando el siguiente formulario:
                                </p>

                                <form onSubmit={handleSubmit(handleEditTask)} noValidate className="space-y-6">
                                    <TaskForm projectId={projectId!} register={register} errors={errors} />
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow focus:outline-none transition-colors"
                                    >
                                        Guardar Cambios
                                    </button>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );

}