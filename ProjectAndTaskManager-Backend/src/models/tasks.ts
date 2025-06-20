import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IUser } from "./user";
import Note from "./note";

const tasksStatus = {
  PENDING: "pendiente",
  COMPLETED: "completado",
  ON_HOLD: "en_espera",
  IN_PROGRESS: "en_progreso",
  UNDER_REVIEWS: "en_revision",
} as const;
export type TaskStatus = (typeof tasksStatus)[keyof typeof tasksStatus];
export interface ITasks extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
  rol: string;
  user: PopulatedDoc<IUser, Types.ObjectId>;
  relation?: PopulatedDoc<ITasks, Types.ObjectId> | null;
  status: TaskStatus;
  completedBy: {
      user: Types.ObjectId,
      status: TaskStatus
  }[]
  notes: Types.ObjectId[];
}
const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    rol: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    relation: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(tasksStatus),
      default: tasksStatus.PENDING,
    },
    completedBy: [{
        user:{
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        status: {
            type: String,
            enum: Object.values(tasksStatus),
            default: tasksStatus.PENDING,
        }
    }],
    notes: [
        {
            type: Types.ObjectId,
            ref: "Note",
        }
    ]
  },
  { timestamps: true },
);

TaskSchema.pre('deleteOne', {document: true, query: false}, async function (){
    const taskId = this._id
    if (!taskId) return;
    await Note.deleteMany({task: taskId});
})

const Task = mongoose.model<ITasks>("Task", TaskSchema);
export default Task;
