import type {Request, Response, NextFunction} from "express"
import Task, {ITasks} from "../models/tasks";

declare global {
    namespace Express {
        interface Request {
            task: ITasks
        }
    }
}

export async function validateTaskId(req: Request, res: Response, next: NextFunction){
    try{
        const {taskId} = req.params
        const task = await Task.findById(taskId)
        if(!task){
            const error = new Error('Task not found')
            res.status(404).json({error: error.message})
        }
        req.task = task
        next()
    }catch (error){
        res.status(500).json({error: 'Error occurred'})
    }
}

export function taskBelongsToProject(req: Request, res: Response, next: NextFunction){
    if(req.task.project.toString() !== req.project.id.toString()){
        const error = new Error('Action invalid')
        res.status(400).json({error: error.message})
    }
    next()
}