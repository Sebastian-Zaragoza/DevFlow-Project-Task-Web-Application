import type {Note} from "../../types";
import {formatDate} from "../../utils/utils.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {useMemo} from "react";
import {useMutation} from "@tanstack/react-query";
import {deleteNote} from "../../api/NoteApi.ts";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {useLocation} from "react-router";
import {useQueryClient} from "@tanstack/react-query";

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({note}: NoteDetailProps) {
    const {data} = useAuth();
    const canDelete = useMemo(()=> data?._id === note.createdBy._id, [data])
    const params = useParams();
    const projectId = params.projectId!;
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const taskId = query.get("viewTask")!;

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success("Nota eliminada correctamente");
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })
    return (
        <div className="pt-3 flex justify-between items-center">
           <div>
               <p>
                   {note.content}: <span className="font-semibold">{note.createdBy.name}</span>
               </p>
               <p className=" text-xs text-gray-500">
                   {formatDate(note.createdAt)}
               </p>
           </div>
            {canDelete && (
                <button type="button" className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white cursor-pointer transition-colors"
                    onClick={()=>{mutate({projectId, taskId, noteId: note._id})}}
                >Eliminar</button>
            )}
        </div>
    );
}
