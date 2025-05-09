import {Request, Response} from "express";
import Project from "../models/project";

export class ProjectController{
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)
        try{
            await project.save()
            res.send("Project created successfully")
        }catch (error){
            res.status(500).json({error: "Error creating project"})
        }
    }
    static getProjects = async (req: Request, res: Response) => {
        try{
            const projects = await Project.find()
            res.send(projects)
        }catch (error){
            res.status(404).json({error: "Error getting projects"})
        }
    }
    static getProjectById = async (req: Request, res: Response) => {
        const {id} = req.params
        try{
            const project = await Project.findById(id)
            if(!project){
                const error = new Error('Project not found with id ' + id)
                res.status(404).json({error: error})
            }
            res.send(project)
        }catch (error){
            res.status(500).json({error: "Error getting project"})
        }
    }
    static updateProjectById = async (req: Request, res: Response) => {
        const {id} = req.params
        try{
            const project = await Project.findById(id)
            if(!project){
                const error = new Error('Project not found with id ' + id)
                res.status(404).json({error: error})
            }
            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description
            await project.save()
            res.send("Project updated successfully")
        }catch (error){
            res.status(500).json({error: "Error getting project"})
        }
    }
    static deleteProjectById = async (req: Request, res: Response) => {
        const {id} = req.params
        try{
            const project = await Project.findById(id)
            if(!project){
                const error = new Error('Project not found with id ' + id)
                res.status(404).json({error: error})
            }
            await project.deleteOne()
            res.send("Project deleted successfully")
        }catch (error){
            res.status(500).json({error: "Error getting project"})
        }
    }
}