import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {useLocation} from "react-router";
import {useNavigate} from "react-router-dom";
import TaskForm from "./TaskForm.tsx";
import {useForm} from "react-hook-form";
import type {TaskFormData} from "../../types";
import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {createTask} from "../../api/TaskApi.ts";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";

export default function AddTaskModal() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get("newTask")
    const show = modalTask ? true : false

    /**Extract the parameters of path, not ?..**/
    const params = useParams()
    const projectId = params.projectId!

    const initialValues:TaskFormData = {
        name: '',
        description: '',
        rol: '',
        user: '',
        relation: 'Ninguna'
    }

    const {register, handleSubmit, formState:{errors}, reset} = useForm({defaultValues: initialValues})
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createTask,
        onError: (error)=>{
            toast.error(error.message)
            console.log(error.message)
        },
        onSuccess: (data)=>{
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
        }
    })
    const handleCreateTask = (formData: TaskFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-blue-600">una tarea</span>
                                    </p>
                                    <form className="mt-10 space-y-3" noValidate onSubmit={handleSubmit(handleCreateTask)}>
                                        <TaskForm errors={errors} register={register}  projectId={projectId ?? ""} />
                                        <input type="submit" value="Guardar tarea" className="bg-blue-600 hover:bg-blue-700 w-full p-3
                                        text-white uppercase font-bold cursor-pointer transition-colors"/>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}