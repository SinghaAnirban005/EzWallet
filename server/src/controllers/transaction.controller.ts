import { Request, Response } from "express"
import { Transactions } from "../models/transactions";
import mongoose from "mongoose";

const getTransactions = async(req: Request, res: Response) => {
try {
    const { currentUserAccId } = req.query

    const transactions = await Transactions.find({
        $or: [
            {
                sender: currentUserAccId
            },
            {
                receiver: currentUserAccId
            }
        ]
    }).populate("sender receiver")

    if(!transactions){
        res.status(400).json({
            message: "Failed to process transactions"
        })
        return;
    }

    res.status(200).json({
        message: "Fetched all transactions",
        transactions: transactions
    })
    return;
} catch (error) {
    res.status(500).json({
        message: 'Internal server error'
    })
    return;
}}

export { getTransactions }