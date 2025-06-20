import {isAxiosError} from "axios";
import api from "../lib/axios.ts";
import {type TeamMember, type TeamMemberForm, teamMembersSchema} from "../types/team.ts";
import type {Project} from "../types";

export async function findUserByEmail(args: {
    projectId: string
    formData: TeamMemberForm
}){
    const { projectId, formData } = args
    const { data } = await api.post<{ user: TeamMember }>(
        `projects/${projectId}/team/find`,
        { email: formData.email }
    )
    return data
}

export async function addUserById({projectId, id}: {projectId: Project['_id'], id: TeamMember['_id']}) {
    try{
        const url = `projects/${projectId}/team`;
        const data = await api.post<string>(url, {id});
        return data.data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjectTeam(projectId: Project['_id']) {
    try{
        const url = `projects/${projectId}/team`;
        const data = await api.get(url);
        const response = teamMembersSchema.safeParse(data.data);
        if(response.success){
            return response.data;
        }
        return [];
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function removeUser({projectId, userId}: {projectId: Project['_id'], userId: TeamMember['_id']}) {
    try{
        const url = `projects/${projectId}/team/${userId}`;
        const data = await api.delete<string>(url);
        return data.data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}