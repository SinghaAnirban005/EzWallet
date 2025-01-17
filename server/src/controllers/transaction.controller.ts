import { Request, Response } from "express"
import { Transactions } from "../models/transactions";

const getTransactions = async(req: Request, res: Response) => {
try {
    const { userId } = req.params;
    if(!userId){
        res.status(400).json({
            message: "User Id is not available"
        })
        return;
    }

    const transactions = await Transactions.find({
        $or: [
            {
                sender: userId
            },
            {
                receiver: userId
            }
        ]
    })

    if(!transactions){
        res.status(400).json({
            message: "Failed to process transactions"
        })
        return;
    }

    res.status(200).json({
        message: "Fetched all transactions"
    })
    return;
} catch (error) {
    res.status(500).json({
        message: 'Internal server error'
    })
    return;
}}

export { getTransactions }