import {useForm} from "react-hook-form";
import type {NoteFormData} from "../../types";
import ErrorMessage from "../ErrorMessage.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createNote} from "../../api/NoteApi.ts";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {useLocation} from "react-router";

export default function AddNoteForm() {
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
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate={true}
        >
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-800" htmlFor="content">Crear nota</label>
                <input id="content" type="text" placeholder="Contenido de la nota" className="w-full p-3 border boder-gray-300"
                    {...register("content", {
                        required: 'El contenido de la nota es requerido'
                    })}/>
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
            <input type="submit" value="Crear nota" className="bg-blue-600 hover:bg-blue-700 w-full p-2 text-white font-black cursor-pointer"></input>
        </form>
    );
}

