import { Router } from "express";
import {
    registerUser,
    login,
    logoutUser
} from "../controllers/user.controller"
import { verifyJWT } from "../middlewares/auth.middleware"; 

const router = Router()

router.route('/signup').post(registerUser)
router.route('/signin').post(login)
router.route('/logout').post(verifyJWT, logoutUser)

export default router