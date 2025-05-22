import api from "../lib/axios.ts";
import {isAxiosError} from "axios";
import type {Project, Task, TaskFormData} from "../types";

type TaskApiData = {
    formData: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
}

export async function createTask({formData, projectId}: Pick<TaskApiData, 'formData' | 'projectId'>){
    try {
        const url = `/projects/${projectId}/tasks`
        const {data} = await api.post<string>(url, formData)
        return data
    }catch (error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskById({projectId, taskId} : Pick<TaskApiData, 'projectId' | 'taskId'>){
    try{
        const url = `projects/${projectId}/tasks/${taskId}`
        const {data} = await api.get(url)
        return data
    }catch (error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

