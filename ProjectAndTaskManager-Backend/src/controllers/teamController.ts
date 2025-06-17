import {Request, Response} from "express";
import User from "../models/user";
import Project from "../models/project";
import Task from "../models/tasks";
import {Types} from "mongoose";
import {AuthEmails} from "../emails/authEmails";

export class TeamMemberController {
    static findMemberByEmail = async (req: Request, res: Response) => {
        try{
            const {email} = req.body;
            const user = await User.findOne({email}).select('id email name');
            if (!user) {
                res.status(404).json({error: "Usuario no encontrado"});
                return;
            }
            res.send(user);
        }catch (error){
            res.status(500).json({ error: "Error ocurrido" });
        }
    }

    static getProjectTeams = async (req: Request, res: Response) => {
        const project = await Project.findById(req.project.id).populate({
            path: 'team',
            select: 'id email name'
        })
        if (!project) {
            res.status(404).json({ error: "Proyecto no encontrado" });
            return;
        }
        res.json(project.team ?? []);
    }

    static addUserById = async (req: Request, res: Response) => {
        try{
            const {id} = req.body;
            const user = await User.findById(id).select('id email name');
            if (!user) {
                res.status(404).json({error: "Usuario no encontrado"});
                return;
            }
            if(req.project.team.some(team => team.toString() === user.id.toString())) {
                res.status(409).json({error: "El usuario ya existe"});
                return;
            }
            req.project.team.push(user.id);
            await req.project.save();
            AuthEmails.addMemberToProject({
                email: user.email,
                name: user.name,
                projectName: req.project.projectName.toString()
            });
            res.send("Usuario guardado exitosamente");
        }catch (error){
            res.status(500).json({ error: "Error ocurrido" });
        }
    }

    static deleteUserById = async (req: Request, res: Response) => {
        try{
            const {userId} = req.params;
            const user = await User.findById(userId).select('id email name');
            if(!req.project.team.some(team => team.toString() === userId)) {
                res.status(404).json({error: "El usuaro no existe en el proyecto"});
                return;
            }
            const hasPending = await Task.exists({
                project: req.project.id,
                user: new Types.ObjectId(userId),
                status: { $ne: 'completado'},
            });
            if (hasPending) {
                res.status(400).json({ error: 'El colaborador tiene tareas incompletas' });
                return;
            }else{
                AuthEmails.deleteMemberToProject({
                    email: user.email,
                    name: user.name,
                    projectName: req.project.projectName.toString()
                });
                req.project.team = req.project.team.filter(team => team.toString() !== userId);
                await req.project.save();
                res.send("Usuario eliminado exitosamente");
            }
        }catch (error){
            res.status(500).json({ error: "Error ocurrido" });
        }
    }
}