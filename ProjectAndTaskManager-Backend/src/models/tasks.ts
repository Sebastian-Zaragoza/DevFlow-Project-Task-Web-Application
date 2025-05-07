import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose";
import {IUser} from "./user";

const tasksStatus = {
    PENDING: "pending",
    COMPLETED: "completed",
    ON_HOLD: "onHold",
    IN_PROGRESS: "inProgress",
    UNDER_REVIEWS: "underReview",
} as const

export type TaskStatus = typeof tasksStatus[keyof typeof tasksStatus];

export interface ITasks extends Document {
    name: string,
    description: string,
    project: Types.ObjectId
    rol: string,
    user: PopulatedDoc<IUser, Types.ObjectId>,
    relation?: PopulatedDoc<ITasks, Types.ObjectId> | null,
    status: TaskStatus
}

const TaskSchema = new Schema({
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
        required: true
    },
    rol: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    relation: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        default: null
    },
    status: {
        type: String,
        enum: Object.values(tasksStatus),
        default: tasksStatus.PENDING
    }
}, {timestamps: true})

const Task = mongoose.model<ITasks>("Task", TaskSchema)
export default Task