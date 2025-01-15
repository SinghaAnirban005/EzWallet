import jwt, { JwtPayload } from "jsonwebtoken"
import { Request,Response, NextFunction } from "express";
import { User } from "../models/user";

export const verifyJWT = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            res.status(400).json({
                message: "Unauthorized request"
            })
            return
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById((decodedToken as JwtPayload)?._id).select("-password -refreshToken")
    
        if (!user) {
            res.status(404).json({
                message: "Invalid Access Token"
            })
            return;
        }
        //@ts-ignore
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({
            message: "Invalid access token"
        })
        return
    }
    
}