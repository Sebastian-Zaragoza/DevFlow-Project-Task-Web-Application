import type {Project} from "../types";
import type {TeamMember} from "../types/team.ts";

export const isManager = (managerId: Project['_id'], userId: TeamMember['_id']) =>{
    return managerId === userId;
}