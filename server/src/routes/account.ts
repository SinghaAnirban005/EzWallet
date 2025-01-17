import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
    getBalance,
    topUP,
    transferMoney
} from "../controllers/account.controller"

const router = Router()

router.route('/balance/:userId').get(verifyJWT, getBalance)
router.route('/top-up').post(verifyJWT, topUP)
router.route('/sendMoney').post(verifyJWT, transferMoney)

export default router

