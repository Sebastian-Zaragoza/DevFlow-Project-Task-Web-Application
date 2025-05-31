import type {Task} from "../../types";
import {Menu} from "@headlessui/react";
import {Transition} from "@headlessui/react";
import {Fragment} from "react";
import {EllipsisVerticalIcon} from "@heroicons/react/16/solid";
import {useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTask} from "../../api/TaskApi.ts";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {EyeIcon} from "@heroicons/react/24/solid";
import {PencilIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/solid";

type TaskCardProps = {
    task: Task
}

function TaskCard({task}: TaskCardProps) {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: deleteTask,
        onError: (error) =>{
            toast.error(error.message)
        },
        onSuccess: (data) =>{
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            toast.success(data)
        }
    })

    return (
        <li className="p-5 bg-white border border-gray-200 rounded-lg flex justify-between items-start gap-4 hover:shadow-md transition-shadow">
            <div className="flex-1 min-w-0">
                <h4
                    className="text-xl font-semibold text-gray-900 truncate cursor-pointer"
                    onClick={() => navigate(`${location.pathname}?viewTask=${task._id}`)}
                >
                    {task.name}
                </h4>
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                    {task.description}
                </p>
            </div>

            <div className="flex-shrink-0">
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="p-2 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 rounded-full">
                        <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 focus:outline-none space-y-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => navigate(`${location.pathname}?viewTask=${task._id}`)}
                                        className={`${active ? 'bg-gray-100' : ''} flex items-center w-full px-4 py-3 text-sm text-gray-700 transition-colors`}
                                    >
                                        <EyeIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        Ver tarea
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => navigate(`${location.pathname}?editTask=${task._id}`)}
                                        className={`${active ? 'bg-gray-100' : ''} flex items-center w-full px-4 py-3 text-sm text-gray-700 transition-colors`}
                                    >
                                        <PencilIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        Editar tarea
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => mutate({ projectId: projectId!, taskId: task._id })}
                                        className={`${active ? 'bg-gray-100' : ''} flex items-center w-full px-4 py-3 text-sm text-red-600 transition-colors`}
                                    >
                                        <TrashIcon className="w-5 h-5 mr-2 text-red-600" />
                                        Eliminar tarea
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </li>
    );
}

export default TaskCard;