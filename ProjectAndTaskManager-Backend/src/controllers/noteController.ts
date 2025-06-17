import Note from "../models/note";
import {Request, Response} from "express";

export class NoteController {
    static async createNote(req: Request, res: Response){
        try{
            const {content} = req.body;
            const note = new Note()
            note.content = content;
            note.createdBy = req.user.id;
            note.task = req.task.id;

            req.task.notes.push(note.id)
            await Promise.allSettled([req.task.save(), note.save()])
            res.status(201).send('Nota creada correctamente')
        }catch(error){
            res.status(500).json({ error: "Error al crear la nota" });
        }
    }
    static async getNotes(req: Request, res: Response){
        try{
            const note = await Note.find({task: req.task.id})
            res.status(200).json(note);
        }catch(error){
            res.status(500).json({ error: "Error al obtener la nota" });
        }
    }
    static async deleteNote(req: Request, res: Response){
        try{
            const {noteId} = req.params;
            const note = await Note.findById(noteId);
            if(!note){
                res.status(404).json({error: "Nota no encontrada"});
                return;
            }
            if(note.createdBy.toString() !== req.user.id.toString()){
                res.status(401).json({error: "Acción no válida"});
                return;
            }
            req.task.notes = req.task.notes.filter(note => note.id.toString() !== noteId.toString());
            await Promise.allSettled([req.task.save(), note.deleteOne()])
            res.status(200).send('Nota eliminada exitosamente')

        }catch(error){
            res.status(500).json({ error: "Error al eliminar la nota" });
        }
    }
}