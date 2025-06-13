import {Link, useNavigate, useParams} from "react-router-dom";
import AddMember from "../../components/team/AddMember.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getProjectTeam, removeUser} from "../../api/TeamApi.ts";
import {Transition} from "@headlessui/react";
import {Menu} from "@headlessui/react";
import {Fragment} from "react";
import {EllipsisVerticalIcon} from "@heroicons/react/24/solid";
import {toast} from "react-toastify";

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

    if(isLoading) return 'Cargando...'
    if (data) return (
        <>
            <div className="min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <header className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            Administrar Equipo
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">Administra el equipo de trabajo para este proyecto</p>
                        <button
                            type="button"
                            onClick={() => navigate(`${location.pathname}?addMember=true`)}
                            className="inline-flex items-center mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-md shadow transition-colors"
                        >
                            Agregar colaborador
                        </button>
                        <Link to={`/projects/${projectId}`} className="inline-flex items-center mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-md shadow transition-colors ml-4"
                        >
                            Volver al proyecto
                        </Link>
                        <h2 className="text-4xl font-black mt-10 mb-2">Miembros actuales</h2>
                        {data.length ? (
                            <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                                {data?.map((member) => (
                                    <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                                        <div className="flex min-w-0 gap-x-4">
                                            <div className="min-w-0 flex-auto space-y-2">
                                                <p className="text-2xl font-black text-gray-600">
                                                    Nombre del usuario: {member.name}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    Email del usuario: {member.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-x-6">
                                            <Menu as="div" className="relative flex-none">
                                                <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                                    <span className="sr-only">opciones</span>
                                                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
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
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                                        <Menu.Item>
                                                            <button
                                                                type='button'
                                                                className='block px-3 py-1 text-sm leading-6 text-blue-600'
                                                                onClick={()=>mutate({projectId, userId: member._id})}
                                                            >
                                                                Eliminar del proyecto
                                                            </button>
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className='text-center py-20'>No hay miembros en este equipo</p>
                        )}
                        <AddMember/>
                    </header>
                </div>
            </div>
        </>
    );
}
