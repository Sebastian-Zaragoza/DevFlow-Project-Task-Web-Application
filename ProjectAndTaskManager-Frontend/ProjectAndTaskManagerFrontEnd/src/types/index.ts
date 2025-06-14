import { z } from "zod";
import {userSchema} from "./auth.ts";

export const taskStatusSchema = z.enum([
  "pendiente",
  "completado",
  "en_espera",
  "en_progreso",
  "en_revision",
]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  rol: z.string(),
  user: z.string(),
  relation:  z.string().nullable(),
  status: taskStatusSchema,
  completedBy: z.array(z.object({
    _id: z.string(),
    user: userSchema,
    status: taskStatusSchema,
  })),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<
  Task,
  "name" | "description" | "rol" | "user" | "relation"
>;

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({_id: true}))
});

export const dashBoardSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true
  }),
);
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  "projectName" | "clientName" | "description"
>;
