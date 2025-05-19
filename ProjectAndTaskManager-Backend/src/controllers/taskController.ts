import type {Request, Response} from 'express'
import Task from "../models/tasks";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try{
            const task = new Task(req.body)
            /**const user = await User.findOne(req.body.user)
            if (user){
                task.user = user.id
            }
            else{
                res.status(404).json({error: 'User not found'})
            }**/
            if (req.body.relation == 'Ninguna'){
                task.relation = null
            }
            else{
                const relation = await Task.findById(req.body.relation)
                if(!relation){
                    res.status(404).send('No relation found')
                }
                task.relation = relation
            }
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Tarea guardada')
        }catch (error){
            res.status(500).json({error: 'Error ocurrido'})
        }
    }

    static getTasks = async (req: Request, res: Response) => {
        try{
            const tasks = await Task.find({project: req.project.id}).populate('project')
            res.json(tasks)
        }catch (error){
            res.status(500).json({error: 'Error ocurrido'})
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try{
            res.send(req.task)
        }catch (error){
            res.status(500).json({error: 'Error ocurrido'})
        }
    }
    static putTaskById = async (req: Request, res: Response) => {
        try{
            /**const user = await User.findOne(req.body.user)
             if (user){
             task.user = user.id
             }
             else{
             res.status(404).json({error: 'User not found'})
             }**/
            if (req.body.relation === 'Ninguna'){
                req.body.relation = null
            }
            else{
                const relation = await Task.findOne(req.body.relation)
                if(!relation){
                    res.status(404).send('No relation found')
                }
                req.body.relation = relation.id
            }
            req.task.name = req.body.name
            req.task.description = req.body.description
            req.task.rol = req.body.rol
            req.task.user = req.body.user
            req.task.relation = req.body.relation
            await req.task.save()
            res.send('Tarea actualizada')
        }catch (error){
            res.status(500).json({error: 'Error ocurrido'})
        }
    }
    static deleteById = async (req: Request, res: Response) => {
        try{
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            res.send('Task eliminada')
        }catch (error){
            res.status(500).json({error: 'Error ocurrido'})
        }
    }
    static updateStatus = async (req: Request, res: Response) => {
        try{
            const {status} = req.body
            req.task.status = status
            await req.task.save()
            res.send('Tarea actualizada')
        }catch (error){
            res.status(500).json({error: error.message})
        }
    }
}