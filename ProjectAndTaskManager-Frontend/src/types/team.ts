import {z} from "zod";
import {userSchema} from "./auth.ts";

const teamMemberSchema = userSchema.pick({
    _id: true,
    name: true,
    email: true
})

export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>