import api from "../lib/axios.ts";
import { isAxiosError } from "axios";
import {type Project, type Task, type TaskFormData, taskSchema} from "../types";

type TaskApiData = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  status: Task["status"];
};
export async function createTask({
  formData,
  projectId,
}: Pick<TaskApiData, "formData" | "projectId">) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function getTaskById({projectId, taskId,}: Pick<TaskApiData, "projectId" | "taskId">): Promise<Task> {
  const url = `projects/${projectId}/tasks/${taskId}`;
  try {
    const { data } = await api.get(url);
    const parsed = taskSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error("Respuesta de tarea inválida");
    }
    return parsed.data;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      throw new Error(err.response.data.error);
    }
    throw err;
  }
}

export async function updateTask({
  projectId,
  taskId,
  formData,
}: Pick<TaskApiData, "projectId" | "taskId" | "formData">) {
  try {
    const url = `projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function deleteTask({
  projectId,
  taskId,
}: Pick<TaskApiData, "projectId" | "taskId">) {
  try {
    const url = `projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function updateStatus({
  projectId,
  taskId,
  status,
}: Pick<TaskApiData, "projectId" | "taskId" | "status">) {
  try {
    const url = `projects/${projectId}/tasks/${taskId}/status`;
    const { data } = await api.post<string>(url, { status });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
