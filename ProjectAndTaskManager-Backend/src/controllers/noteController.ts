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
            res.status(201).send('Note created');
        }catch(error){
            res.status(500).json({ error: "Error creating note" });
        }
    }
    static async getNotes(req: Request, res: Response){
        try{
            const note = await Note.find({task: req.task.id})
            res.status(200).json(note);
        }catch(error){
            res.status(500).json({ error: "Error getting note" });
        }
    }
    static async deleteNote(req: Request, res: Response){
        try{
            const {noteId} = req.params;
            const note = await Note.findById(noteId);
            if(!note){
                res.status(404).json({error: "Note not found"});
                return;
            }
            if(note.createdBy.toString() !== req.user.id.toString()){
                res.status(401).json({error: "Invalid request"});
                return;
            }
            req.task.notes = req.task.notes.filter(note => note.id.toString() !== noteId.toString());
            await Promise.allSettled([req.task.save(), note.deleteOne()])
            res.status(200).send('Note deleted');

        }catch(error){
            res.status(500).json({ error: "Error deleting note" });
        }
    }
}