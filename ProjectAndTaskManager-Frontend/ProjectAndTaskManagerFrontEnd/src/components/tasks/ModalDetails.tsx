import {Fragment, useEffect, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {useLocation} from "react-router";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getTaskById, updateStatus} from "../../api/TaskApi.ts";
import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";
import {formatDate} from "../../utils/utils.ts";
import type {Task, TaskStatus} from "../../types";
import api from "../../lib/axios.ts";
import * as React from "react";

export const optionsStatus: {[key: string] : string} = {
    pendiente: "Pendiente",
    completado: "Completado",
    en_espera: "En Espera",
    en_progreso: "En Progreso",
    en_revision: "En Revisión"
}

export default function ModalDetails() {
    const params = useParams()
    const projectId = params.projectId!
    const location = useLocation()
    const querystring = new URLSearchParams(location.search)
    const taskId = querystring.get('viewTask')!
    const show = taskId ? true : false

    const [relation, setRelation] = useState<Task>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const loadRelation = async () => {
            setRelation(undefined)
            setLoading(true)

            try {
                const task = await api.get<Task>(`/projects/${projectId}/tasks/${taskId}`)
                if (task.data.relation) {
                    const { data: relatedTask } = await api.get<Task>(`/projects/${projectId}/tasks/${task.data.relation}`);
                    setRelation(relatedTask);
                }
            } catch (error) {
                console.error("Error loading related task:", error)
            } finally {
                setLoading(false)
            }
        }

        loadRelation();
    }, [projectId, taskId])

    const {data, isError} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus
        console.log(status)
        mutate({projectId, taskId, status})
    }

    const navigate = useNavigate()
    if (isError){
        toast.error('Tarea no encontrada', {toastId:'error'})
        return <Navigate to={`/projects/${projectId}`}/>
    }

    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace:true})}>
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
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)} </p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>
                                    <p className='text-lg text-slate-500 mb-2'>Role asignado: {data.rol}</p>
                                    <p className='text-lg text-slate-500 mb-2'>Usuario responsable: {data.user}</p>
                                    <p
                                        className={`text-lg mb-2 ${
                                            relation
                                                ? relation.status === 'completado'
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                : 'text-slate-500'
                                        }`}
                                    >
                                        {loading
                                            ? '...'
                                            : relation
                                                ? relation.status === 'completado'
                                                    ? `Tarea dependiente completada: ${relation.name}`
                                                    : `Tarea dependiente no completada: ${relation.name}`
                                                : 'Tarea sin dependencias'}
                                    </p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual: </label>
                                        <select
                                            onChange={handleChange}
                                            className="w-full p-3 bg-white border border-gray-300"
                                            defaultValue={data.status}
                                            disabled={relation && relation.status.toString() !== 'completado'}
                                        >
                                            {
                                                Object.entries(optionsStatus).map(([key, value]) => (
                                                    <option key={key} value={key}>{value}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}