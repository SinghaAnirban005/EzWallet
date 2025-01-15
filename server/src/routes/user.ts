import { Router } from "express";
import {
    registerUser,
    login,
    logoutUser
} from "../controllers/user.controller"

const router = Router()

router.route('/signup').post(registerUser)
router.route('/signin').post(login)
router.route('/logout').post(logoutUser)

export default router