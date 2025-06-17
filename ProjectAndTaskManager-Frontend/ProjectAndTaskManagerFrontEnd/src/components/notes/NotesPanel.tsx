import AddNoteForm from "./AddNoteForm.tsx";
import type {Task} from "../../types";
import NoteDetail from "./NoteDetail.tsx";

type NoteProps = {
    notes: Task['notes'];
    relation: Task | null;
}

export default function NotesPanel({notes, relation}:NoteProps) {
    return (
        <>
            <AddNoteForm relation={relation}/>

            <section className="mt-8">
                {notes.length > 0 ? (
                    <>
                        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
                            <h2 className="text-2xl font-extrabold text-gray-900">Notas</h2>
                            <span className="text-sm text-gray-500">
            {notes.length} {notes.length === 1 ? 'Nota' : 'Notas'}
          </span>
                        </div>

                        <ul className="space-y-4">
                            {notes.map((note) => (
                                <NoteDetail key={note._id} note={note}/>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p className="text-center text-gray-500 py-6">No hay notas</p>
                )}
            </section>
        </>
    );
}
