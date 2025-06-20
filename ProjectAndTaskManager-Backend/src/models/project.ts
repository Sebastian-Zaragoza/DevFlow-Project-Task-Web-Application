import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import Task, { ITasks } from "./tasks";
import { IUser } from "./user";
import Note from "./note";

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITasks, Types.ObjectId>[];
  manager: PopulatedDoc<IUser, Types.ObjectId>;
  team: PopulatedDoc<IUser, Types.ObjectId>[];
}
const ProjectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
        default: [],
      },
    ],
    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
  },
  { timestamps: true },
);

ProjectSchema.pre('deleteOne', {document: true, query: false}, async function (){
    const projectId = this._id
    if (!projectId) return;
    const tasks = await Task.find({project: projectId});
    for(const task of tasks){
        await Note.deleteMany({task: task.id});
    }
    await Task.deleteMany({project: projectId});
})

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
