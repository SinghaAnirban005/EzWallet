import { User } from "../models/user"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { Request, Response } from "express"

const registerUser = async (req: Request, res: Response) => {

    const {fullName, email, username, password } = req.body

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        res.status(400).json({
            message: "All fields are required"
        })
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        res.status(403).json(
            {
                message: "User with email or username already exists"
            }
        )
    }

    const user = await User.create({
        fullName,
        email, 
        password,
        username: username
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        res.status(500).json({
            message: "Something went wrong while registering the user"
        })
        return
    }

    return res.status(201).json(
    {
        message: "Registered succesfully",
        user: createdUser
    }
    )

}

const login = async(req: Request, res: Response) => {
    try {
        const {email, password } = req.body

        if(!email || !password) {
            res.status(400).json({
                message: "Enter all fields"
            })
            return
        }

        const user = await User.findOne({
            email: email
        })
    
        if (!user) {
            res.status(404).json(
                {
                    message: "User not found"
                }
            )
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            res.status(400).json({
                message: "Password is invalid"
            })
            return
        }

        const accessToken = jwt.sign(
                {
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                    fullName: user.fullName
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
                }
            )
        
        const refreshToken = jwt.sign(
            {
                _id: user._id,
                
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
        user.refreshToken = refreshToken
        await user.save({
            validateBeforeSave: false
        })

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true,
        }

        return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json({
                    user: loggedInUser,
                    message: 'Logged in successfully'
                })

    } catch (error) {
        res.status(500).json(
            {
                message: "Failed to login"
            }
        )
    }
}

const logoutUser = async(req: Request, res: Response) => {
    await User.findByIdAndUpdate(
        //@ts-ignore
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
        message: "User logged out"
    })
}

export {
    registerUser,
    login,
    logoutUser
}