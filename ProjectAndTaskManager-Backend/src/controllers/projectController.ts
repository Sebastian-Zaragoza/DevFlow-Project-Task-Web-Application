import {Request, Response} from "express";
import Project from "../models/project";

export class ProjectController{
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)
        try{
            await project.save()
            res.send("Proyecto creado exitosamente ")
        }catch (error){
            res.status(500).json({error: "Error al crear el proyecto"})
        }
    }
    static getProjects = async (req: Request, res: Response) => {
        try{
            const projects = await Project.find()
            res.send(projects)
        }catch (error){
            res.status(404).json({error: "Error al obtener los proyectos"})
        }
    }
    static getProjectById = async (req: Request, res: Response) => {
        const {id} = req.params
        try{
            const project = await Project.findById(id)
            if(!project){
                const error = new Error('Proyecto no encontrado con el id: ' + id)
                res.status(404).json({error: error})
            }
            res.send(project)
        }catch (error){
            res.status(500).json({error: "Error al obtener el proyecto"})
        }
    }
    static updateProjectById = async (req: Request, res: Response) => {
        const {id} = req.params
        try{
            const project = await Project.findById(id)
            if(!project){
                const error = new Error('Proyecto no encontrado con el id: ' + id)
                res.status(404).json({error: error})
            }
            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description
            await project.save()
            res.send("Proyecto actualizado exitosamente ")
        }catch (error){
            res.status(500).json({error: "Error al obtener el proyecto"})
        }
    }
    static deleteProjectById = async (req: Request, res: Response) => {
        const {id} = req.params
        try{
            const project = await Project.findById(id)
            if(!project){
                const error = new Error('Proyecto no encontrado con el id: ' + id)
                res.status(404).json({error: error})
            }
            await project.deleteOne()
            res.send("Proyecto eliminado exitosamente ")
        }catch (error){
            res.status(500).json({error: "Error al obtener el proyecto"})
        }
    }
}