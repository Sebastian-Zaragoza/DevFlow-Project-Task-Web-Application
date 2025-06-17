import {Link, Navigate} from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, deleteProject } from "../api/ProjectApi.ts";
import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { toast } from "react-toastify";
import {useAuth} from "../hooks/useAuth.ts";

export default function DashboardView() {
  const {data: user} = useAuth();

  const { data, isError} = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: (msg: any) => {
      toast.success(msg);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
  if (isError) return <Navigate to="/404" replace />;
  if (data && user) return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Mis proyectos
            </h1>
            <p className="mt-1 text-lg text-gray-600">
              Gestiona y administra tus proyectos
            </p>
          </div>
          <Link
            to="/projects/create"
            className="mt-3 sm:mt-0 inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-md shadow transition-colors"
          >
            Crear proyecto
          </Link>
        </header>

        {data && data.length > 0 ? (
          <div className="mt-8 space-y-6">
            {data.map((project: any) => (
              <div
                key={project._id}
                className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150"
              >
                <div className="flex">
                  <div className="w-1 bg-blue-500 rounded-l-lg" />
                  <div className="flex-1 px-6 py-5">
                    {
                      project.manager === user._id?
                          <p className="font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500
                          rounded-lg inline-block py-2 mb-4 px-5">Administrador</p> :
                          <p className="font-bold text-xs uppercase bg-purple-50 text-purple-500 border-2 border-purple-500
                          rounded-lg inline-block py-2 mb-4 px-5">Colaborador</p>
                    }
                    <div className="flex justify-between items-start">
                      <Link
                        to={`/projects/${project._id}`}
                        className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {project.projectName}
                      </Link>
                      <Menu
                        as="div"
                        className="relative inline-block text-left z-10"
                      >
                        <Menu.Button className="p-1 text-gray-500 hover:text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <EllipsisVerticalIcon className="h-6 w-6" />
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
                          <Menu.Items className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                            {project.manager === user._id &&(
                                <>
                                  <div className="py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                          <Link
                                              to={`/projects/${project._id}`}
                                              className={`${active ? "bg-gray-100" : ""} flex items-center px-4 py-3 text-sm text-gray-700`}
                                          >
                                            <EyeIcon className="w-5 h-5 mr-2 text-gray-500" />
                                            Ver proyecto
                                          </Link>
                                      )}
                                    </Menu.Item>
                                  </div>
                                  <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to={`/projects/${project._id}/edit`}
                                            className={`${active ? "bg-gray-100" : ""} flex items-center px-4 py-3 text-sm text-gray-700`}
                                        >
                                          <PencilIcon className="w-5 h-5 mr-2 text-gray-500" />
                                          Editar proyecto
                                        </Link>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => mutate(project._id)}
                                            className={`${active ? "bg-gray-100" : ""} flex items-center w-full px-4 py-3 text-sm text-blue-600`}
                                        >
                                          <TrashIcon className="w-5 h-5 mr-2 text-blue-600" />
                                          Eliminar proyecto
                                        </button>
                                    )}
                                  </Menu.Item>
                                </>
                            )}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-800">
                          Cliente:
                        </span>{" "}
                        {project.clientName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-800">
                          Descripción:
                        </span>{" "}
                        {project.description || "(Sin descripción)"}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 ">
                      <Link
                        to={`/projects/${project._id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-gray-500">
            No existe ningún proyecto. ¡Crea uno nuevo!
          </p>
        )}
      </div>
    </div>
  );
}
