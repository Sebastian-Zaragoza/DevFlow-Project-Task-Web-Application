import {Fragment, useEffect, useState} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation } from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskById, updateStatus } from "../../api/TaskApi.ts";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/utils.ts";
import type { Task, TaskStatus } from "../../types";
import api from "../../lib/axios.ts";
import * as React from "react";
import {getUserById} from "../../api/AuthApi.ts";

export const optionsStatus: { [key: string]: string } = {
  pendiente: "Pendiente",
  en_espera: "En Espera",
  en_progreso: "En Progreso",
  en_revision: "En Revisión",
  completado: "Completado",
};

export default function ModalDetails() {
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const querystring = new URLSearchParams(location.search);
  const taskId = querystring.get("viewTask")!;
  const show = taskId ? true : false;

  const [relation, setRelation] = useState<Task>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!taskId) return;
    setLoading(true);
    setRelation(undefined);

    api.get<Task>(`/projects/${projectId}/tasks/${taskId}`)
        .then(({ data }) => {
          if (data.relation) {
            return api.get<Task>(
                `/projects/${projectId}/tasks/${data.relation}`
            );
          }
          return null;
        })
        .then((res) => {
          if (res) setRelation(res.data);
        })
        .catch((e) => console.error("Error al cargar la tarea:", e))
        .finally(() => setLoading(false));
  }, [projectId, taskId]);

  const { data, isLoading } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry: false,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;
    console.log(status);
    mutate({ projectId, taskId, status });
  };

  const { data: user_data } = useQuery({
    queryKey: ["user_data_task", data?.user],
    queryFn: () => getUserById(data!.user!),
    enabled: Boolean(data?.user),
    staleTime: 1000 * 60,
  })

  const navigate = useNavigate();
  if (isLoading) return 'Cargando...';
  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
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
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white border-l-4  transition-all p-8 sm:p-10 text-left">
                    <p className="text-sm text-gray-500 mb-1">
                      Agregada el: {formatDate(data.createdAt)}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Última actualización: {formatDate(data.updatedAt)}
                    </p>
                    <Dialog.Title className="text-3xl font-extrabold text-gray-900 mb-5">
                      {data.name}
                    </Dialog.Title>

                    <p className="text-lg text-gray-700 mb-3">
                      <span className="font-semibold">Descripción:</span>{" "}
                      {data.description}
                    </p>
                    <p className="text-lg text-gray-700 mb-3">
                      <span className="font-semibold">Role asignado:</span>{" "}
                      {data.rol}
                    </p>
                    <p className="text-lg text-gray-700 mb-3">
                      <span className="font-semibold">
                        Usuario responsable:
                      </span>{" "}
                      {`${user_data?.name} <${user_data?.email}>`}
                    </p>
                    <p
                      className={`text-lg mb-4 ${
                        relation
                          ? relation.status === "completado"
                            ? "text-green-500"
                            : "text-red-500"
                          : "text-gray-700"
                      }`}
                    >
                      {loading
                        ? "..."
                        : relation
                          ? relation.status === "completado"
                            ? `Tarea dependiente completada: ${relation.name}`
                            : `Tarea dependiente no completada: ${relation.name}`
                          : "Tarea sin dependencias"}
                    </p>
                    <p className="text-lg text-slate-500 mb-2">Historial de cambios</p>
                    {data.completedBy.map((activityLog) => (
                        <p key={activityLog._id}>
                            <span className="font-bold text-slate-600">
                              {optionsStatus[activityLog.status]}
                            </span>{" "}
                          por: {activityLog.user.name}
                        </p>
                    ))}

                    <div className="my-6 space-y-3">
                      <label className="block text-gray-800 font-semibold">
                        Estado Actual:
                      </label>
                      <select
                        onChange={handleChange}
                        defaultValue={data.status}
                        disabled={
                          relation &&
                          relation.status.toString() !== "completado"
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {Object.entries(optionsStatus).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
