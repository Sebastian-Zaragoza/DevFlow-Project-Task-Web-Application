import mongoose, {Schema, Document, Types} from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    confirmed: boolean
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = mongoose.model<IUser>("User", UserSchema)
export default User