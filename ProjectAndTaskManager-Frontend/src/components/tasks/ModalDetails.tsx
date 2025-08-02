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
import NotesPanel from "../notes/NotesPanel.tsx";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


export const optionsStatus: { [key: string]: string } = {
  pending: "Pending",
  on_hold: "On Hold",
  in_progress: "In Progress",
  under_reviews: "Under Reviews",
  completed: "Completed",
};

export default function ModalDetails() {
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const querystring = new URLSearchParams(location.search);
  const taskId = querystring.get("viewTask")!;
  const show = taskId ? true : false;
  const navigate = useNavigate();
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
        .catch((e) => console.error("Error getting task:", e))
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
    mutate({ projectId, taskId, status });
  };

  const { data: user_data } = useQuery({
    queryKey: ["user_data_task", data?.user],
    queryFn: () => getUserById(data!.user!),
    enabled: Boolean(data?.user),
    staleTime: 1000 * 60,
  })

  if (isLoading || !data) return;

  const percentMap: Record<TaskStatus, number> = {
    pending:    0,
    on_hold:   25,
    in_progress: 50,
    under_reviews: 75,
    completed: 100,
  };

  const currentPercent = percentMap[data.status];
  const chartData = currentPercent === 100
      ? [{ name: 'Completed', value: 100 }]
      : [
        { name: 'Completed', value: currentPercent },
        { name: 'Remaining',   value: 100 - currentPercent },
      ];

  return (
        <Transition appear show={show} as={Fragment}>
          <Dialog
              as="div"
              className="fixed inset-0 z-50 overflow-y-auto"
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

            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden bg-white rounded-2xl shadow-xl ring-1 ring-black ring-opacity-5 p-8 sm:p-10">
                  <header className="flex items-start justify-between pb-4 mb-6 border-b border-gray-200">
                    <div>
                      <Dialog.Title className="text-2xl font-extrabold text-gray-900">
                        {data.name}
                      </Dialog.Title>
                      <p className="text-sm text-gray-500">
                        Added: {formatDate(data.createdAt)} · Updated: {formatDate(data.updatedAt)}
                      </p>
                    </div>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Description</h3>
                      <p className="text-gray-800">{data.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Collaborator Information</h3>
                      <p className="text-gray-800"><span className="font-semibold">Role:</span> {data.rol}</p>
                      <p className="text-gray-800"><span className="font-semibold">Name:</span> {user_data?.name}</p>
                      <p className="text-gray-800"><span className="font-semibold">Email:</span> {user_data?.email}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Dependency</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${loading ? 'bg-gray-100 text-gray-500' : relation ? relation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                    {loading
                        ? ''
                        : relation
                            ? relation.status === 'completed'
                                ? `Completed: ${relation.name}`
                                : `Not completed: ${relation.name}`
                            : 'Without dependencies'}
                  </span>
                    </div>
                  </div>

                  {data.completedBy.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ">

                        <div className="bg-white rounded-lg shadow-md p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                            Change History
                          </h3>
                          <ul className="space-y-4">
                            {data.completedBy.map((log) => (
                                <li key={log._id} className="flex items-center space-x-3">
                                  <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                                  <div>
                                    <p className="text-gray-800">
            <span className="font-semibold">
              {optionsStatus[log.status]}
            </span>{' '}
                                      por <span className="font-medium">{log.user.name}</span>
                                    </p>
                                  </div>
                                </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 w-full text-center">
                            Task Progress
                          </h4>
                          <div className="w-48 h-48 relative mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                    innerRadius="60%"
                                    outerRadius="100%"
                                    isAnimationActive={true}
                                    animationDuration={800}
                                    animationEasing="ease-out"
                                >
                                  <Cell fill="#2563EB" />
                                  {currentPercent < 100 && <Cell fill="#E5E7EB" />}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-700">
            {currentPercent}%
          </span>
                            </div>
                          </div>
                        </div>
                      </div>
                  )}

                  <section className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
                    <select
                        onChange={handleChange}
                        defaultValue={data.status}
                        disabled={relation && relation.status !== 'completed'}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {Object.entries(optionsStatus).map(([key, value]) => (
                          <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                  </section>

                  <section>
                    <NotesPanel notes={data.notes} relation={relation ?? null}/>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
    );
}
