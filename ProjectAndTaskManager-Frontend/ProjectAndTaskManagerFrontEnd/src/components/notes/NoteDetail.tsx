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
    note: Note;
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
        <>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-start space-x-4 mb-4 items-center">
                <div className="flex-1">
                    <p className="text-gray-900">
                        <span className="font-semibold">{note.content}</span>{' '}
                        <span className="text-gray-700">por</span>{' '}
                        <span className="font-semibold">{note.createdBy.name}</span>
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        {formatDate(note.createdAt)}
                    </p>
                </div>

                {canDelete && (
                    <button
                        type="button"
                        onClick={() =>
                            mutate({ projectId, taskId, noteId: note._id })
                        }
                        className="inline-flex items-center px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                    >
                        Eliminar
                    </button>
                )}
            </div>
        </>
    );
}
