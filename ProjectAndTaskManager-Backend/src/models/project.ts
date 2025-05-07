import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose";
import {ITasks} from "./tasks";
import {IUser} from "./user";

export interface IProject extends Document {
    projectName: string,
    clientName: string,
    description: string,
    tasks: PopulatedDoc<ITasks, Types.ObjectId>[]
    manager: PopulatedDoc<IUser, Types.ObjectId>
}

const ProjectSchema = new Schema({
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
            default: []
        }
    ],
    manager: {
        type: Schema.Types.ObjectId,
        ref: "User",
        /**required: true**/
    }
}, {timestamps: true})

const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project