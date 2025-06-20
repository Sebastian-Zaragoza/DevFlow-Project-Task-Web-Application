import api from "../lib/axios.ts";
import {isAxiosError} from "axios";
import type {UpdateUserPassword, UserProfileForm} from "../types/auth.ts";

export async function updateProfile(formData: UserProfileForm) {
    try{
        const {data} = await api.put<string>('/auth/profile', formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function changePassword(formData: UpdateUserPassword) {
    try{
        const {data} = await api.post<string>('/auth/update-password', formData);
        return data;
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}