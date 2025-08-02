import { z } from "zod";
import {userSchema} from "./auth.ts";

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

const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
})

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>

export const taskStatusSchema = z.enum([
  "pending",
  "completed",
  "on_hold",
  "in_progress",
  "under_reviews",
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
  notes: z.array(noteSchema.extend({
    createdBy: userSchema
  })),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<
    Task,
    "name" | "description" | "rol" | "user" | "relation"
>;

export const projectAndTaskSchema = projectSchema.pick({
  _id: true,
  projectName: true,
  clientName: true,
  description: true,
  manager: true,
}).extend({
  tasks: taskSchema.array()
})

export type ProjectWithTasks = z.infer<typeof projectAndTaskSchema>;