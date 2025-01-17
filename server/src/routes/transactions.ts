import { Router } from "express";
import { getTransactions } from "../controllers/transaction.controller"
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router.route('/transactions').get(verifyJWT, getTransactions)

export default router