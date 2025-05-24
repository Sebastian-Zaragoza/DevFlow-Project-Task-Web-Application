import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {useLocation} from "react-router";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getTaskById} from "../../api/TaskApi.ts";
import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";
import {formatDate} from "../../utils/utils.ts";


export default function ModalDetails() {
    const params = useParams()
    const projectId = params.projectId!
    const location = useLocation()
    const querystring = new URLSearchParams(location.search)
    const taskId = querystring.get('viewTask')!
    const show = taskId ? true : false

    const {data, isError} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })

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
                                    <p className='text-lg text-slate-500 mb-2'>Tarea dependiente: {data.relation? data.relation : 'Ninguna'}</p>
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual: {data.status}</label>
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