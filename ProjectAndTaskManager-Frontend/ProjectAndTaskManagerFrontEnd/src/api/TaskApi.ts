import api from "../lib/axios.ts";
import {isAxiosError} from "axios";
import type {Project, TaskFormData} from "../types";

type TaskApiData = {
    formData: TaskFormData
    projectId: Project['_id']
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