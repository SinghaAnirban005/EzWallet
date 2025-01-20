import { Request, Response } from "express"
import { Account } from "../models/account"
import { Transactions } from "../models/transactions"
import mongoose from "mongoose"

const getBalance = async(req: Request, res: Response) => {
    try {
        //@ts-ignore
        const userId = req.user._id

        if(!userId){
            res.status(400).json({
                message: "No valid userId"
            })
            return;
        }

        const balance = await Account.findOne({
            owner: userId
        })
        if(!balance){
            res.status(400).json({
                message: "No account exists"
            })
            return;
        }

        res.status(200).json({
            message: "Fetched account balance",
            balance: balance
        })
        return;
    } catch (error) {
        res.status(500).json({
            message: "Failed to get account details ",
        })
        return;
    }
}

const topUP = async(req: Request, res: Response) => {
    try {
        const { amount, accountId } = req.body

        if(!amount || !accountId){
            res.status(400).json({
                message: "Enter all fields"
            })
            return;
        }

        const addBalance = await Account.findByIdAndUpdate(accountId, {
            $inc:{
                balance: amount
            }
        })
        if(!addBalance){
            res.status(400).json({
                message: "No account exists"
            })
            return;
        }

        res.status(200).json({
            message: "Successfully added balance !!"
        })
        return;
    } catch (error) {
        res.status(500).json({
            message: "Failed to Top Up"
        })
        return;
    }
}

const transferMoney = async(req: Request, res: Response) => {
        const { senderId, receiverId, amount } = req.body
        if(!senderId || !receiverId || !amount || amount <= 0){
            res.status(400).json({
                message: "Enter valid fields"
            })
            return;
        }
        
        const senderAccount = await Account.findById(senderId)
        const receiverAccount = await Account.findById(receiverId)
        if(!senderAccount || !receiverAccount){
            res.status(400).json({
                message: "Account does not exist"
            })
            return
        }

        try {
            //@ts-ignore
            if(senderAccount.balance < amount){
                res.status(400).json({
                    message: "Insufficient balance"
                })
                return;
            }
            //@ts-ignore
            const initialTotalBalance = senderAccount.balance + receiverAccount.balance
            const session = await mongoose.startSession()
            
            session.startTransaction()

            try {
                const parsedSenderId = new mongoose.Types.ObjectId(senderId);
const parsedReceiverId = new mongoose.Types.ObjectId(receiverId);
                //@ts-ignore
                senderAccount.balance -= amount;
                receiverAccount.balance += amount;

                await senderAccount.save({session})
                await receiverAccount.save({session})

                //@ts-ignore
                const finalTotalBalance = senderAccount.balance + receiverAccount.balance;

                if(initialTotalBalance != finalTotalBalance){
                    res.status(400).json({
                        message: "Total balance inconsistency"
                    })
                    return;
                }

                const transaction = await Transactions.create({
                    sender: senderId,
                    receiver: receiverId,
                    amount: amount,
                    status: 'success'
                })

                if(!transaction){
                    res.status(400).json({
                        message: "Transaction invalid"
                    })
                    return;
                }

                await session.commitTransaction()
                session.endSession()

                res.status(200).json({
                    message: 'Transaction successfull',
                    transaction: transaction
                })
                return;
            } catch (error) {
                await session.abortTransaction()
                session.endSession()
            }
        } catch (error) {
            res.status(500).json({
                message: 'Some error occured :: '+ error
            })
            return;
        }
}

export {
    getBalance,
    topUP,
    transferMoney
}