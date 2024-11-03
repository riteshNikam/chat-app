import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET_TOKEN, ACCESS_EXPITY, REFRESH_SECRET_TOKEN, REFRESH_EXPITY } from "../../constants.js";

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    refreshToken: {
        type: String,
    }
}, {timestamps: true})

UserSchema.pre("save", async function (next) {

    if (!this.isModified('password')) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        }, 
        ACCESS_SECRET_TOKEN, 
        {
            expiresIn: ACCESS_EXPITY
        }
    )
}

UserSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        REFRESH_SECRET_TOKEN,
        {
            expiresIn: REFRESH_EXPITY
        }
    )
}

const Users = mongoose.model('User', UserSchema)
export { Users }