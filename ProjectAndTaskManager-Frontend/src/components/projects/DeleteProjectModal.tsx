import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type {CheckPasswordForm} from "../../types/auth.ts";
import {useMutation} from "@tanstack/react-query";
import {checkPassword} from "../../api/AuthApi.ts";
import {toast} from "react-toastify";
import {deleteProject} from "../../api/ProjectApi.ts";
import {useQueryClient} from "@tanstack/react-query";

export default function DeleteProjectModal() {
    const initialValues: CheckPasswordForm = {
        password: ''
    }
    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject')!;
    const show = deleteProjectId ? true : false
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const checkUserPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) =>{
            toast.error(error.message);
        }
    })

    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onError: (error: any) => {
            toast.error(error.message);
        },
        onSuccess: (msg: any) => {
            toast.success(msg);
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            navigate(location.pathname, {replace: true});
        },
    });

    const handleForm = async (formData: CheckPasswordForm) => {
        await checkUserPasswordMutation.mutateAsync(formData);
        await deleteProjectMutation.mutateAsync(deleteProjectId);
    }


    return (
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
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white border-l-4  shadow-xl transition-all p-8 sm:p-10 text-left">

                                <Dialog.Title className="text-3xl font-extrabold text-gray-900 mb-4">
                                    Eliminar Proyecto
                                </Dialog.Title>

                                <p className="text-gray-700 mb-6">
                                    Confirma la eliminación del proyecto{" "}
                                    <span className="text-blue-600 font-semibold">
                  colocando tu contraseña
                </span>
                                </p>

                                <form
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                    className="space-y-6"
                                >
                                    <div className="space-y-3">
                                        <label
                                            htmlFor="password"
                                            className="text-sm uppercase font-bold"
                                        >
                                            Contraseña
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Contraseña de inicio de sesión"
                                            className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register("password", {
                                                required: "La contraseña es obligatoria",
                                            })}
                                        />
                                        {errors.password && (
                                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow focus:outline-none transition-colors"
                                    >
                                        Eliminar Proyecto
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