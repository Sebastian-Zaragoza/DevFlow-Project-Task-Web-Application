import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IUser } from "./user";
import Note from "./note";

const tasksStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  ON_HOLD: "on_hold",
  IN_PROGRESS: "in_progress",
  UNDER_REVIEWS: "under_reviews",
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
