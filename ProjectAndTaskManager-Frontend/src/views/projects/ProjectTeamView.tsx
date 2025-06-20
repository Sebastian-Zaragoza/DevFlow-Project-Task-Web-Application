import {Link, useNavigate, useParams} from "react-router-dom";
import AddMember from "../../components/team/AddMember.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getProjectTeam, removeUser} from "../../api/TeamApi.ts";
import {Transition} from "@headlessui/react";
import {Menu} from "@headlessui/react";
import {Fragment} from "react";
import {EllipsisVerticalIcon} from "@heroicons/react/24/solid";
import {toast} from "react-toastify";
import {UserIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/solid";

export default function ProjectTeamView() {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const {data, isLoading} = useQuery({
        queryKey:['projectTeam', projectId],
        queryFn: ()=>getProjectTeam(projectId),
        retry: false
    })

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: removeUser,
        onError: error => {
            toast.error(error.message);
        },
        onSuccess: data => {
            toast.success(data)
            navigate(location.pathname, {replace:true})
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
        }
    })
    if(isLoading) return
    if (data) return (
        <>
            <div className="min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <header className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            Administrar Equipo
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Administra el equipo de trabajo para este proyecto
                        </p>

                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                            <button
                                type="button"
                                onClick={() => navigate(`${location.pathname}?addMember=true`)}
                                className="w-full sm:w-auto inline-flex justify-center items-center
                         bg-blue-500 hover:bg-blue-600 text-white font-medium
                         px-5 py-2 rounded-md shadow transition-colors"
                            >
                                Agregar colaborador
                            </button>

                            <Link
                                to={`/projects/${projectId}`}
                                className="w-full sm:w-auto inline-flex justify-center items-center
                         bg-blue-500 hover:bg-blue-600 text-white font-medium
                         px-5 py-2 rounded-md shadow transition-colors text-center"
                            >
                                Volver al proyecto
                            </Link>
                        </div>

                        <h2 className="text-3xl font-black mt-10 mb-2">Miembros actuales</h2>

                        {data.length ? (
                            <div className="mt-6 bg-white rounded-lg shadow-md">
                                <ul role="list" className="divide-y divide-gray-200">
                                    {data.map(member => (
                                        <li
                                            key={member._id}
                                            className="relative flex items-start px-6 py-4"
                                        >
                                            <div className="flex-1 min-w-0 flex items-center space-x-4 pr-12">
                                                <div className="flex-shrink-0">
                                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                                        <UserIcon className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-lg font-semibold text-gray-900 truncate">
                                                        {member.name}
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-500 break-words whitespace-normal">
                                                        {member.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <Menu as="div" className="absolute top-4 right-6">
                                                <Menu.Button className="p-2 text-gray-500 hover:text-gray-700
                                 rounded-full hover:bg-gray-100 transition-colors">
                                                    <span className="sr-only">Abrir opciones</span>
                                                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                                                    <Menu.Items className="absolute right-0 mt-2 w-44 bg-white border
                                    border-gray-200 rounded-md shadow-lg ring-1
                                    ring-black ring-opacity-5 focus:outline-none z-50">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={() => mutate({ projectId, userId: member._id })}
                                                                    className={`flex items-center w-full px-4 py-2 text-sm 
                                font-medium rounded-md transition-colors ${
                                                                        active ? "bg-gray-100 text-red-600" : "text-red-600"
                                                                    }`}
                                                                >
                                                                    <TrashIcon className="w-5 h-5 mr-2" />
                                                                    Eliminar miembro
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="mt-10 text-center text-gray-500">
                                No hay miembros en este equipo
                            </p>
                        )}
                        <AddMember />
                    </header>
                </div>
            </div>
        </>
    );
}
