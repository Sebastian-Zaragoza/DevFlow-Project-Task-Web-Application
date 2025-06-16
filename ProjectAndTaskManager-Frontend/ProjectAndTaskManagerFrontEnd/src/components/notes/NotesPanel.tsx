import AddNoteForm from "./AddNoteForm.tsx";
import type {Task} from "../../types";
import NoteDetail from "./NoteDetail.tsx";

type NoteProps = {
    notes: Task['notes'];
}

export default function NotesPanel({notes} :NoteProps) {
    return (
        <>
            <AddNoteForm/>
            <div>
                {notes.length ? (
                    <>
                        <p className="font-black text-3xl text-gray-800 mt-5">Notas</p>
                        {notes.map(note => <NoteDetail key={note._id} note={note} />)}
                    </>
                ): <p className="text-gray-800 text-center pt-3">No hay notas</p>}
            </div>
        </>
    );
}
