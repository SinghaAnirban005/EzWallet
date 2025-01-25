import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
    getBalance,
    topUP,
    transferMoney,
    searchUsers
} from "../controllers/account.controller"

const router = Router()

router.route('/balance').get(verifyJWT, getBalance)
router.route('/top-up').post(verifyJWT, topUP)
router.route('/sendMoney').post(verifyJWT, transferMoney)
router.route('/search').get(verifyJWT, searchUsers)

export default router

