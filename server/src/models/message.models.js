import mongoose, { Schema, Types } from "mongoose";

const MessageSchema = new Schema({
    messageFrom: {
        type: Types.ObjectId,
        ref: "User"
    },
    messageTo: {
        type: Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        trim: true,
        required: true
    }

}, { timestamps: true })

const Message = mongoose.model("Message", MessageSchema)
export { Message }