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
                res.status(404).json({error: "User not found"});
                return;
            }
            res.send(user);
        }catch (error){
            res.status(500).json({ error: "Error getting user" });
        }
    }

    static getProjectTeams = async (req: Request, res: Response) => {
        const project = await Project.findById(req.project.id).populate({
            path: 'team',
            select: 'id email name'
        })
        if (!project) {
            res.status(404).json({ error: "Project not found" });
            return;
        }
        res.json(project.team ?? []);
    }

    static addUserById = async (req: Request, res: Response) => {
        try{
            const {id} = req.body;
            const user = await User.findById(id).select('id email name');
            if (!user) {
                res.status(404).json({error: "User not found"});
                return;
            }
            if(req.project.team.some(team => team.toString() === user.id.toString())) {
                res.status(409).json({error: "User already exists"});
                return;
            }
            req.project.team.push(user.id);
            await req.project.save();
            AuthEmails.addMemberToProject({
                email: user.email,
                name: user.name,
                projectName: req.project.projectName.toString()
            });
            res.send("User added");
        }catch (error){
            res.status(500).json({ error: "Error adding user" });
        }
    }

    static deleteUserById = async (req: Request, res: Response) => {
        try{
            const {userId} = req.params;
            const user = await User.findById(userId).select('id email name');
            if(!req.project.team.some(team => team.toString() === userId)) {
                res.status(404).json({error: "The user does not exist in the project"});
                return;
            }
            const hasPending = await Task.exists({
                project: req.project.id,
                user: new Types.ObjectId(userId),
                status: { $ne: 'completed' },
            });
            if (hasPending) {
                res.status(400).json({ error: 'The user has incompleted tasks' });
                return;
            }else{
                AuthEmails.deleteMemberToProject({
                    email: user.email,
                    name: user.name,
                    projectName: req.project.projectName.toString()
                });
                req.project.team = req.project.team.filter(team => team.toString() !== userId);
                await req.project.save();
                res.send("User deleted");
            }
        }catch (error){
            res.status(500).json({ error: "Error deleting user" });
        }
    }
}