import { Router } from "express";
import {
    registerUser,
    login,
    logoutUser,
    getUserData
} from "../controllers/user.controller"
import { verifyJWT } from "../middlewares/auth.middleware"; 

const router = Router()

router.route('/signup').post(registerUser)
router.route('/signin').post(login)
router.route('/user-data').get(verifyJWT, getUserData)
router.route('/logout').post(verifyJWT, logoutUser)

export default router