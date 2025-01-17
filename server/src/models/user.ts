import mongoose, {mongo, Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true, 
    },
    fullName: {
        type: String,
        required: true,
        trim: true, 
        index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    account: {
        type: mongoose.Types.ObjectId,
        ref: 'Account'
    },
    refreshToken: {
        type: String
    }
},{
    timestamps: true
})

export const  User = mongoose.model("User", userSchema)