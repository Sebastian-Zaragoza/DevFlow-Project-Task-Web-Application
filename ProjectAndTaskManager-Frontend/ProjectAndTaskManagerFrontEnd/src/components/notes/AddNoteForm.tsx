import {useForm} from "react-hook-form";
import type {NoteFormData, Task} from "../../types";
import ErrorMessage from "../ErrorMessage.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createNote} from "../../api/NoteApi.ts";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {useLocation} from "react-router";

type AddNoteProps = {
    relation: Task | null;
}

export default function AddNoteForm({relation}: AddNoteProps) {
    const initialValues: NoteFormData = {
        content: ''
    }
    const params = useParams();
    const projectId = params.projectId!;
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const taskId = query.get("viewTask")!;

    const queryClient = useQueryClient();
    const {register, handleSubmit, formState:{errors}, reset} = useForm({defaultValues: initialValues});
    const {mutate} = useMutation({
        mutationFn: createNote,
        onError: (error) =>{
            toast.error(error.message);
        },
        onSuccess: (data) =>{
            toast.success(data);
            queryClient.invalidateQueries({queryKey:['task', taskId]})
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        const data = {
            projectId: projectId,
            taskId: taskId,
            formData: formData,
        }
        mutate(data)
        reset()
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(handleAddNote)}
                noValidate
                className="bg-white rounded-lg shadow-md border-l-4 border-blue-600 p-6 space-y-4 mt-6"
            >
                <div>
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Nueva Nota
                    </label>
                    <input
                        id="content"
                        type="text"
                        placeholder="Escribe tu nota aquí..."
                        className="block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        {...register("content", {
                            required: "El contenido de la nota es requerido",
                        })}
                    />
                    {errors.content && (
                        <p className="mt-1 text-sm text-red-600">
                            <ErrorMessage>{errors.content.message}</ErrorMessage>
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={relation! && relation.status !== 'completado'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow focus:outline-none transition-colors disabled:bg-gray-200"
                >
                    Crear nota
                </button>
            </form>
        </>
    );
}

